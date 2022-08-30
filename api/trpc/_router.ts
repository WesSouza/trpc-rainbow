import * as trpc from '@trpc/server';

export const appRouter = trpc.router();

export type AppRouter = typeof appRouter;
