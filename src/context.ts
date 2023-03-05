import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { prisma } from "./db.js";

export function createContext({ req, res }: CreateFastifyContextOptions) {
  return { req, res, prisma };
}

export type Context = inferAsyncReturnType<typeof createContext>;
