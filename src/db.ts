import pgPromise from "pg-promise";
import { postgresConnectionString } from "./config.js";

const pgp = pgPromise();

export const db = pgp(postgresConnectionString);
