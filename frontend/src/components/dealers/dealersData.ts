// src/components/dealers/dealersData.ts

export interface Dealer {
  id: number;
  name: string;
  city: string;
  state: string;
  rating?: number;
  reviewCount?: number;
  inventoryCount: number;
  specialties?: string[];
  avatarInitials: string;
  gradient: string;
  verified: boolean;
  logo?: string | null;
  slug?: string;
}

export const dealers: Dealer[] = [
  {
    id: 1,
    name: "Anderson Auto Group",
    city: "Austin",
    state: "TX",
    rating: 4.9,
    reviewCount: 312,
    inventoryCount: 245,
    specialties: ["SUVs", "Luxury"],
    avatarInitials: "AA",
    gradient: "from-blue-500 to-cyan-500",
    verified: true,
  },
  {
    id: 2,
    name: "Prime Motors",
    city: "Dallas",
    state: "TX",
    rating: 4.8,
    reviewCount: 208,
    inventoryCount: 178,
    specialties: ["Sedans", "Hybrids"],
    avatarInitials: "PM",
    gradient: "from-violet-500 to-fuchsia-500",
    verified: true,
  },
  {
    id: 3,
    name: "Carter Automotive",
    city: "Houston",
    state: "TX",
    rating: 4.7,
    reviewCount: 156,
    inventoryCount: 132,
    specialties: ["Trucks", "SUVs"],
    avatarInitials: "CA",
    gradient: "from-green-500 to-emerald-500",
    verified: true,
  },
  {
    id: 4,
    name: "Elite Auto Sales",
    city: "San Antonio",
    state: "TX",
    rating: 5.0,
    reviewCount: 94,
    inventoryCount: 87,
    specialties: ["Luxury", "Sports Cars"],
    avatarInitials: "EA",
    gradient: "from-orange-500 to-red-500",
    verified: true,
  },
  {
    id: 5,
    name: "Metro Cars",
    city: "Phoenix",
    state: "AZ",
    rating: 4.6,
    reviewCount: 267,
    inventoryCount: 203,
    specialties: ["Sedans", "Electric"],
    avatarInitials: "MC",
    gradient: "from-sky-500 to-blue-600",
    verified: true,
  },
  {
    id: 6,
    name: "Luxury Drive",
    city: "Miami",
    state: "FL",
    rating: 4.9,
    reviewCount: 189,
    inventoryCount: 96,
    specialties: ["Luxury", "Convertibles"],
    avatarInitials: "LD",
    gradient: "from-pink-500 to-rose-500",
    verified: true,
  },
  {
    id: 7,
    name: "Westside Motors",
    city: "Denver",
    state: "CO",
    rating: 4.5,
    reviewCount: 143,
    inventoryCount: 165,
    specialties: ["SUVs", "Trucks"],
    avatarInitials: "WM",
    gradient: "from-indigo-500 to-purple-500",
    verified: true,
  },
  {
    id: 8,
    name: "Sunrise Auto",
    city: "Orlando",
    state: "FL",
    rating: 4.8,
    reviewCount: 221,
    inventoryCount: 188,
    specialties: ["Sedans", "Hybrids"],
    avatarInitials: "SA",
    gradient: "from-amber-500 to-orange-600",
    verified: true,
  },
  {
    id: 9,
    name: "Coastal Cars",
    city: "San Diego",
    state: "CA",
    rating: 4.7,
    reviewCount: 175,
    inventoryCount: 142,
    specialties: ["Electric", "Luxury"],
    avatarInitials: "CC",
    gradient: "from-teal-500 to-cyan-600",
    verified: true,
  },
];

export const locations = [
  "All Locations",
  "Austin, TX",
  "Dallas, TX",
  "Houston, TX",
  "San Antonio, TX",
  "Phoenix, AZ",
  "Miami, FL",
  "Denver, CO",
  "Orlando, FL",
  "San Diego, CA",
];

export const sortOptions = [
  "Highest Rated",
  "Most Vehicles",
  "Most Reviews",
];