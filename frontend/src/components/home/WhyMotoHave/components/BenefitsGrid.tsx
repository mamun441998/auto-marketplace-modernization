import React from 'react';
import { FeatureItem } from '../types';
import { BenefitCard } from './BenefitCard';

interface BenefitsGridProps {
  features: FeatureItem[];
  activeFeatureId: string;
  onSelectFeature: (id: string) => void;
}

export const BenefitsGrid: React.FC<BenefitsGridProps> = ({ 
  features, 
  activeFeatureId, 
  onSelectFeature 
}) => {
  return (
    <div className="flex flex-col gap-4 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
      {features.map((feature) => (
        <BenefitCard
          key={feature.id}
          feature={feature}
          isActive={activeFeatureId === feature.id}
          onHover={() => onSelectFeature(feature.id)}
        />
      ))}
    </div>
  );
};