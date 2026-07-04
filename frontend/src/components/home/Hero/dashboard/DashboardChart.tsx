"use client";

export default function DashboardChart() {
  const points = [28, 35, 42, 40, 55, 58, 70];

  const path = points
    .map((point, index) => {
      const x = index * 90;
      const y = 110 - point;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div
      className="
        h-full

        rounded-2xl
        border
        border-slate-200

        bg-white

        p-5

        shadow-sm
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Revenue Overview
          </h3>

          <p className="text-sm text-slate-500">
            Last 30 days performance
          </p>
        </div>

        <div
          className="
            rounded-full
            bg-emerald-100

            px-4
            py-2

            text-sm
            font-semibold

            text-emerald-600
          "
        >
          +24%
        </div>
      </div>

      {/* Chart */}

      <div className="mt-5 h-[150px] w-full">
        <svg
          viewBox="0 0 540 130"
          className="h-full w-full"
        >
          {/* Grid */}

          {[20, 45, 70, 95].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="540"
              y2={y}
              stroke="#E5E7EB"
              strokeDasharray="4 4"
            />
          ))}

          {/* Area */}

          <path
            d={`${path} L 540 130 L 0 130 Z`}
            fill="#DBEAFE"
          />

          {/* Line */}

          <path
            d={path}
            fill="none"
            stroke="#0EA5E9"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dots */}

          {points.map((point, index) => (
            <circle
              key={index}
              cx={index * 90}
              cy={110 - point}
              r="5"
              fill="#2563EB"
            />
          ))}
        </svg>
      </div>

      {/* Footer */}

      <div className="mt-3 flex justify-between text-xs text-slate-400">
        <span>Week 1</span>
        <span>Week 2</span>
        <span>Week 3</span>
        <span>Week 4</span>
      </div>
    </div>
  );
}