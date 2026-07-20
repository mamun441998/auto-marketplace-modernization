export type ModuleId =
  | "dashboard"
  | "inventory"
  | "crm"
  | "website"
  | "analytics";

export interface ModuleItem {
  id: ModuleId;

  title: string;

  subtitle: string;

  description: string;

  orbitAngle: number;

  accent: string;
}

export type ProductModule = ModuleItem;
export type ModuleType = ModuleId;

export type FeatureItem = ModuleItem;
