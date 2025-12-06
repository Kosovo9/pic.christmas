import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

class EmailService {
    private resend: Resend | null = null;
    private fromEmail = 'orders@pic.christmas'; 

    constructor() {
        if (process.env.RESEND_API_KEY) {
            this.resend = new Resend(process.env.RESEND_API_KEY);
        } else {
            console.warn('⚠️ RESEND_API_KEY missing. Emails will be logged to console.');
        }
    }

    async sendOrderReadyEmail(to: string, orderId: string, downloadLink: string) {
        if (!this.resend) {
            console.log(`📧 [MOCK EMAIL] To: ${to} | Subject: Your Christmas Photos are Ready! 🎄`);
            console.log(`Included Link: ${downloadLink}`);
            return true;
        }

        try {
            await this.resend.emails.send({
                from: this.fromEmail,
                to: to,
                subject: 'Your Christmas Photos are Ready! 🎄✨',
                html: `
                    <div style="font-family: sans-serif; text-align: center; color: #1e293b;">
                        <h1>Your Magic is Ready! 🎅</h1>
                        <p>Our elves have finished painting your masterpieces.</p>
                        <a href="${downloadLink}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 99px; font-weight: bold;">
                            View My Photos
                        </a>
                        <p style="margin-top: 20px; font-size: 12px; color: #64748b;">
                            Order ID: ${orderId}
                        </p>
                    </div>
                `
            });
            console.log(`✅ Email sent to ${to}`);
            return true;
        } catch (error) {
            console.error('❌ Failed to send email:', error);
            return false;
        }
    }
}

export const emailService = new EmailService();
