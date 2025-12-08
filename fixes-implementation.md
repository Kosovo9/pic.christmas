# 🔧 CRITICAL FIXES IMPLEMENTATION GUIDE

## Priority 1: Critical Security & Stability Fixes

### 1. Environment Variable Validation

**File:** `backend/config/env.ts` (NEW)
```typescript
import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
  'STRIPE_SECRET_KEY',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'REDIS_URL',
];

const optionalEnvVars = [
  'GOOGLE_AI_API_KEY',
  'REPLICATE_API_TOKEN',
  'MERCADO_PAGO_ACCESS_TOKEN',
  'FRONTEND_URL',
];

export function validateEnv() {
  const missing: string[] = [];
  
  requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });
  
  if (missing.length > 0) {
    throw new Error(
      `❌ Missing required environment variables:\n${missing.join('\n')}\n\n` +
      `Please set these in your .env file or environment.`
    );
  }
  
  console.log('✅ All required environment variables validated');
  
  // Warn about missing optional vars
  optionalEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      console.warn(`⚠️  Optional env var not set: ${varName}`);
    }
  });
}

export default validateEnv;
```

**Update:** `backend/server.ts`
```typescript
import validateEnv from './config/env';

// At the very top, before anything else
validateEnv();
```

---

### 2. Enhanced Database Connection with Retry Logic

**File:** `backend/config/db.ts` (UPDATE)
```typescript
import mongoose from 'mongoose';

const MAX_RETRIES = 5;
const RETRY_DELAY = 2000; // 2 seconds

async function connectWithRetry(retries = MAX_RETRIES): Promise<void> {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || '', {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority',
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected. Attempting reconnect...');
      setTimeout(() => connectWithRetry(), RETRY_DELAY);
    });
    
  } catch (error: any) {
    console.error(`❌ MongoDB connection failed (${MAX_RETRIES - retries + 1}/${MAX_RETRIES}):`, error.message);
    
    if (retries > 0) {
      const delay = RETRY_DELAY * (MAX_RETRIES - retries + 1);
      console.log(`🔄 Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return connectWithRetry(retries - 1);
    } else {
      console.error('❌ MongoDB connection failed after all retries. Server will continue in degraded mode.');
      throw error;
    }
  }
}

const connectDB = async () => {
  await connectWithRetry();
};

export default connectDB;
```

---

### 3. Input Validation Middleware

**File:** `backend/middleware/validation.ts` (NEW)
```typescript
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Validation schemas
export const orderSchema = z.object({
  packageId: z.enum(['single', 'couple', 'family']),
  config: z.object({
    adults: z.number().int().min(0).max(10),
    children: z.number().int().min(0).max(10),
    pets: z.number().int().min(0).max(5),
  }),
  originalImages: z.array(z.string().url()).min(1).max(10),
  referralCode: z.string().optional(),
  useCredit: z.boolean().optional(),
});

export const paymentIntentSchema = z.object({
  orderId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid order ID format'),
});

export const enhancePromptSchema = z.object({
  userPrompt: z.string().min(1).max(500),
  config: z.object({
    adults: z.number().int().min(0).max(10),
    children: z.number().int().min(0).max(10),
    pets: z.number().int().min(0).max(5),
  }),
});

export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Validation error',
          errors: error.errors,
        });
      }
      return res.status(400).json({ message: 'Invalid request data' });
    }
  };
}
```

**Update:** `backend/routes/orders.routes.ts`
```typescript
import { validate, orderSchema } from '../middleware/validation';

router.post('/', validate(orderSchema), async (req, res) => {
  // ... existing code
});
```

---

### 4. Enhanced Health Check

**File:** `backend/server.ts` (UPDATE)
```typescript
import mongoose from 'mongoose';
import { generationQueue } from './config/clients';
import { v2 as cloudinary } from 'cloudinary';

app.get('/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      mongodb: 'unknown',
      redis: 'unknown',
      cloudinary: 'unknown',
      stripe: 'configured',
      mercadoPago: 'configured',
    },
  };
  
  // Check MongoDB
  try {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.db.admin().ping();
      health.services.mongodb = 'connected';
    } else {
      health.services.mongodb = 'disconnected';
    }
  } catch (error) {
    health.services.mongodb = 'error';
  }
  
  // Check Redis
  try {
    if (generationQueue && generationQueue.client) {
      await generationQueue.client.ping();
      health.services.redis = 'connected';
    } else {
      health.services.redis = 'not_configured';
    }
  } catch (error) {
    health.services.redis = 'error';
  }
  
  // Check Cloudinary
  try {
    await cloudinary.api.ping();
    health.services.cloudinary = 'connected';
  } catch (error) {
    health.services.cloudinary = 'error';
  }
  
  const allHealthy = Object.values(health.services).every(
    status => status === 'connected' || status === 'configured'
  );
  
  res.status(allHealthy ? 200 : 503).json(health);
});
```

---

### 5. Graceful Shutdown

**File:** `backend/server.ts` (UPDATE)
```typescript
import mongoose from 'mongoose';
import { generationQueue } from './config/clients';

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // ... existing logs
});

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);
  
  // Stop accepting new requests
  server.close(async () => {
    console.log('✅ HTTP server closed');
    
    try {
      // Close database connections
      await mongoose.connection.close();
      console.log('✅ MongoDB connection closed');
      
      // Close Redis connection
      if (generationQueue?.client) {
        await generationQueue.client.quit();
        console.log('✅ Redis connection closed');
      }
      
      console.log('✅ Graceful shutdown complete');
      process.exit(0);
    } catch (error) {
      console.error('❌ Error during shutdown:', error);
      process.exit(1);
    }
  });
  
  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('⚠️  Forcing shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
```

---

### 6. Request ID Middleware

**File:** `backend/middleware/requestId.ts` (NEW)
```typescript
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const requestId = req.headers['x-request-id'] as string || uuidv4();
  req.id = requestId;
  res.setHeader('X-Request-ID', requestId);
  next();
}
```

**Update:** `backend/server.ts`
```typescript
import { requestIdMiddleware } from './middleware/requestId';

app.use(requestIdMiddleware);
```

---

### 7. Enhanced Error Handling Middleware

**File:** `backend/middleware/errorHandler.ts` (NEW)
```typescript
import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = (err as AppError).statusCode || 500;
  const message = err.message || 'Internal server error';
  
  // Log error with request ID
  console.error(`[${req.id || 'unknown'}] Error:`, {
    message,
    statusCode,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });
  
  res.status(statusCode).json({
    error: {
      message,
      requestId: req.id,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
}
```

**Update:** `backend/server.ts`
```typescript
import { errorHandler } from './middleware/errorHandler';

// After all routes
app.use(errorHandler);
```

---

## Installation Requirements

Add to `backend/package.json`:
```json
{
  "dependencies": {
    "zod": "^3.22.4",
    "uuid": "^9.0.1"
  }
}
```

Run:
```bash
cd backend && npm install zod uuid @types/uuid
```

---

## Testing the Fixes

1. **Test Environment Validation:**
```bash
# Remove an env var and start server
unset MONGODB_URI
npm start
# Should fail with clear error message
```

2. **Test Health Check:**
```bash
curl https://pic-christmas-backend.onrender.com/health
# Should show actual service status
```

3. **Test Input Validation:**
```bash
curl -X POST https://pic-christmas-backend.onrender.com/api/orders \
  -H "Content-Type: application/json" \
  -d '{"invalid": "data"}'
# Should return 400 with validation errors
```

---

## Next Steps

1. Implement fixes in order of priority
2. Test each fix individually
3. Run stress tests after each fix
4. Deploy to staging for validation
5. Monitor in production
