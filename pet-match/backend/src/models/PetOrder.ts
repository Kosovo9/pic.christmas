import mongoose from 'mongoose';

const petOrderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false
    },
    petDetails: {
        type: { type: String, enum: ['dog', 'cat', 'other'], default: 'dog' },
        breed: { type: String, default: 'mixed' },
        name: { type: String, default: 'My Pet' },
        theme: { type: String, default: 'studio' } // studio, fantasy, royal, christmas
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
    originalPhoto: {
        type: String, // URL to uploaded photo
        required: true
    },
    generatedImages: [{
        type: String // URLs to AI generated images
    }],
    paymentId: {
        type: String
    },
    referralCode: {
        type: String,
        uppercase: true,
        trim: true
    }
}, {
    timestamps: true
});

const PetOrder = mongoose.model('PetOrder', petOrderSchema);

export default PetOrder;
