import Database from "better-sqlite3";
import path from "path";

const databasePath = path.join(__dirname, "../../database/salons.sqlite");

export const db = new Database(databasePath);

db.pragma("journal_mode = WAL");

export function initializeDatabase() {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS salons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      address TEXT NOT NULL,
      district TEXT NOT NULL,
      phone TEXT,
      website TEXT,
      services TEXT NOT NULL,
      priceRange TEXT,
      rating REAL,
      reviewsCount INTEGER,
      description TEXT
    )
  `).run();
}