import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { creditsRouter } from "./routers/credits";
import { transformationsRouter } from "./routers/transformations";
import { r2Router } from "./routers/r2";
import { stripeRouter } from "./routers/stripe";
import { mercadopagoRouter } from "./routers/mercadopago";

export const appRouter = createTRPCRouter({
    credits: creditsRouter,
    transformations: transformationsRouter,
    r2: r2Router,
    stripe: stripeRouter,
    mercadopago: mercadopagoRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
