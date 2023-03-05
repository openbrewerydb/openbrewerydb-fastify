import { PrismaClient, Prisma } from "@prisma/client";
import fetch from "node-fetch";
import csv from "neat-csv";
import { randomUUID } from "crypto";

const CSV_URL =
  "https://raw.githubusercontent.com/openbrewerydb/openbrewerydb/master/breweries.csv";
const prisma = new PrismaClient();

interface CSVRow {
  obdb_id: string;
  name: string;
  brewery_type: string;
  street: string;
  address_2: string;
  address_3: string;
  city: string;
  state: string;
  county_province: string;
  postal_code: string;
  website_url: string;
  phone: string;
  country: string;
  longitude: number;
  latitude: number;
  tags: string[];
}

async function main() {
  console.log(`Start seeding ...`);
  const response = await fetch(CSV_URL);
  const rows = await csv<CSVRow>(await response.text());
  for (const b of rows) {
    const id = randomUUID();
    const brewery = await prisma.breweries.create({
      data: {
        id,
        name: b.name,
        brewery_type: b.brewery_type,
        address_1: b.street,
        address_2: b.address_2,
        address_3: b.address_3,
        city: b.city,
        state_province: b.county_province ? b.county_province : b.state,
        postcode: b.postal_code,
        country: b.country,
        website_url: b.website_url,
        phone: b.phone,
        longitude: +b.longitude || null,
        latitude: +b.latitude || null,
      },
    });
    console.log(`Created brewery with id: ${brewery.id} (${brewery.name})`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
