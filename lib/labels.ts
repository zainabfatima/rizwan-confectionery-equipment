import type { Machine, ProductType } from "@/lib/types";

const labels: Record<ProductType, string> = {
  chocolate: "Chocolate",
  "jelly-gummy": "Jelly / Gummy",
  caramel: "Caramel",
  nougat: "Nougat",
  bars: "Bars",
};

export function productTypeLabel(id: ProductType) {
  return labels[id];
}

export type CapacityBand = "lt500" | "mid" | "gt1000" | "other";

export function capacityBand(machine: Pick<Machine, "capacityKgH">): CapacityBand {
  if (machine.capacityKgH == null) return "other";
  if (machine.capacityKgH < 500) return "lt500";
  if (machine.capacityKgH <= 1000) return "mid";
  return "gt1000";
}
