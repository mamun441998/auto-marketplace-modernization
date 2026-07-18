// src/components/inventory/inventoryData.ts

export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  dealerName: string;
  dealerId: number;
  condition: string;
  gradient: string;
}

export const vehicles: Vehicle[] = [
  { id: 1, make: "BMW", model: "X5 M-Sport", year: 2023, price: 58900, mileage: 12500, fuelType: "Petrol", transmission: "Automatic", bodyType: "SUV", dealerName: "Anderson Auto Group", dealerId: 1, condition: "Used", gradient: "from-blue-500 to-cyan-500" },
  { id: 2, make: "Tesla", model: "Model Y LR", year: 2023, price: 47500, mileage: 8200, fuelType: "Electric", transmission: "Automatic", bodyType: "SUV", dealerName: "Metro Cars", dealerId: 5, condition: "Used", gradient: "from-red-500 to-rose-500" },
  { id: 3, make: "Mercedes-Benz", model: "GLC 300", year: 2024, price: 61200, mileage: 3400, fuelType: "Petrol", transmission: "Automatic", bodyType: "SUV", dealerName: "Elite Auto Sales", dealerId: 4, condition: "Used", gradient: "from-slate-400 to-slate-600" },
  { id: 4, make: "Toyota", model: "Camry SE", year: 2023, price: 28500, mileage: 15600, fuelType: "Hybrid", transmission: "Automatic", bodyType: "Sedan", dealerName: "Prime Motors", dealerId: 2, condition: "Used", gradient: "from-blue-600 to-indigo-600" },
  { id: 5, make: "Honda", model: "Civic Sport", year: 2022, price: 22000, mileage: 24300, fuelType: "Petrol", transmission: "Manual", bodyType: "Sedan", dealerName: "Carter Automotive", dealerId: 3, condition: "Used", gradient: "from-emerald-500 to-teal-600" },
  { id: 6, make: "Ford", model: "F-150 Lariat", year: 2023, price: 52400, mileage: 9800, fuelType: "Petrol", transmission: "Automatic", bodyType: "Truck", dealerName: "Westside Motors", dealerId: 7, condition: "Used", gradient: "from-indigo-500 to-blue-700" },
  { id: 7, make: "Audi", model: "Q7 Premium", year: 2024, price: 64800, mileage: 1200, fuelType: "Petrol", transmission: "Automatic", bodyType: "SUV", dealerName: "Luxury Drive", dealerId: 6, condition: "New", gradient: "from-red-600 to-red-800" },
  { id: 8, make: "Chevrolet", model: "Malibu LT", year: 2022, price: 19800, mileage: 31200, fuelType: "Petrol", transmission: "Automatic", bodyType: "Sedan", dealerName: "Sunrise Auto", dealerId: 8, condition: "Used", gradient: "from-amber-500 to-orange-600" },
  { id: 9, make: "Tesla", model: "Model 3", year: 2024, price: 41200, mileage: 2100, fuelType: "Electric", transmission: "Automatic", bodyType: "Sedan", dealerName: "Coastal Cars", dealerId: 9, condition: "New", gradient: "from-red-500 to-rose-500" },
  { id: 10, make: "BMW", model: "3 Series", year: 2023, price: 43900, mileage: 11400, fuelType: "Petrol", transmission: "Automatic", bodyType: "Sedan", dealerName: "Anderson Auto Group", dealerId: 1, condition: "Used", gradient: "from-blue-500 to-cyan-500" },
  { id: 11, make: "Jeep", model: "Grand Cherokee", year: 2023, price: 39600, mileage: 18700, fuelType: "Petrol", transmission: "Automatic", bodyType: "SUV", dealerName: "Metro Cars", dealerId: 5, condition: "Used", gradient: "from-emerald-600 to-green-700" },
  { id: 12, make: "Hyundai", model: "Elantra SEL", year: 2022, price: 18500, mileage: 28900, fuelType: "Petrol", transmission: "Automatic", bodyType: "Sedan", dealerName: "Prime Motors", dealerId: 2, condition: "Used", gradient: "from-blue-600 to-indigo-600" },
  { id: 13, make: "Porsche", model: "Cayenne S", year: 2024, price: 89500, mileage: 800, fuelType: "Petrol", transmission: "Automatic", bodyType: "SUV", dealerName: "Luxury Drive", dealerId: 6, condition: "New", gradient: "from-red-600 to-red-800" },
  { id: 14, make: "Kia", model: "Telluride SX", year: 2023, price: 45300, mileage: 13600, fuelType: "Petrol", transmission: "Automatic", bodyType: "SUV", dealerName: "Westside Motors", dealerId: 7, condition: "Used", gradient: "from-indigo-500 to-blue-700" },
  { id: 15, make: "Nissan", model: "Altima SR", year: 2022, price: 20900, mileage: 26400, fuelType: "Petrol", transmission: "Automatic", bodyType: "Sedan", dealerName: "Sunrise Auto", dealerId: 8, condition: "Used", gradient: "from-amber-500 to-orange-600" },
];

export const makes = ["All Makes", "BMW", "Tesla", "Mercedes-Benz", "Toyota", "Honda", "Ford", "Audi", "Chevrolet", "Jeep", "Hyundai", "Porsche", "Kia", "Nissan"];

export const bodyTypes = ["All Types", "Sedan", "SUV", "Truck", "Coupe"];

export const priceRanges = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under $25,000", min: 0, max: 25000 },
  { label: "$25,000 - $45,000", min: 25000, max: 45000 },
  { label: "$45,000 - $65,000", min: 45000, max: 65000 },
  { label: "Above $65,000", min: 65000, max: Infinity },
];

export const sortOptions = ["Newest First", "Price: Low to High", "Price: High to Low", "Lowest Mileage"];