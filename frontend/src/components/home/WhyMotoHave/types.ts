export interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string; // Lucide icon name identifier
  details: string[];
  metrics?: {
    label: string;
    value: string;
  };
}

export interface TrustItem {
  title: string;
  description: string;
  icon: string;
}