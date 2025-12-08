
import { mercadoPagoService } from './mercadoPago.service';

interface BankTransferRequest {
    orderId: string;
    userId: string;
    amount: number;
    email: string;
    description: string;
    country: 'MX' | 'AR' | 'CO';
}

export const bankTransferService = {
    async createBankTransfer(payment: BankTransferRequest) {
        return mercadoPagoService.createPreference({
            ...payment,
            currency: payment.country === 'MX' ? 'MXN' : 'ARS', // Simplified currency logic
            paymentMethod: 'bank_transfer'
        });
    }
};
