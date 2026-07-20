import Aston from "@/assets/Trusted-Brands-logo/Aston.png";
import Audi from "@/assets/Trusted-Brands-logo/Audi.png";
import BMW from "@/assets/Trusted-Brands-logo/BMW.png";
import Ferreri from "@/assets/Trusted-Brands-logo/Ferreri.png";
import Lamborgini from "@/assets/Trusted-Brands-logo/Lamborgini.png";
import Lexxus from "@/assets/Trusted-Brands-logo/Lexxus.png";
import Marcedes from "@/assets/Trusted-Brands-logo/Marcedes.png";
import Maserati from "@/assets/Trusted-Brands-logo/Maserati.png";
import Prosche from "@/assets/Trusted-Brands-logo/Prosche.png";
import Tesla from "@/assets/Trusted-Brands-logo/Tesla.png";
import Toyota from "@/assets/Trusted-Brands-logo/Toyota.png";

import { StaticImageData } from "next/image";

export interface Brand {
  id: number;
  name: string;
  logo: StaticImageData;
  founded: string;
}

export const brands: Brand[] = [
  {
    id: 1,
    name: "BMW",
    logo: BMW,
    founded: "Germany",
  },
  {
    id: 2,
    name: "Mercedes-Benz",
    logo: Marcedes,
    founded: "Germany",
  },
  {
    id: 3,
    name: "Audi",
    logo: Audi,
    founded: "Germany",
  },
  {
    id: 4,
    name: "Porsche",
    logo: Prosche,
    founded: "Germany",
  },
  {
    id: 5,
    name: "Tesla",
    logo: Tesla,
    founded: "USA",
  },
  {
    id: 6,
    name: "Ferrari",
    logo: Ferreri,
    founded: "Italy",
  },
  {
    id: 7,
    name: "Lamborghini",
    logo: Lamborgini,
    founded: "Italy",
  },
  {
    id: 8,
    name: "Aston Martin",
    logo: Aston,
    founded: "United Kingdom",
  },
  {
    id: 9,
    name: "Lexus",
    logo: Lexxus,
    founded: "Japan",
  },
  {
    id: 10,
    name: "Maserati",
    logo: Maserati,
    founded: "Italy",
  },
  {
    id: 11,
    name: "Toyota",
    logo: Toyota,
    founded: "Japan",
  },
];