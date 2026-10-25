import catalogJson from "@/data/machines.json";
import { categories, getCategory } from "@/data/categories";
import type { Machine, MachineCatalog } from "@/lib/types";

const catalog = catalogJson as MachineCatalog;

export function getMachines(): Machine[] {
  return catalog.machines;
}

export function getMachine(category: string, slug: string) {
  return getMachines().find((machine) => machine.category === category && machine.slug === slug);
}

export function getMachineBySlug(slug: string) {
  return getMachines().find((machine) => machine.slug === slug);
}

export function getFeaturedMachines() {
  const featured = getMachines().filter((machine) => machine.featured);
  return featured.length ? featured : getMachines().slice(0, 6);
}

export function machinesInCategory(slug: string) {
  return getMachines().filter((machine) => machine.category === slug);
}

export function relatedMachines(machine: Machine, limit = 3) {
  const sameCategory = getMachines().filter(
    (item) => item.slug !== machine.slug && item.category === machine.category,
  );
  const sameType = getMachines().filter(
    (item) =>
      item.slug !== machine.slug &&
      item.category !== machine.category &&
      item.productTypes.some((type) => machine.productTypes.includes(type)),
  );
  return [...sameCategory, ...sameType].slice(0, limit);
}

export function categoriesWithMachines() {
  return categories
    .map((category) => ({
      ...category,
      count: machinesInCategory(category.slug).length,
    }))
    .filter((category) => category.count > 0);
}

export function categoryOrThrow(slug: string) {
  const category = getCategory(slug);
  if (!category) return undefined;
  return { ...category, count: machinesInCategory(slug).length };
}

export const catalogMeta = {
  generatedAt: catalog.generatedAt,
  disclaimer: catalog.disclaimer,
};
