import type { ProductType } from "../lib/types";

export type Seed = {
  path: string;
  category: string;
  productTypes: ProductType[];
  featured?: boolean;
};

/** Primary confectionery machines. Bakery, biscuit, cake, and bread URLs are never seeded. */
export const seeds: Seed[] = [
  { path: "/en/chocolate_machines-12/moulding_lines-54/automatic_one_shot_moulding_line-197.html", category: "chocolate-moulding", productTypes: ["chocolate"], featured: true },
  { path: "/en/chocolate_machines-12/moulding_lines-54/automatic_chocolate_shell_moulding_line-205.html", category: "chocolate-moulding", productTypes: ["chocolate"], featured: true },
  { path: "/en/chocolate_machines-12/moulding_lines-54/semi_automatic_one_shot_chocolate_moulding_line-771.html", category: "chocolate-moulding", productTypes: ["chocolate"] },
  { path: "/en/chocolate_machines-12/moulding_lines-54/chocolate_moulding_line_one_shot_mkcd_f_450-196.html", category: "chocolate-moulding", productTypes: ["chocolate"] },
  { path: "/en/chocolate_machines-12/moulding_lines-54/mkcd_450_chocolate_one_shot_moulding_line-195.html", category: "chocolate-moulding", productTypes: ["chocolate"] },
  { path: "/en/chocolate_machines-12/moulding_lines-54/chocolate_lentil_forming_roller-769.html", category: "chocolate-moulding", productTypes: ["chocolate"] },
  { path: "/en/chocolate_machines-12/moulding_lines-54/chocolate_drop_line-770.html", category: "depositors", productTypes: ["chocolate"], featured: true },
  { path: "/en/chocolate_machines-12/moulding_lines-54/rotary_drop_depositor-767.html", category: "depositors", productTypes: ["chocolate"] },
  { path: "/en/chocolate_machines-12/moulding_lines-54/drop_depositor-766.html", category: "depositors", productTypes: ["chocolate"] },
  { path: "/en/chocolate_machines-12/moulding_lines-54/aerated_depositor-772.html", category: "depositors", productTypes: ["chocolate"] },
  { path: "/en/chocolate_machines-12/moulding_lines-54/mobile_ribbon_depositor-773.html", category: "depositors", productTypes: ["chocolate", "nougat"] },
  { path: "/en/chocolate_machines-12/moulding_lines-54/soft_candy_automatic_moulding_line-775.html", category: "soft-candy-jelly", productTypes: ["jelly-gummy", "caramel"], featured: true },
  { path: "/en/chocolate_machines-12/moulding_lines-54/cup_filling_machine-666.html", category: "bowl-jar-filling", productTypes: ["chocolate"] },
  { path: "/en/chocolate_machines-12/bar_and_nougat_lines-178/enrobing_machine-201.html", category: "enrobing", productTypes: ["chocolate", "bars"], featured: true },
  { path: "/en/chocolate_machines-12/bar_and_nougat_lines-178/caramel_enrobing_machine-778.html", category: "enrobing", productTypes: ["caramel", "bars"] },
  { path: "/en/chocolate_machines-12/bar_and_nougat_lines-178/cooling_tunnel-202.html", category: "cooling-tunnels", productTypes: ["chocolate", "bars"] },
  { path: "/en/chocolate_machines-12/bar_and_nougat_lines-178/nougat_slab_former-782.html", category: "bar-nougat", productTypes: ["nougat", "bars"] },
  { path: "/en/chocolate_machines-12/bar_and_nougat_lines-178/caramel_slab_former-783.html", category: "bar-nougat", productTypes: ["caramel", "bars"] },
  { path: "/en/chocolate_machines-12/bar_and_nougat_lines-178/nuga_conti_mixer-779.html", category: "bar-nougat", productTypes: ["nougat", "bars"] },
  { path: "/en/chocolate_machines-12/bar_and_nougat_lines-178/caramel_conti_mixer-780.html", category: "bar-nougat", productTypes: ["caramel", "bars"] },
  { path: "/en/chocolate_machines-12/bar_and_nougat_lines-178/cereal_bar_conti_mixer-781.html", category: "bar-nougat", productTypes: ["bars", "nougat"] },
  { path: "/en/chocolate_machines-12/fat_based_processing-55/chocolate_tempering_machine-191.html", category: "tempering", productTypes: ["chocolate", "nougat"], featured: true },
  { path: "/en/chocolate_machines-12/fat_based_processing-55/chocolate_ball_mill-663.html", category: "ball-mills-conches", productTypes: ["chocolate"] },
  { path: "/en/chocolate_machines-12/fat_based_processing-55/continuous_chocolate_mill-189.html", category: "ball-mills-conches", productTypes: ["chocolate"], featured: true },
  { path: "/en/chocolate_machines-12/fat_based_processing-55/continuous_ball_mill_refiner_line-748.html", category: "ball-mills-conches", productTypes: ["chocolate"] },
  { path: "/en/chocolate_machines-12/fat_based_processing-55/conching_machine-664.html", category: "ball-mills-conches", productTypes: ["chocolate"] },
  { path: "/en/chocolate_machines-12/fat_based_processing-55/chocolate_pre_mixer-187.html", category: "mixers", productTypes: ["chocolate"] },
  { path: "/en/chocolate_machines-12/fat_based_processing-55/fat_melting_tank-185.html", category: "fat-melting", productTypes: ["chocolate"] },
  { path: "/en/chocolate_machines-12/fat_based_processing-55/continuous_mass_melting_system-746.html", category: "fat-melting", productTypes: ["chocolate"] },
  { path: "/en/chocolate_machines-12/fat_based_processing-55/z_mixer-752.html", category: "mixers", productTypes: ["chocolate", "nougat"] },
  { path: "/en/chocolate_machines-12/fat_based_processing-55/sugar_powder_mill-186.html", category: "sugaring", productTypes: ["chocolate", "jelly-gummy"] },
  { path: "/en/chocolate_machines-12/five_roller_refiner_line-730/horizontal_mixer-732.html", category: "mixers", productTypes: ["chocolate"] },
  { path: "/en/chocolate_machines-12/water_based_processing-679/batch_type_cooker-759.html", category: "candy-cooking", productTypes: ["jelly-gummy", "caramel"] },
  { path: "/en/chocolate_machines-12/water_based_processing-679/continuous_cooking_unit_with_vacuum-760.html", category: "candy-cooking", productTypes: ["jelly-gummy", "caramel"] },
  { path: "/en/chocolate_machines-12/water_based_processing-679/sugar_paraffin_coating_drum-758.html", category: "sugaring", productTypes: ["jelly-gummy"] },
  { path: "/en/chocolate_machines-12/wrapping-53/chocolate_wrapping_machine-198.html", category: "wrapping-feeding", productTypes: ["chocolate"] },
  { path: "/en/chocolate_machines-12/wrapping-53/jelly_and_chocolate_ball_wrapping_machine-199.html", category: "wrapping-feeding", productTypes: ["jelly-gummy", "chocolate"] },
  { path: "/en/chocolate_machines-12/wrapping-53/automatic_chocolate_feeding_conveyor-200.html", category: "wrapping-feeding", productTypes: ["chocolate"] },
  { path: "/en/cooker-aeration_system.html", category: "candy-cooking", productTypes: ["jelly-gummy", "caramel"] },
];

export const ENTRY_PAGES = [
  "https://www.memak.com/en/chocolate_machines-12/moulding_lines-54/automatic_one_shot_moulding_line-197.html",
];

/** Auxiliary belts, decorators, moulds, and all bakery/cake/biscuit paths stay out of this demo. */
export const SKIP_PATH =
  /cake|biscuit|bread|cracker|puffed_rice|cream_|dough|chocolate_moulds|decorator|turning_belt|donus_bandi|alignment|by_pass|wire_mesh|sprinkler|spraying_system|spreading|guillotine|calibration_drum|slitting|capper|extruder|coco_press|depositor_system|return_feeding|feeding_system-|granule_return|depositing_capper|delrin|oil-er|touching|interior_decorator|biscuit_decorator|complete_decorator|mobile_decorator|round_decorator|layer_cake/i;

export function inScopePath(pathname: string) {
  if (!pathname.startsWith("/en/")) return false;
  if (SKIP_PATH.test(pathname)) return false;
  if (/\/moulding_lines-54\/[^/]+-\d+\.html$/.test(pathname)) return true;
  if (/\/bar_and_nougat_lines-178\/[^/]+-\d+\.html$/.test(pathname)) {
    return /(enrob|cool|nougat|nuga|caramel|cereal|bar_line|slab|mixer)/i.test(pathname);
  }
  if (/\/fat_based_processing-55\/[^/]+-\d+\.html$/.test(pathname)) {
    return /(temper|ball_mill|conch|fat_melting|mass_melting|pre_mixer|z_mixer|sugar_powder|continuous_chocolate_mill|continuous_ball)/i.test(pathname);
  }
  if (/\/five_roller_refiner_line-730\/horizontal_mixer-\d+\.html$/.test(pathname)) return true;
  if (/\/water_based_processing-679\/[^/]+-\d+\.html$/.test(pathname)) {
    return /(cook|vacuum|sugar_paraffin|fondant)/i.test(pathname);
  }
  if (/\/wrapping-53\/[^/]+-\d+\.html$/.test(pathname)) return true;
  if (/\/soft_candy_production_lines-51\/soft_candy_production_line-\d+\.html$/.test(pathname)) return true;
  if (pathname === "/en/cooker-aeration_system.html") return true;
  return false;
}

export function inferCategory(pathname: string, fallback?: string) {
  if (fallback) return fallback;
  if (/enrob/.test(pathname)) return "enrobing";
  if (/cool/.test(pathname)) return "cooling-tunnels";
  if (/temper/.test(pathname)) return "tempering";
  if (/ball_mill|conch|continuous_chocolate_mill|continuous_ball/.test(pathname)) return "ball-mills-conches";
  if (/fat_melting|mass_melting/.test(pathname)) return "fat-melting";
  if (/sugar_paraffin|sugar_powder|fondant/.test(pathname)) return "sugaring";
  if (/cook|vacuum|aeration_system/.test(pathname)) return "candy-cooking";
  if (/wrap|feeding_conveyor|robotic_pack/.test(pathname)) return "wrapping-feeding";
  if (/cup_filling|jar/.test(pathname)) return "bowl-jar-filling";
  if (/mixer|pre_mixer|z_mixer/.test(pathname)) return "mixers";
  if (/soft_candy|jelly/.test(pathname)) return "soft-candy-jelly";
  if (/depositor|drop_/.test(pathname)) return "depositors";
  if (/nougat|nuga|caramel_slab|cereal|bar_line|slab/.test(pathname)) return "bar-nougat";
  return "chocolate-moulding";
}

export function inferProductTypes(pathname: string): import("../lib/types").ProductType[] {
  if (/jelly|soft_candy|gummy/.test(pathname)) return ["jelly-gummy"];
  if (/nougat|nuga/.test(pathname)) return ["nougat", "bars"];
  if (/caramel/.test(pathname)) return ["caramel", "bars"];
  if (/cereal|bar_line|enrob|cool/.test(pathname)) return ["bars", "chocolate"];
  return ["chocolate"];
}
