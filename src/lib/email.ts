/**
 * Email Service (Mock Implementation for MVP)
 * 
 * In production, replace the console.log with a real provider like Resend or SendGrid.
 * Required Env: RESEND_API_KEY (if using Resend)
 */

export interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
    console.log("================ EMAIL SERVICE ================");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log("Body:", html.substring(0, 100) + "...");
    console.log("===============================================");

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return true;
}

export async function sendInvitationEmail(to: string, referralCode: string) {
    const inviteLink = `https://pic.christmas/?ref=${referralCode}`;

    return sendEmail({
        to,
        subject: "🎁 Your Christmas Photos + Free Gift!",
        html: `
      <h1>Your Photos are Ready!</h1>
      <p>Thanks for using Pic.Christmas. Your photos are attached (mock).</p>
      
      <h2>Give the Gift of Magic</h2>
      <p>Invite your friends and earn free photos!</p>
      <p>Share this link: <a href="${inviteLink}">${inviteLink}</a></p>
      
      <p>Happy Holidays,<br/>The Pic.Christmas Team</p>
    `
    });
}
