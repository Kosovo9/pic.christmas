import Order from '../models/Order';
import { mercadoPagoService } from './mercadoPago.service';

interface OxxoPaymentRequest {
  orderId: string;
  userId?: string;
  amount: number;
  email: string;
  description: string;
}

interface OxxoPaymentResponse {
  reference: string;
  qrCode?: string;
  barcode: string;
  expiresAt: string;
  paymentUrl: string;
  instructions: OxxoInstructions;
}

interface OxxoInstructions {
  step1: string;
  step2: string;
  step3: string;
  step4: string;
}

class OxxoService {
  /**
   * Create OXXO payment (via Mercado Pago)
   * OXXO es el equivalente a Walmart Pay en México
   */
  async createOxxoPayment(payment: OxxoPaymentRequest): Promise<OxxoPaymentResponse> {
    try {
      // Create preference through Mercado Pago with OXXO method
      const mpResponse = await mercadoPagoService.createPreference({
        orderId: payment.orderId,
        userId: payment.userId,
        amount: payment.amount,
        currency: 'MXN',
        paymentMethod: 'oxxo',
        description: payment.description,
        email: payment.email,
      });

      // Extract OXXO details
      const oxxoResponse: OxxoPaymentResponse = {
        reference: mpResponse.reference || mpResponse.id,
        barcode: `OXXO_${payment.orderId}`,
        expiresAt: mpResponse.expiresAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        paymentUrl: mpResponse.paymentUrl || '',
        instructions: this.generateOxxoInstructions(payment.orderId),
      };

      // Update order with OXXO payment info
      const order = await Order.findById(payment.orderId);
      if (order) {
        order.paymentProvider = 'oxxo';
        await order.save();
      }

      console.log('✅ OXXO payment created:', payment.orderId);

      return oxxoResponse;
    } catch (error: any) {
      console.error('❌ OXXO payment creation failed:', error);
      throw error;
    }
  }

  /**
   * Generate step-by-step OXXO payment instructions
   */
  private generateOxxoInstructions(orderId: string): OxxoInstructions {
    return {
      step1: '1. Dirígete a cualquier tienda OXXO en México',
      step2: '2. Dile al cajero que quieres realizar un pago de servicios',
      step3: `3. Proporciona el número de referencia: ${orderId}`,
      step4: '4. Realiza el pago en efectivo y recibe tu comprobante',
    };
  }

  /**
   * Verify OXXO payment via Mercado Pago webhook
   */
  async verifyOxxoPayment(orderId: string): Promise<boolean> {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return false;
      }

      return order.status === 'paid' || order.status === 'completed';
    } catch (error: any) {
      console.error('❌ OXXO payment verification failed:', error);
      return false;
    }
  }

  /**
   * Get OXXO payment details for customer
   */
  async getOxxoPaymentDetails(orderId: string): Promise<OxxoPaymentResponse | null> {
    try {
      const order = await Order.findById(orderId);
      if (!order || order.paymentProvider !== 'oxxo') {
        return null;
      }

      return {
        reference: order.paymentId || orderId,
        barcode: `OXXO_${orderId}`,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        paymentUrl: '',
        instructions: this.generateOxxoInstructions(orderId),
      };
    } catch (error: any) {
      console.error('❌ Failed to get OXXO payment details:', error);
      return null;
    }
  }

  /**
   * Check if OXXO payment has expired
   */
  async isOxxoPaymentExpired(orderId: string): Promise<boolean> {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return true;
      }

      // OXXO payments expire after 7 days
      const createdAt = order.createdAt || new Date();
      const expiresAt = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);
      return new Date() > expiresAt;
    } catch (error: any) {
      console.error('❌ Failed to check OXXO expiration:', error);
      return true;
    }
  }
}

export const oxxoService = new OxxoService();
