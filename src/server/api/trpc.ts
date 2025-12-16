import { initTRPC, TRPCError } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { auth } from "@clerk/nextjs/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { db } from "@/db";

export const createTRPCContext = async (opts: { headers: Headers }) => {
    const session = auth();
    return {
        db,
        session,
        headers: opts.headers,
    };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
        };
    },
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
        ctx: {
            session: { ...ctx.session, userId: ctx.session.userId },
        },
    });
});
