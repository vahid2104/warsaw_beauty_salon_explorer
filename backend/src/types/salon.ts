export type Salon = {
  id: number;
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