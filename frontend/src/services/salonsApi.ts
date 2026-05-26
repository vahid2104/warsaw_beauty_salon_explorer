import type { Salon, SalonListItem } from "../types/salon";

const API_URL = import.meta.env.VITE_API_URL;

export async function getSalons(params?: {
  search?: string;
  district?: string;
  category?: string;
}): Promise<SalonListItem[]> {
  const queryParams = new URLSearchParams();

  if (params?.search) queryParams.append("search", params.search);
  if (params?.district && params.district !== "All Districts") {
    queryParams.append("district", params.district);
  }
  if (params?.category && params.category !== "All Categories") {
    queryParams.append("category", params.category);
  }

  const response = await fetch(`${API_URL}/salons?${queryParams.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch salons");
  }

  return response.json();
}

export async function getSalonById(id: number): Promise<Salon> {
  const response = await fetch(`${API_URL}/salons/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch salon details");
  }

  return response.json();
}

export async function updateSalon(id: number, salon: Omit<Salon, "id">): Promise<Salon> {
  const response = await fetch(`${API_URL}/salons/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(salon),
  });

  if (!response.ok) {
    throw new Error("Failed to update salon");
  }

  return response.json();
}