import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendChristmasEmail(to: string, image: string, hash: string) {
    if (!process.env.RESEND_API_KEY) {
        console.warn("Skipping email: No Resend API Key found.");
        return;
    }

    try {
        await resend.emails.send({
            from: "Santa <santa@pic.christmas>",
            to: [to],
            subject: "Your Hyper-Realistic Christmas Masterpiece is Ready! 🎄",
            html: `
                <div style="font-family: serif; max-width: 600px; margin: auto; padding: 40px; background-color: #000; color: #fff; border: 2px solid #d4af37; border-radius: 20px;">
                    <h1 style="color: #d4af37; text-align: center;">pic.christmas</h1>
                    <p style="font-size: 18px; text-align: center;">Ho Ho Ho! Your AI portrait has been minted.</p>
                    <div style="margin: 30px 0; border-radius: 15px; overflow: hidden; border: 4px solid #d4af37;">
                        <img src="${image}" alt="Your Christmas AI Photo" style="width: 100%; display: block;" />
                    </div>
                    <p style="text-align: center; color: #888;">Unique Hash: <code>${hash}</code></p>
                    <div style="text-align: center; margin-top: 40px;">
                        <a href="${image}" download style="background-color: #d4af37; color: #000; padding: 15px 30px; border-radius: 10px; text-decoration: none; font-weight: bold;">Download 8K Image</a>
                    </div>
                    <p style="margin-top: 40px; font-size: 12px; color: #444; text-align: center;">© 2024 PIC.CHRISTMAS | Powered by Nexora AI Factory</p>
                </div>
            `
        });
        console.log("✅ Christmas Email Sent to:", to);
    } catch (error) {
        console.error("❌ Failed to send email:", error);
    }
}
