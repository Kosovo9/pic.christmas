import Order from '../models/Order';
import { mercadoPagoService } from './mercadoPago.service';

interface BankTransferRequest {
  orderId: string;
  userId?: string;
  amount: number;
  email: string;
  description: string;
  country: 'MX' | 'AR' | 'CO';
}

interface BankAccountDetails {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  routingNumber?: string;
  clabe?: string;
  cbu?: string;
  nip?: string;
}

interface BankTransferResponse {
  reference: string;
  bankDetails: BankAccountDetails;
  amount: number;
  currency: string;
  expiresAt: string;
  conceptOfPayment: string;
  instructions: BankTransferInstructions;
}

interface BankTransferInstructions {
  web: string;
  mobile: string;
  atm: string;
  branch: string;
}

class BankTransferService {
  private bankAccounts: Record<string, BankAccountDetails> = {
    MX: {
      bankName: 'BBVA México',
      accountNumber: '0121000345000000012',
      accountHolder: 'PIC CHRISTMAS',
      clabe: '012980000121000345',
    },
    AR: {
      bankName: 'Banco de Argentina',
      accountNumber: '2850502020000000091',
      accountHolder: 'PIC CHRISTMAS SA',
      cbu: '0140002850502020000000091',
    },
    CO: {
      bankName: 'Banco Bogotá',
      accountNumber: '42020016503',
      accountHolder: 'PIC CHRISTMAS LTDA',
      nip: '12',
    },
  };

  /**
   * Create bank transfer payment
   */
  async createBankTransfer(payment: BankTransferRequest): Promise<BankTransferResponse> {
    try {
      // Create preference through Mercado Pago
      const mpResponse = await mercadoPagoService.createPreference({
        orderId: payment.orderId,
        userId: payment.userId,
        amount: payment.amount,
        currency: this.getCurrency(payment.country),
        paymentMethod: 'bank_transfer',
        description: payment.description,
        email: payment.email,
      });

      const bankDetails = this.bankAccounts[payment.country];
      const conceptOfPayment = `PIC-${payment.orderId}`;

      const response: BankTransferResponse = {
        reference: payment.orderId,
        bankDetails,
        amount: payment.amount,
        currency: this.getCurrency(payment.country),
        expiresAt: mpResponse.expiresAt || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        conceptOfPayment,
        instructions: this.generateBankTransferInstructions(payment.country),
      };

      // Update order with bank transfer info
      const order = await Order.findById(payment.orderId);
      if (order) {
        order.paymentProvider = 'bank_transfer';
        await order.save();
      }

      console.log('✅ Bank transfer payment created:', payment.orderId);

      return response;
    } catch (error: any) {
      console.error('❌ Bank transfer creation failed:', error);
      throw error;
    }
  }

  /**
   * Get currency code by country
   */
  private getCurrency(country: string): string {
    const currencyMap: Record<string, string> = {
      MX: 'MXN',
      AR: 'ARS',
      CO: 'COP',
    };
    return currencyMap[country] || 'MXN';
  }

  /**
   * Generate step-by-step bank transfer instructions by country
   */
  private generateBankTransferInstructions(country: string): BankTransferInstructions {
    if (country === 'MX') {
      return {
        web: 'Usa CLABE o número de cuenta en tu banco digital o página web',
        mobile: 'Abre tu app bancaria → Transferencia → Ingresa los datos → Confirma',
        atm: 'Cajero automático → Transferencia → CLABE o cuenta → Monto → Confirma',
        branch: 'Sucursal bancaria → Pedir al empleado una transferencia con CLABE',
      };
    }

    if (country === 'AR') {
      return {
        web: 'Usa CBU o alias en tu banco digital o página web',
        mobile: 'App bancaria → Transferencia → CBU/Alias → Confirma',
        atm: 'Cajero automático → Transferencia → CBU → Monto → Confirma',
        branch: 'Sucursal bancaria → Transferencia con CBU o alias',
      };
    }

    return {
      web: 'App bancaria → Transferencia → NIT y número de cuenta',
      mobile: 'App banco → Enviar dinero → Ingresa datos → Confirma',
      atm: 'Cajero automático → Transferencia → Código de cuenta → Monto',
      branch: 'Sucursal → Pedir transferencia bancaria a PIC CHRISTMAS LTDA',
    };
  }

  /**
   * Verify bank transfer payment via Mercado Pago webhook
   */
  async verifyBankTransfer(orderId: string): Promise<boolean> {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return false;
      }

      return order.status === 'paid' || order.status === 'completed';
    } catch (error: any) {
      console.error('❌ Bank transfer verification failed:', error);
      return false;
    }
  }

  /**
   * Get bank transfer details for customer
   */
  async getBankTransferDetails(orderId: string, country: 'MX' | 'AR' | 'CO'): Promise<BankTransferResponse | null> {
    try {
      const order = await Order.findById(orderId);
      if (!order || order.paymentProvider !== 'bank_transfer') {
        return null;
      }

      const bankDetails = this.bankAccounts[country];

      return {
        reference: orderId,
        bankDetails,
        amount: order.amount,
        currency: this.getCurrency(country),
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        conceptOfPayment: `PIC-${orderId}`,
        instructions: this.generateBankTransferInstructions(country),
      };
    } catch (error: any) {
      console.error('❌ Failed to get bank transfer details:', error);
      return null;
    }
  }

  /**
   * Check if bank transfer payment has expired
   */
  async isBankTransferExpired(orderId: string): Promise<boolean> {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return true;
      }

      // Bank transfers expire after 3 days
      const createdAt = order.createdAt || new Date();
      const expiresAt = new Date(createdAt.getTime() + 3 * 24 * 60 * 60 * 1000);
      return new Date() > expiresAt;
    } catch (error: any) {
      console.error('❌ Failed to check bank transfer expiration:', error);
      return true;
    }
  }
}

export const bankTransferService = new BankTransferService();
