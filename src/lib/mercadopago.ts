import MercadoPagoConfig, { Preference } from 'mercadopago';

export const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!
});

export const preference = new Preference(client);
