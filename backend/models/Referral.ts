import mongoose, { Schema, Document } from 'mongoose';

export interface IReferral extends Document {
    code: string;
    userId?: string; // Optional for MVP - can be email or user ID
    email?: string;
    conversions: string[]; // Array of Order IDs
    credits: number;
    createdAt: Date;
    updatedAt: Date;
}

const ReferralSchema: Schema = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },
        userId: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
        },
        conversions: [{
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }],
        credits: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster lookups
ReferralSchema.index({ code: 1 });
ReferralSchema.index({ email: 1 });

export default mongoose.model<IReferral>('Referral', ReferralSchema);
