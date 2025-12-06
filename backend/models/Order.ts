import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false // Optional for guest checkout
    },
    email: {
        type: String,
        required: false
    },
    packageId: {
        type: String,
        required: true,
        enum: ['single', 'couple', 'family']
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'paid', 'processing', 'completed', 'failed'],
        default: 'pending'
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'USD'
    },
    config: {
        adults: { type: Number, default: 0 },
        children: { type: Number, default: 0 },
        pets: { type: Number, default: 0 },
        vibe: { type: String, default: 'cozy' }
    },
    originalImages: [{
        type: String // URLs to uploaded images
    }],
    generatedImages: [{
        type: String // URLs to AI generated images
    }],
    paymentId: {
        type: String
    },
    paymentProvider: {
        type: String,
        enum: ['stripe', 'mercadopago', 'paypal']
    },
    referralCode: {
        type: String,
        uppercase: true,
        trim: true
    },
    pricingBreakdown: {
        basePrice: { type: Number, default: 0 },
        extraAdults: { type: Number, default: 0 },
        extraChildren: { type: Number, default: 0 },
        extraPets: { type: Number, default: 0 },
        subtotal: { type: Number, default: 0 },
        referralDiscount: { type: Number, default: 0 },
        total: { type: Number, default: 0 }
    },
    usedCredit: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
