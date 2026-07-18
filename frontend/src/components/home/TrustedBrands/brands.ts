// dealer-admin/components/trusted-brands/brands.ts

export interface Brand {
  id: number;
  name: string;
  logo: string;
  founded: string;
  category?: "Luxury" | "EV" | "Supercar"; // ব্র্যান্ড ক্যাটাগরি যোগ করা যেতে পারে
}

export const brands: Brand[] = [
  { id: 1, name: "BMW", logo: "/logos/bmw.svg", founded: "Germany" },
  { id: 2, name: "Mercedes-Benz", logo: "/logos/mercedes.svg", founded: "Germany" },
  { id: 3, name: "Audi", logo: "/logos/audi.svg", founded: "Germany" },
  { id: 4, name: "Porsche", logo: "/logos/porsche.svg", founded: "Germany" },
  { id: 5, name: "Tesla", logo: "/logos/tesla.svg", founded: "USA" },
  { id: 6, name: "Ferrari", logo: "/logos/ferrari.svg", founded: "Italy" },
  { id: 7, name: "Lamborghini", logo: "/logos/lamborghini.svg", founded: "Italy" },
  { id: 8, name: "Aston Martin", logo: "/logos/aston.svg", founded: "UK" },
  { id: 9, name: "Lexus", logo: "/logos/lexus.svg", founded: "Japan" },
  { id: 10, name: "Maserati", logo: "/logos/maserati.svg", founded: "Italy" },
];
