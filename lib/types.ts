export const productTypes = [
  { id: "chocolate", label: "Chocolate" },
  { id: "jelly-gummy", label: "Jelly / Gummy" },
  { id: "caramel", label: "Caramel" },
  { id: "nougat", label: "Nougat" },
  { id: "bars", label: "Bars" },
] as const;

export type ProductType = (typeof productTypes)[number]["id"];

export type SpecRow = {
  label: string;
  value: string;
};

export type MachineImage = {
  src: string;
  alt: string;
  sourceUrl?: string;
};

export type Machine = {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  slug: string;
  productTypes: ProductType[];
  summary: string;
  description: string;
  features: string[];
  specs: SpecRow[];
  capacityKgH: number | null;
  capacityLabel: string;
  applications: string[];
  images: MachineImage[];
  brochures: { label: string; href: string }[];
  videos: { title: string; url: string }[];
  sourceUrl: string;
  featured: boolean;
  materials: string;
  voltage: string;
  todo: string | null;
};

export type MachineCatalog = {
  generatedAt: string;
  disclaimer: string;
  machines: Machine[];
};
