"use client";

import clsx from "clsx";

type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function Dropdown({
  options,
  value,
  onChange,
  className,
}: DropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={clsx(
        "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5",
        "text-slate-900",
        "focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
        className
      )}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}
