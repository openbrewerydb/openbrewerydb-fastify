import { initTRPC } from "@trpc/server";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { BREWERY_TYPES } from "./config.js";
import { Context } from "./context.js";

type Brewery = {
  id: string;
  obdb_id?: string;
  name: string;
  brewery_type: string;
  street: string;
  address_2?: string;
  address_3?: string;
  city: string;
  state?: string;
  county_province?: string;
  postal_code: string;
  website_url?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
  country: string;
  longitude?: number;
  latitude?: number;
};

const slugifyOptions = {
  remove: /[*+~.,()'"!:@/]/g,
  lower: true,
  strict: true,
};

function generateId(brewery: Brewery, suffix: null | string = null) {
  return slugify(
    `${brewery.name.toLowerCase()}-${brewery.city.toLowerCase()}${
      suffix ? `-${suffix}` : ""
    }`,
    slugifyOptions
  );
}

export const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  breweries: t.procedure.query(({ ctx }) => {
    // TODO: This is just to get things going; separate out into its own file
    const breweries = ctx.db.query(`SELECT * FROM breweries LIMIT 5`);
    return breweries;
  }),
  createBrewery: t.procedure
    .input(
      z.object({
        name: z.string().min(3),
        brewery_type: z.enum(BREWERY_TYPES),
        street: z.string(),
        address_2: z.string().optional(),
        address_3: z.string().optional(),
        city: z.string().min(2),
        state: z.string().min(2).optional(),
        county_province: z.string().optional(),
        postal_code: z.string().min(3),
        website_url: z.string().url().optional(),
        phone: z.string().optional(),
        created_at: z.string().datetime().optional(),
        updated_at: z.string().datetime().optional(),
        country: z.string().min(2),
        longitude: z.number().min(-180).max(180).optional(),
        latitude: z.number().min(-90).max(90).optional(),
      })
    )
    .mutation(({ input }) => {
      // TODO: Finish input into DB, but not before we have auth and permissions set up
      const id = uuidv4();
      const created_at = input.created_at ?? new Date().toISOString();
      const updated_at = input.updated_at ?? new Date().toISOString();
      const obdb_id = generateId({ id, ...input });
      const brewery: Brewery = {
        id,
        obdb_id,
        created_at,
        updated_at,
        ...input,
      };
      return brewery;
    }),
});

export type AppRouter = typeof appRouter;
