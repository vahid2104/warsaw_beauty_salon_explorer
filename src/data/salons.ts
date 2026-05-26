export type Salon = {
  id: string;
  name: string;
  category: string;
  district: string;
  rating: number;
  reviewsCount: number;
  address: string;
  priceRange: string;
  phone: string;
  website?: string;
  services: string[];
  description: string;
};

export const salonData: Salon[] = [
  {
    id: "1",
    name: "Salon Piękności Mokotów",
    category: "Hair & Beauty",
    district: "Mokotów",
    rating: 4.8,
    reviewsCount: 127,
    address: "ul. Puławska 45, 02-508 Warszawa",
    priceRange: "$$",
    phone: "+48 22 123 4567",
    website: "https://salonmokotow.pl",
    services: ["Haircut", "Coloring", "Manicure", "Pedicure", "Massage"],
    description: "Premium beauty salon offering full range of hair and beauty services in the heart of Mokotów."
  },
  {
    id: "2",
    name: "Beauty Corner Śródmieście",
    category: "Beauty",
    district: "Śródmieście",
    rating: 4.9,
    reviewsCount: 203,
    address: "ul. Marszałkowska 12, 00-590 Warszawa",
    priceRange: "$$$",
    phone: "+48 22 234 5678",
    website: "https://beautycorner.pl",
    services: ["Facial", "Manicure", "Pedicure", "Waxing", "Makeup"],
    description: "Luxury beauty salon in central Warsaw specializing in premium skincare and beauty treatments."
  },
  {
    id: "3",
    name: "Fryzjer Praga",
    category: "Hair",
    district: "Praga-Południe",
    rating: 4.3,
    reviewsCount: 89,
    address: "ul. Grochowska 234, 04-357 Warszawa",
    priceRange: "$",
    phone: "+48 22 345 6789",
    services: ["Haircut", "Coloring", "Styling", "Keratin Treatment"],
    description: "Affordable hair salon with experienced stylists offering modern cuts and coloring."
  },
  {
    id: "4",
    name: "Nails & Spa Wilanów",
    category: "Nails & Spa",
    district: "Wilanów",
    rating: 4.7,
    reviewsCount: 156,
    address: "ul. Klimczaka 5, 02-797 Warszawa",
    priceRange: "$$",
    phone: "+48 22 456 7890",
    website: "https://nailsspa-wilanow.pl",
    services: ["Manicure", "Pedicure", "Gel Nails", "Nail Art", "Spa Treatments"],
    description: "Modern nail salon and spa offering relaxing treatments in elegant Wilanów neighborhood."
  },
  {
    id: "5",
    name: "Glamour Studio Żoliborz",
    category: "Hair & Beauty",
    district: "Żoliborz",
    rating: 4.6,
    reviewsCount: 94,
    address: "ul. Słowackiego 18, 01-634 Warszawa",
    priceRange: "$$",
    phone: "+48 22 567 8901",
    services: ["Haircut", "Highlights", "Manicure", "Makeup", "Eyelash Extensions"],
    description: "Cozy salon in Żoliborz with friendly atmosphere and professional beauty services."
  },
  {
    id: "6",
    name: "Elite Hair Salon Ochota",
    category: "Hair",
    district: "Ochota",
    rating: 4.9,
    reviewsCount: 178,
    address: "ul. Grójjecka 58, 02-339 Warszawa",
    priceRange: "$$$",
    phone: "+48 22 678 9012",
    website: "https://elitehair-ochota.pl",
    services: ["Haircut", "Coloring", "Balayage", "Hair Extensions", "Treatment"],
    description: "Award-winning hair salon known for exceptional coloring techniques and luxury treatments."
  },
  {
    id: "7",
    name: "Beauty Lab Wola",
    category: "Beauty",
    district: "Wola",
    rating: 4.5,
    reviewsCount: 112,
    address: "ul. Połczyńska 77, 01-302 Warszawa",
    priceRange: "$$",
    phone: "+48 22 789 0123",
    services: ["Facial", "Microdermabrasion", "Chemical Peel", "Massage", "Laser Treatment"],
    description: "Modern beauty clinic with advanced skincare treatments and professional cosmetologists."
  },
  {
    id: "8",
    name: "Quick Cut Bemowo",
    category: "Hair",
    district: "Bemowo",
    rating: 4.1,
    reviewsCount: 67,
    address: "ul. Powstańców Śląskich 99, 01-381 Warszawa",
    priceRange: "$",
    phone: "+48 22 890 1234",
    services: ["Haircut", "Beard Trim", "Styling"],
    description: "Fast and affordable hair salon perfect for quick cuts and styling."
  },
  {
    id: "9",
    name: "Spa Uroda Bielany",
    category: "Spa",
    district: "Bielany",
    rating: 4.8,
    reviewsCount: 145,
    address: "ul. Żeromskiego 23, 01-882 Warszawa",
    priceRange: "$$$",
    phone: "+48 22 901 2345",
    website: "https://spauroda-bielany.pl",
    services: ["Massage", "Facial", "Body Treatment", "Sauna", "Aromatherapy"],
    description: "Full-service spa offering relaxing treatments and wellness packages."
  },
  {
    id: "10",
    name: "Salon Elegancja Targówek",
    category: "Hair & Beauty",
    district: "Targówek",
    rating: 4.4,
    reviewsCount: 78,
    address: "ul. Mehoffera 34, 03-131 Warszawa",
    priceRange: "$",
    phone: "+48 22 012 3456",
    services: ["Haircut", "Coloring", "Manicure", "Pedicure"],
    description: "Family-friendly salon offering quality services at affordable prices."
  }
];

export const districts = [
  "All Districts",
  "Bemowo",
  "Bielany",
  "Mokotów",
  "Ochota",
  "Praga-Południe",
  "Śródmieście",
  "Targówek",
  "Wola",
  "Wilanów",
  "Żoliborz"
];

export const categories = [
  "All Categories",
  "Hair",
  "Beauty",
  "Hair & Beauty",
  "Nails & Spa",
  "Spa"
];

export const sortOptions = [
  { value: "rating", label: "Highest Rating" },
  { value: "reviews", label: "Most Reviews" },
  { value: "name", label: "Name (A-Z)" }
];
