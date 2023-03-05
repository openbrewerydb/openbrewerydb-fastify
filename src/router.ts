import { initTRPC } from "@trpc/server";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { BREWERY_TYPES } from "./config.js";
import { Context } from "./context.js";
import { Brewery } from "./libs/types.js";

export const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  breweries: t.procedure.query(({ ctx }) => {
    const breweries = ctx.prisma.breweries.findMany();
    return breweries;
  }),
  createBrewery: t.procedure
    .input(
      z.object({
        name: z.string().min(3),
        brewery_type: z.enum(BREWERY_TYPES),
        address_1: z.string(),
        address_2: z.string().optional(),
        address_3: z.string().optional(),
        city: z.string().min(2),
        state_province: z.string().min(2),
        country: z.string().min(2),
        postcode: z.string().min(3),
        website_url: z.string().url().optional(),
        phone: z.string().optional(),
        longitude: z.number().min(-180).max(180).optional(),
        latitude: z.number().min(-90).max(90).optional(),
      })
    )
    .mutation(({ input }) => {
      const id = uuidv4();
      const brewery: Brewery = {
        id,
        ...input,
      };
      return brewery;
    }),
});

export type AppRouter = typeof appRouter;
