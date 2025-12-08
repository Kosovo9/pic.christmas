
import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            auth?: {
                userId?: string;
                sessionId?: string;
            };
            user?: {
                id: string;
                email?: string;
                firstName?: string;
            };
        }
    }
}
