"use client";

export default function Toggle({
  on,
  onClick,
  size = "md",
}: {
  on: boolean;
  onClick: () => void;
  size?: "sm" | "md";
}) {
  const track = size === "sm" ? "h-5 w-9" : "h-6 w-11";
  const knob = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const pos = size === "sm" ? (on ? "left-[18px]" : "left-0.5") : (on ? "left-[22px]" : "left-0.5");

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative ${track} flex-shrink-0 rounded-full transition-colors duration-200 ${on ? "bg-[#FC5E01]" : "bg-[#1e2a4a]"}`}
    >
      <span className={`absolute top-1/2 -translate-y-1/2 ${knob} ${pos} rounded-full bg-white shadow transition-all duration-200`} />
    </button>
  );
}