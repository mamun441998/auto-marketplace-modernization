"use client";

import { inventoryData } from "./inventoryData";
import VehicleRow from "./VehicleRow";

export default function InventoryTable() {
  return (
    <div
      className="
        flex
        h-full
        min-h-0
        flex-col

        overflow-hidden

        rounded-xl
        border
        border-slate-200
        bg-white

        shadow-sm
      "
    >
      {/* Header (matches module list panels) */}

      <div className="shrink-0 border-b border-slate-200 px-4 py-2.5">
        <h3 className="text-sm font-bold text-slate-900">
          Inventory List
        </h3>

        <p className="mt-0.5 text-[11px] text-slate-500">
          326 vehicles available in inventory
        </p>
      </div>

      {/* Scrollable table body */}

      <div
        className="
          min-h-0
          flex-1

          overflow-y-auto

          scrollbar-thin
          scrollbar-thumb-slate-200
        "
      >
        <table className="w-full table-fixed">
          <thead className="sticky top-0 z-10 bg-slate-50">
            <tr>
              <th className="w-[46%] px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 sm:w-[42%]">
                Vehicle
              </th>

              <th className="hidden w-[10%] px-2 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 sm:table-cell">
                Year
              </th>

              <th className="w-[28%] px-2 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 sm:w-[16%]">
                Price
              </th>

              <th className="hidden w-[14%] px-2 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 md:table-cell">
                Mileage
              </th>

              <th className="w-[26%] px-2 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 sm:w-[12%]">
                Status
              </th>

              <th className="hidden w-[6%] px-2 py-2.5 sm:table-cell"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {inventoryData.map((car) => (
              <VehicleRow
                key={car.id}
                car={car}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
