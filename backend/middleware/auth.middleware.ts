import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';

dotenv.config();

// Ensure the API Key is available
if (!process.env.CLERK_SECRET_KEY) {
    console.warn('⚠️ CLERK_SECRET_KEY is missing in backend .env');
}

// Export the middleware with configuration
// This will populate req.auth with the user's session
export const requireAuth = ClerkExpressWithAuth({
    // Add any specific config here if needed
});
