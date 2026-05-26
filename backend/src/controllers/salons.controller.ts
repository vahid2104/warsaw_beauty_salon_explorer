import { Request, Response } from "express";
import { db } from "../db/database";

function parseSalon(row: any) {
  return {
    ...row,
    services: JSON.parse(row.services || "[]"),
  };
}

export function getSalons(req: Request, res: Response) {
  const { district, category, search } = req.query;

  let query = `
    SELECT 
      id,
      name,
      category,
      address,
      district,
      priceRange,
      rating,
      reviewsCount
    FROM salons
    WHERE 1 = 1
  `;

  const params: Record<string, string> = {};

  if (district && district !== "All Districts") {
    query += " AND district = @district";
    params.district = String(district);
  }

  if (category && category !== "All Categories") {
    query += " AND category = @category";
    params.category = String(category);
  }

  if (search) {
    query += `
      AND (
        name LIKE @search OR
        address LIKE @search OR
        category LIKE @search OR
        services LIKE @search
      )
    `;
    params.search = `%${String(search)}%`;
  }

  query += " ORDER BY rating DESC, reviewsCount DESC";

  const salons = db.prepare(query).all(params);

  res.json(salons);
}

export function getSalonById(req: Request, res: Response) {
  const { id } = req.params;

  const salon = db.prepare("SELECT * FROM salons WHERE id = ?").get(id);

  if (!salon) {
    return res.status(404).json({ message: "Salon not found" });
  }

  res.json(parseSalon(salon));
}

export function updateSalon(req: Request, res: Response) {
  const { id } = req.params;

  const existingSalon = db.prepare("SELECT * FROM salons WHERE id = ?").get(id);

  if (!existingSalon) {
    return res.status(404).json({ message: "Salon not found" });
  }

  const {
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
    description,
  } = req.body;

  db.prepare(`
    UPDATE salons
    SET
      name = @name,
      category = @category,
      address = @address,
      district = @district,
      phone = @phone,
      website = @website,
      services = @services,
      priceRange = @priceRange,
      rating = @rating,
      reviewsCount = @reviewsCount,
      description = @description
    WHERE id = @id
  `).run({
    id,
    name,
    category,
    address,
    district,
    phone: phone || null,
    website: website || null,
    services: JSON.stringify(services || []),
    priceRange: priceRange || null,
    rating: rating ?? null,
    reviewsCount: reviewsCount ?? null,
    description: description || null,
  });

  const updatedSalon = db.prepare("SELECT * FROM salons WHERE id = ?").get(id);

  res.json(parseSalon(updatedSalon));
}