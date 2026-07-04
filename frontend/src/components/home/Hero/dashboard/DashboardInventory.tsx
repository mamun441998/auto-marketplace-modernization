"use client";

const vehicles = [
  {
    model: "BMW X5",
    stock: "#A1023",
    price: "$54,900",
    status: "Available",
  },
  {
    model: "Tesla Model Y",
    stock: "#A1048",
    price: "$48,500",
    status: "Reserved",
  },
  {
    model: "Mercedes GLC",
    stock: "#A1051",
    price: "$61,200",
    status: "Sold",
  },
  {
    model: "Audi Q7",
    stock: "#A1074",
    price: "$69,400",
    status: "Available",
  },
];

function StatusBadge({
  status,
}: {
  status: string;
}) {
  let style = "";

  switch (status) {
    case "Available":
      style =
        "bg-emerald-100 text-emerald-700";
      break;

    case "Reserved":
      style =
        "bg-amber-100 text-amber-700";
      break;

    default:
      style =
        "bg-slate-200 text-slate-700";
  }

  return (
    <span
      className={`
        rounded-full

        px-2.5
        py-1

        text-[10px]
        font-bold

        ${style}
      `}
    >
      {status}
    </span>
  );
}

export default function DashboardInventory() {
  return (
    <div
      className="
        rounded-2xl

        border
        border-slate-200

        bg-white

        shadow-sm
      "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between

          border-b
          border-slate-200

          px-5
          py-4
        "
      >
        <div>
          <h3 className="font-bold text-slate-900">
            Inventory
          </h3>

          <p className="text-xs text-slate-500">
            Recent Vehicles
          </p>
        </div>

        <button
          className="
            rounded-lg

            bg-blue-50

            px-3
            py-2

            text-xs
            font-semibold

            text-blue-600
          "
        >
          View All
        </button>
      </div>

      {/* Table */}

      <div className="divide-y divide-slate-100">
        {vehicles.map((item) => (
          <div
            key={item.stock}
            className="
              flex
              items-center
              justify-between

              px-5
              py-4

              hover:bg-slate-50
            "
          >
            {/* Left */}

            <div>
              <h4
                className="
                  text-sm
                  font-semibold
                  text-slate-900
                "
              >
                {item.model}
              </h4>

              <p
                className="
                  mt-1

                  text-xs

                  text-slate-500
                "
              >
                {item.stock}
              </p>
            </div>

            {/* Right */}

            <div className="text-right">
              <p
                className="
                  text-sm
                  font-bold
                  text-slate-900
                "
              >
                {item.price}
              </p>

              <div className="mt-2">
                <StatusBadge
                  status={item.status}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}