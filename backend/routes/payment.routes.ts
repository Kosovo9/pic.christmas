
import { Router } from 'express';
import { mercadoPagoService } from '../services/mercadoPago.service';
import { oxxoService } from '../services/oxxo.service';
import { bankTransferService } from '../services/bankTransfer.service';

const router = Router();

// Middleware to mock auth if needed or use real one
const authenticate = (req: any, res: any, next: any) => {
    // req.user = { id: 'mock-user-id' }; // For dev
    next();
};

router.post('/mercado-pago', authenticate, async (req, res) => {
    try {
        const { orderId, amount, paymentMethod, description, email } = req.body;
        const result = await mercadoPagoService.createPreference({
            orderId, userId: req.user?.id || 'guest', amount, paymentMethod, description, email, currency: 'MXN'
        });
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/oxxo', authenticate, async (req, res) => {
    try {
        const result = await oxxoService.createOxxoPayment({ ...req.body, userId: req.user?.id || 'guest' });
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/bank-transfer', authenticate, async (req, res) => {
    try {
        const result = await bankTransferService.createBankTransfer({ ...req.body, userId: req.user?.id || 'guest' });
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/webhooks/mercado-pago', async (req, res) => {
    mercadoPagoService.handleWebhook(req.body);
    res.status(200).send('OK');
});

export default router;
