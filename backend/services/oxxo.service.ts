
import { mercadoPagoService } from './mercadoPago.service';

interface OxxoPaymentRequest {
    orderId: string;
    userId: string;
    amount: number;
    email: string;
    description: string;
}

export const oxxoService = {
    async createOxxoPayment(payment: OxxoPaymentRequest) {
        return mercadoPagoService.createPreference({
            ...payment,
            currency: 'MXN',
            paymentMethod: 'oxxo'
        });
    }
};
