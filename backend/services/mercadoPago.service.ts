import { Preference } from 'mercadopago';
import { mpClient } from '../config/clients';
import Order from '../models/Order';
import Referral from '../models/Referral';
import { generationQueue } from '../config/clients';

interface MercadoPagoPayment {
  orderId: string;
  userId?: string;
  amount: number;
  currency: string;
  paymentMethod: 'credit_debit' | 'wallet' | 'oxxo' | 'bank_transfer';
  description: string;
  email: string;
  metadata?: Record<string, any>;
}

interface PaymentResponse {
  id: string;
  status: string;
  statusDetail: string;
  paymentUrl?: string;
  reference?: string;
  expiresAt?: string;
}

class MercadoPagoService {
  private accessToken: string;
  private publicKey: string;
  private webhookSecret: string;

  constructor() {
    this.accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN || '';
    this.publicKey = process.env.MERCADO_PAGO_PUBLIC_KEY || '';
    this.webhookSecret = process.env.MERCADO_PAGO_WEBHOOK_SECRET || '';

    if (!this.accessToken) {
      console.warn('⚠️  Mercado Pago credentials not fully configured');
    }
  }

  /**
   * Create Mercado Pago preference (payment request)
   * Supports: Credit/Debit, Wallet, OXXO, Bank Transfer
   */
  async createPreference(payment: MercadoPagoPayment): Promise<PaymentResponse> {
    try {
      const paymentMethodConfig = this.getPaymentMethodConfig(payment.paymentMethod);

      const preference = new Preference(mpClient);

      const preferenceData = {
        items: [
          {
            id: payment.orderId,
            title: payment.description,
            description: `PIC.CHRISTMAS - ${payment.description}`,
            picture_url: 'https://pic.christmas/og-image.png',
            category_id: 'art',
            quantity: 1,
            unit_price: payment.amount,
            currency_id: payment.currency === 'MXN' ? 'MXN' : payment.currency === 'ARS' ? 'ARS' : 'COP',
          },
        ],
        payer: {
          email: payment.email,
        },
        back_urls: {
          success: `${process.env.FRONTEND_URL || 'https://pic-christmas.vercel.app'}/success`,
          failure: `${process.env.FRONTEND_URL || 'https://pic-christmas.vercel.app'}/?canceled=true`,
          pending: `${process.env.FRONTEND_URL || 'https://pic-christmas.vercel.app'}/success?pending=true`,
        },
        auto_return: 'approved',
        notification_url: process.env.MERCADO_PAGO_NOTIFICATION_URL || `${process.env.BACKEND_URL || 'https://pic-christmas-backend.onrender.com'}/api/payments/webhook-mercadopago`,
        external_reference: payment.orderId,
        metadata: {
          userId: payment.userId || '',
          paymentMethod: payment.paymentMethod,
          ...payment.metadata,
        },
        payment_methods: paymentMethodConfig,
      };

      const result = await preference.create({ body: preferenceData });

      console.log('✅ Mercado Pago preference created:', result.id);

      return this.formatPaymentResponse(result, payment.paymentMethod);
    } catch (error: any) {
      console.error('❌ Mercado Pago preference creation failed:', error);
      throw new Error(`Payment gateway error: ${error.message || 'Unknown error'}`);
    }
  }

  /**
   * Get payment method configuration for Mercado Pago
   */
  private getPaymentMethodConfig(paymentMethod: string) {
    const configs: Record<string, any> = {
      credit_debit: {
        excluded_payment_methods: [{ id: 'oxxo' }, { id: 'atm' }],
        excluded_payment_types: [],
      },
      wallet: {
        excluded_payment_methods: [],
        excluded_payment_types: ['ticket'],
      },
      oxxo: {
        included_payment_methods: [{ id: 'oxxo' }],
        excluded_payment_types: [],
      },
      bank_transfer: {
        included_payment_methods: [{ id: 'account_money' }],
        excluded_payment_types: ['credit_card', 'ticket'],
      },
    };

    return configs[paymentMethod] || configs.credit_debit;
  }

  /**
   * Format payment response based on payment method
   */
  private formatPaymentResponse(
    mpResponse: any,
    paymentMethod: string
  ): PaymentResponse {
    const baseResponse: PaymentResponse = {
      id: mpResponse.id,
      status: 'pending',
      statusDetail: 'awaiting_payment_method_selection',
      paymentUrl: mpResponse.init_point || mpResponse.sandbox_init_point,
    };

    if (paymentMethod === 'oxxo') {
      return {
        ...baseResponse,
        statusDetail: 'awaiting_oxxo_payment',
        reference: mpResponse.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      };
    }

    if (paymentMethod === 'bank_transfer') {
      return {
        ...baseResponse,
        statusDetail: 'awaiting_bank_transfer',
        reference: mpResponse.id,
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days
      };
    }

    return baseResponse;
  }

  /**
   * Process Mercado Pago webhook notification
   */
  async handleWebhook(notification: any): Promise<boolean> {
    try {
      const { type, data } = notification;

      if (type === 'payment') {
        return await this.processPaymentNotification(data);
      }

      return true;
    } catch (error: any) {
      console.error('❌ Webhook processing failed:', error);
      return false;
    }
  }

  /**
   * Process payment status update from webhook
   */
  private async processPaymentNotification(data: any): Promise<boolean> {
    try {
      // Fetch payment details from Mercado Pago
      const paymentId = data.id;
      const paymentResponse = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          },
        }
      );

      if (!paymentResponse.ok) {
        throw new Error('Failed to fetch payment details');
      }

      const payment = await paymentResponse.json();
      const orderId = payment.external_reference;

      if (!orderId) {
        console.warn('⚠️  Payment notification missing external_reference');
        return false;
      }

      // Update order in database
      const order = await Order.findById(orderId);
      if (!order) {
        console.warn('⚠️  Order not found:', orderId);
        return false;
      }

      const status = this.mapMercadoPagoStatus(payment.status);

      order.status = status === 'completed' ? 'paid' : status === 'failed' ? 'failed' : 'pending_payment';
      order.paymentId = paymentId;
      order.paymentProvider = 'mercadopago';
      
      if (payment.payer?.email) {
        order.email = payment.payer.email;
      }

      await order.save();

      // Credit Affiliate Integration (35% Commission)
      if (order.referralCode && status === 'completed') {
        try {
          const referrer = await Referral.findOne({ code: order.referralCode });
          if (referrer) {
            const commission = order.amount * 0.35;
            referrer.earnings = (referrer.earnings || 0) + commission;
            referrer.usageCount = (referrer.usageCount || 0) + 1;
            await referrer.save();
            console.log(`💰 Affiliate Commission credited: $${commission} to code ${order.referralCode}`);
          }
        } catch (refError) {
          console.error('❌ Failed to credit affiliate:', refError);
        }
      }

      // Trigger Image Generation Job if payment successful
      if (status === 'completed') {
        await generationQueue.add('generate-images', {
          orderId: order._id,
          config: order.config,
          originalImages: order.originalImages,
          packageId: order.packageId
        });
        console.log(`✅ Image generation job queued for order ${orderId}`);
      }

      console.log(`✅ Payment status updated: ${orderId} -> ${status}`);
      return true;
    } catch (error: any) {
      console.error('❌ Payment notification processing failed:', error);
      return false;
    }
  }

  /**
   * Map Mercado Pago status to internal status
   */
  private mapMercadoPagoStatus(mpStatus: string): string {
    const statusMap: Record<string, string> = {
      pending: 'pending',
      approved: 'completed',
      authorized: 'authorized',
      in_process: 'processing',
      in_mediation: 'disputed',
      rejected: 'failed',
      cancelled: 'cancelled',
      refunded: 'refunded',
      charged_back: 'chargedback',
    };

    return statusMap[mpStatus] || 'unknown';
  }

  /**
   * Get payment details
   */
  async getPaymentDetails(preferenceId: string): Promise<any> {
    try {
      const response = await fetch(
        `https://api.mercadopago.com/checkout/preferences/${preferenceId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch payment details');
      }

      return await response.json();
    } catch (error: any) {
      console.error('❌ Failed to get payment details:', error);
      throw error;
    }
  }

  /**
   * Refund payment
   */
  async refundPayment(paymentId: string, amount?: number): Promise<boolean> {
    try {
      const response = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}/refunds`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amount || undefined,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Refund failed: ${response.statusText}`);
      }

      console.log('✅ Payment refunded:', paymentId);
      return true;
    } catch (error: any) {
      console.error('❌ Refund processing failed:', error);
      return false;
    }
  }
}

export const mercadoPagoService = new MercadoPagoService();
