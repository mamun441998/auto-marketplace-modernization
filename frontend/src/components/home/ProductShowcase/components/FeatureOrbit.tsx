"use client";

import FeatureItem from "./FeatureItem";
import { ModuleItem } from "../types";

interface Props {
  features: ModuleItem[];
  activeFeature: string;
  radius: number;
  onSelect: (id: ModuleItem["id"]) => void;
}

export default function FeatureOrbit({
  features,
  activeFeature,
  radius,
  onSelect,
}: Props) {
  return (
    <div className="absolute inset-0">
      {features.map((module) => {
        const rad = (module.orbitAngle * Math.PI) / 180;

        // Increase orbit distance so items sit outside the center logo
        let orbitDistance = radius * 0.9;
        if (typeof window !== "undefined") {
          const w = window.innerWidth;
          if (w < 480) orbitDistance = Math.max(radius * 1.25, 130);
          else if (w < 640) orbitDistance = Math.max(radius * 1.05, radius + 20);
          else if (w < 1024) orbitDistance = Math.max(radius * 0.95, radius);
        }

        const x = Math.cos(rad) * orbitDistance;
        const y = Math.sin(rad) * orbitDistance;

        return (
          <div
            key={module.id}
            className="
              absolute
              left-1/2
              top-1/2
            "
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            <FeatureItem
              module={module}
              active={activeFeature === module.id}
              onClick={() => onSelect(module.id)}
            />
          </div>
        );
      })}
    </div>
  );
}