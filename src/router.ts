import { initTRPC } from "@trpc/server";
import { z } from "zod";

type Brewery = {
  id: string;
  name: string;
};

const breweries: Record<string, Brewery> = {};

export const t = initTRPC.create();

export const appRouter = t.router({
  breweries: t.procedure.query(({}) => {
    return breweries;
  }),
  createBrewery: t.procedure
    .input(
      z.object({
        name: z.string().min(3),
      })
    )
    .mutation(({ input }) => {
      const id = Date.now().toString();
      const brewery: Brewery = { id, ...input };
      breweries[brewery.id] = brewery;
      return brewery;
    }),
});

export type AppRouter = typeof appRouter;
