import fs from "fs";
import path from "path";
import { db, initializeDatabase } from "./database";

type SeedSalon = {
  name: string;
  category: string;
  address: string;
  district: string;
  phone: string | null;
  website: string | null;
  services: string[];
  priceRange: string | null;
  rating: number | null;
  reviewsCount: number | null;
  description: string | null;
};

initializeDatabase();

const seedPath = path.join(__dirname, "../../data/salons.seed.json");
const rawData = fs.readFileSync(seedPath, "utf-8");
const salons: SeedSalon[] = JSON.parse(rawData);

db.prepare("DELETE FROM salons").run();

const insertSalon = db.prepare(`
  INSERT INTO salons (
    name,
    category,
    address,
    district,
    phone,
    website,
    services,
    priceRange,
    rating,
    reviewsCount,
    description
  )
  VALUES (
    @name,
    @category,
    @address,
    @district,
    @phone,
    @website,
    @services,
    @priceRange,
    @rating,
    @reviewsCount,
    @description
  )
`);

const insertMany = db.transaction((items: SeedSalon[]) => {
  for (const salon of items) {
    insertSalon.run({
      ...salon,
      services: JSON.stringify(salon.services),
    });
  }
});

insertMany(salons);

console.log(`Seed completed. Inserted ${salons.length} salons.`);