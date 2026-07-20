"use client";

import {
  CarFront,
  Eye,
  Pencil,
  Search,
} from "lucide-react";

const vehicles = [
  {
    name: "BMW X5 M Sport",
    stock: "#A102",
    year: "2025",
    price: "$78,900",
    status: "Available",
  },
  {
    name: "Mercedes C300",
    stock: "#A221",
    year: "2024",
    price: "$54,500",
    status: "Reserved",
  },
  {
    name: "Toyota Land Cruiser",
    stock: "#A541",
    year: "2025",
    price: "$92,300",
    status: "Available",
  },
  {
    name: "Tesla Model Y",
    stock: "#A902",
    year: "2026",
    price: "$63,000",
    status: "Sold",
  },
];

export default function Inventory() {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Inventory
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Manage dealership vehicles
          </p>
        </div>

        <button className="rounded-xl bg-[#FC5E01] px-5 py-2 text-sm font-semibold text-white">
          + Add Vehicle
        </button>
      </div>

      {/* Search */}

      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#17181D] px-4 py-3">
        <Search
          size={18}
          className="text-slate-500"
        />

        <input
          placeholder="Search vehicles..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#16171D]">
        <table className="w-full">
          <thead className="border-b border-white/10">
            <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-6 py-4">Vehicle</th>
              <th>Year</th>
              <th>Price</th>
              <th>Status</th>
              <th className="text-right pr-6">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map((car) => (
              <tr
                key={car.stock}
                className="border-b border-white/5 last:border-none hover:bg-white/[0.02]"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FC5E01]/10">
                      <CarFront
                        size={18}
                        className="text-[#FC5E01]"
                      />
                    </div>

                    <div>
                      <div className="font-semibold text-white">
                        {car.name}
                      </div>

                      <div className="text-xs text-slate-500">
                        {car.stock}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="text-slate-300">
                  {car.year}
                </td>

                <td className="font-semibold text-white">
                  {car.price}
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      car.status === "Available"
                        ? "bg-green-500/15 text-green-400"
                        : car.status === "Reserved"
                        ? "bg-yellow-500/15 text-yellow-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {car.status}
                  </span>
                </td>

                <td className="pr-6">
                  <div className="flex justify-end gap-3">
                    <Eye
                      size={17}
                      className="cursor-pointer text-slate-400 hover:text-white"
                    />

                    <Pencil
                      size={17}
                      className="cursor-pointer text-slate-400 hover:text-white"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}