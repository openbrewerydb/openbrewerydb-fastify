import "dotenv/config";

export const BREWERY_TYPES = [
  "micro",
  "nano",
  "regional",
  "brewpub",
  "large",
  "planning",
  "bar",
  "contract",
  "proprietor",
  "closed",
] as const;

export const postgresConnectionString =
  process.env.PG_URL ||
  "postgres://postgres@localhost/openbrewerydb_development";
