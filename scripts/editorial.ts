import type { SpecRow } from "../lib/types";

export type Editorial = {
  summary: string;
  description: string;
  features: string[];
  applications: string[];
  extraSpecs?: SpecRow[];
  capacityKgH?: number | null;
  capacityLabel?: string;
  featured?: boolean;
};

const E: Record<string, Editorial> = {};

function add(slug: string, entry: Editorial) {
  E[slug] = entry;
}

add("automatic-one-shot-moulding-line", {
  featured: true,
  capacityKgH: 1500,
  capacityLabel: "450–1,500 kg/h",
  summary:
    "Full automatic one-shot line for solid, filled, and two-color chocolates, with multi-level cooling and demoulding up to 1,500 kg/h.",
  description:
    "US plants use this one-shot frame when a single depositor pass has to create the shell and the center together. It is the line to quote for solid tablets, two-color pieces, and bars that carry rice crisps, sesame, or 2–4 mm nut fragments, then cool on a multi-store tower before automatic demoulding hands them toward wrapping.\n\nThe published family runs from MKCD-O-450 through MKCD-O-1500. Shot rate stays in the 12–15 shots/min band while hourly output scales with mould width. Length is planned between 14.5 m and 18 m, so we confirm ceiling height and the path into packaging before the order is frozen.",
  features: [
    "One depositor pass for shell and center",
    "Solid, filled, two-color, and inclusion pieces",
    "Multi-store cooling and automatic demoulding",
    "Five frame widths from 450 to 1,500 kg/h",
    "Discharge arranged toward a wrapping infeed",
  ],
  applications: ["Solid tablets", "Center-filled chocolates", "Two-color pieces", "Nut and crispy inclusions"],
  extraSpecs: [
    { label: "Shot rate", value: "12–15 shots/min" },
    { label: "Dimensions MKCD-O-450 (L × W × H)", value: "14,500–18,000 × 3,600 × 3,300–5,000 mm" },
    { label: "Dimensions wider frames (L × W × H)", value: "14,500–18,000 × 4,300 × 3,300–5,000 mm" },
  ],
});

add("automatic-chocolate-shell-moulding-line", {
  featured: true,
  capacityKgH: 1500,
  capacityLabel: "450–1,500 kg/h",
  summary:
    "Classic shell line that forms, fills, and backs chocolates — including whole-nut and liquid centers — at up to 1,500 kg/h.",
  description:
    "Choose shell moulding when the center is too fluid, too chunky, or too delicate for a one-shot deposit. The mould is filled, inverted, and cooled to leave a shell; filling goes in next; a chocolate back closes the piece before the final cool and demould.\n\nThe MKSL-A family spans 450 to 1,500 kg/h at 12–15 shots/min, with published power anywhere from 100 kW to 350 kW depending on the cooling and auxiliary package. Optional stations cover a second filling, biscuit or wafer feed, whole hazelnuts, granules, and toy inserts. Line length is quoted from 24 m upward, so floor space is part of the first conversation.",
  features: [
    "Traditional shell, fill, and back sequence",
    "Liquid, caramel, jelly, and cream centers",
    "Whole-nut and granule stations as options",
    "Horizontal and multi-store cooling",
    "Hammer or robotic demoulding",
  ],
  applications: ["Pralines", "Assorted boxes", "Whole-hazelnut pieces", "Biscuit or wafer sandwiches"],
  extraSpecs: [
    { label: "Shot rate", value: "12–15 shots/min" },
    { label: "Dimensions MKSL-A-450 (L × W × H)", value: "24,000–50,000 × 3,600 × 3,300–5,000 mm" },
    { label: "Published power band", value: "100–350 kW, depending on configuration" },
  ],
});

add("semi-automatic-one-shot-chocolate-moulding-line", {
  capacityKgH: 450,
  capacityLabel: "Up to 450 kg/h",
  summary:
    "Shorter one-shot line for solid, filled, and two-color chocolates at up to 450 kg/h and 12–18 shots per minute.",
  description:
    "This is the compact one-shot route for a plant that wants center-filled and two-color tablets without committing to a full automatic tower. Published output is up to 450 kg/h. It suits a first industrial moulding cell, a seasonal assortment, or a pilot line that may later feed a larger MKCD-O frame.\n\nWe still treat utilities, mould format, and the handoff into cooling as a layout exercise. Ask for the MKCD-450 figure when you need the shorter 4.75 m frame, and compare it with the MKCD-F-450 if you need more shots per minute.",
  features: [
    "Solid, center-filled, and two-color output",
    "Up to 450 kg/h",
    "Shorter footprint than the full automatic line",
    "Suitable as a first industrial cell",
  ],
  applications: ["Tablets", "Filled bars", "Two-color seasonal pieces"],
  extraSpecs: [
    { label: "MKCD-450 capacity", value: "12–18 shots/min, up to 450 kg/h" },
    { label: "MKCD-450 power", value: "42 kW" },
    { label: "MKCD-450 dimensions (L × W × H)", value: "4,750 × 1,050 × 1,900 mm" },
  ],
});

add("chocolate-moulding-line-one-shot-mkcd-f-450", {
  capacityKgH: 450,
  capacityLabel: "Up to 450 kg/h",
  summary:
    "MKCD-F-450 one-shot frame at up to 450 kg/h and 12–24 shots/min, on a 7.6 m line.",
  description:
    "The MKCD-F-450 sits between a short semi-automatic cell and the full MKCD-O tower. Published figures are 12–24 shots/min, up to 450 kg/h, and 55 kW, on a line about 7.6 m long and 1.05 m wide.\n\nIt is the quote we open when a buyer needs more shot rate than the 4.75 m MKCD-450 but does not yet have the floor or the cooling height for an 18 m automatic line. Mould format and center viscosity still decide the depositor, so send a target piece weight with the inquiry.",
  features: [
    "12–24 shots/min",
    "Up to 450 kg/h",
    "55 kW published total",
    "7.6 m frame length",
  ],
  applications: ["Filled tablets", "Two-color bars", "Mid-volume moulding cells"],
  extraSpecs: [
    { label: "Dimensions (L × W × H)", value: "7,600 × 1,050 × 1,900 mm" },
    { label: "Total power", value: "55 kW" },
  ],
});

add("mkcd-450-chocolate-one-shot-moulding-line", {
  capacityKgH: 450,
  capacityLabel: "Up to 450 kg/h",
  summary:
    "MKCD-450 one-shot moulding line rated to 450 kg/h at 12–18 shots/min on a 4.75 m frame.",
  description:
    "The MKCD-450 is the short one-shot frame in the family: 12–18 shots/min, up to 450 kg/h, 42 kW, and a footprint of 4,750 × 1,050 × 1,900 mm. It is aimed at solid chocolate, center-filled pieces, and two-color tablets in a cell that can sit in an existing room.\n\nIf your forecast is already near the top of that rating, we will also price the F-450 and the automatic O-series so you can see the step-up in shot rate and cooling rather than outgrowing the frame in the first year.",
  features: [
    "4.75 m published length",
    "42 kW published total",
    "Solid, filled, and two-color pieces",
    "Clear upgrade path to longer one-shot frames",
  ],
  applications: ["Startup chocolate plants", "Contract manufacturers", "Seasonal tablets"],
  extraSpecs: [
    { label: "Capacity", value: "12–18 shots/min, up to 450 kg/h" },
    { label: "Total power", value: "42 kW" },
    { label: "Dimensions (L × W × H)", value: "4,750 × 1,050 × 1,900 mm" },
  ],
});

add("chocolate-lentil-forming-roller", {
  capacityKgH: null,
  capacityLabel: "Sized with the drop line",
  summary:
    "Rotary drum that forms lentil, egg, and ball chocolates ahead of polishing or wrapping.",
  description:
    "Lentil and egg shapes need a dedicated forming drum rather than a flat mould. This roller is built for lentil chocolate, egg chocolate, and ball chocolate, and it is quoted with the drop line and cooling that set piece weight.\n\nSend the target gram weight — catalog notes for the wider drop program cite pieces from 0.06 g to 2.5 g — and we will confirm whether the drum, the rotary depositor, or both belong in the cell.",
  features: [
    "Lentil, egg, and ball forming",
    "Quoted with drop depositing and cooling",
    "Piece weight confirmed against your specification",
  ],
  applications: ["Chocolate lentils", "Egg shapes", "Ball chocolates"],
});

add("chocolate-drop-line", {
  featured: true,
  capacityKgH: null,
  capacityLabel: "0.06–2.5 g pieces",
  summary:
    "Chip and drop line with single, double, or rotary depositing and a cooling tunnel for 0.06–2.5 g pieces.",
  description:
    "Chocolate chips and wafers for bakeries and inclusion blends are a depositor-plus-tunnel problem, not a moulding-line problem. This drop line is offered with a single head, a double head, or a continuous rotary depositor, and a cooling tunnel is part of the arrangement.\n\nPublished piece weights run from 0.06 g to 2.5 g. Diameter changes with the nozzle and drum set, so the quote starts from your chip specification and the hourly kilograms you need to pack.",
  features: [
    "Single, double, or rotary depositing",
    "Cooling tunnel in the line scope",
    "Piece weights from 0.06 g to 2.5 g",
    "Built for chips, drops, and wafers",
  ],
  applications: ["Baking chips", "Inclusion drops", "Compound wafers"],
});

add("rotary-drop-depositor", {
  capacityKgH: null,
  capacityLabel: "Continuous rotary",
  summary:
    "Continuous rotary head for chocolate drops, normally paired with a cooling tunnel.",
  description:
    "The rotary drop depositor is the continuous version of the chip line: chocolate is metered onto the belt in a rotating pattern instead of a start-stop shot. It is specified when you want steady chip output and are ready to cool the web immediately.\n\nBelt width, drop diameter, and the tunnel that follows are confirmed together. If you are comparing it with the servo drop head, we will lay both ratings next to your target gram weight.",
  features: [
    "Continuous rotary depositing",
    "Paired with tunnel cooling",
    "Drop diameter set by the tooling",
  ],
  applications: ["Chocolate chips", "Compound drops", "High-duty chip lines"],
});

add("drop-depositor", {
  capacityKgH: null,
  capacityLabel: "Servo drop head",
  summary:
    "Servo drop depositor for chocolate chips and drops, available as a single or double head.",
  description:
    "This servo drop head is the metered alternative to a rotary drum when shot weight has to be adjusted often. Single and double arrangements are both in the family, and the usual neighbor is a cooling tunnel sized to the belt.\n\nShare the recipe viscosity and the chip drawing. We will quote the head, the nozzles, and the tunnel as one cell so the pieces leave firm enough to pack.",
  features: [
    "Servo-controlled drop weight",
    "Single or double head layouts",
    "Quoted with cooling",
  ],
  applications: ["Chocolate chips", "Seasonal drops", "Compound chips"],
});

add("aerated-depositor", {
  capacityKgH: 1200,
  capacityLabel: "Up to 1,200 kg/h",
  summary:
    "Mobile C-frame depositor for aerated chocolate and confectionery, up to 1,200 kg/h on the MKAD-1200.",
  description:
    "Aerated centers collapse if the depositor shears the foam. This C-frame head is built to place aerated masses, and the published MKAD-1200 rating is 12–14 shots/min, up to 1,200 kg/h, at 8 kW. The mobile frame lets the head serve more than one belt position.\n\nIt belongs on lines making aerated bars, light centers, or whipped inclusions. Send the specific gravity you need to hold after depositing; that number drives nozzle and belt speed more than the nameplate does.",
  features: [
    "C-frame mobile head",
    "MKAD-1200 up to 1,200 kg/h",
    "8 kW published total",
    "Aimed at aerated masses",
  ],
  applications: ["Aerated bars", "Light chocolate centers", "Whipped inclusions"],
  extraSpecs: [
    { label: "MKAD-1200 capacity", value: "12–14 shots/min, up to 1,200 kg/h" },
    { label: "MKAD-1200 power", value: "8 kW" },
    { label: "MKAD-1200 dimensions (L × W × H)", value: "1,600 × 2,050 × 1,950 mm" },
  ],
});

add("mobile-ribbon-depositor", {
  capacityKgH: 1200,
  capacityLabel: "Up to 1,200 kg/h",
  summary:
    "Mobile ribbon head for chocolate mixed with nuts, fruit, and crisps, up to 1,200 kg/h.",
  description:
    "Inclusions jam a standard nozzle. This ribbon depositor is built for chocolate that already carries almonds, crisps, hazelnuts, dried fruit, or raisins, and it uses the same style of mobile C-frame as the aerated head. The MKRD-900 publication is 14 shots/min, up to 1,200 kg/h, and 20 kW.\n\nQuote it when a bar or mould line has to drop a chunky mass without crushing the pieces. Particle size in the recipe should travel with the inquiry.",
  features: [
    "Handles nut, fruit, and crisp mixes",
    "Mobile C-frame",
    "Up to 1,200 kg/h on MKRD-900",
    "20 kW published total",
  ],
  applications: ["Nut clusters", "Fruit and crisp bars", "Chunky moulded pieces"],
  extraSpecs: [
    { label: "MKRD-900 capacity", value: "14 shots/min, up to 1,200 kg/h" },
    { label: "MKRD-900 power", value: "20 kW" },
    { label: "MKRD-900 dimensions (L × W × H)", value: "1,740 × 2,100 × 1,970 mm" },
  ],
});

add("soft-candy-automatic-moulding-line", {
  featured: true,
  capacityKgH: 540,
  capacityLabel: "430–540 kg/h",
  summary:
    "Automatic moulding for pectin jelly, caramel, and fondant, rated 430 kg/h at 10 g and 540 kg/h at 15 g.",
  description:
    "This is the line to open when a US buyer asks for a gummy depositor and a mould circuit in one scope. MSCL-500 is published for pectin jelly. MSCL-600 extends the same shot idea to caramel, pectin jelly, and fondant. Both cite 20–60 shots/min, 430 kg/h at a 10 g piece, and 540 kg/h at 15 g.\n\nPower is 50 kW on the MSCL-500 and 105 kW on the MSCL-600. Length grows from 19.5 m to 25.5 m. We pair the line with a batch or vacuum cooker so the kitchen can actually feed the shot rate you buy.",
  features: [
    "Pectin jelly on MSCL-500",
    "Caramel, jelly, and fondant on MSCL-600",
    "20–60 shots/min",
    "Piece-weight ratings at 10 g and 15 g",
    "Cooker matched during quotation",
  ],
  applications: ["Pectin gummies", "Jelly candy", "Soft caramel", "Fondant pieces"],
  extraSpecs: [
    { label: "MSCL-500 power and size", value: "50 kW; 19,500 × 4,270 × 2,450 mm" },
    { label: "MSCL-600 power and size", value: "105 kW; 25,500 × 7,160 × 2,480 mm" },
    { label: "Capacity", value: "10 g: 430 kg/h; 15 g: 540 kg/h; 20–60 shots/min" },
  ],
});

add("enrobing-machine", {
  featured: true,
  capacityKgH: null,
  capacityLabel: "4–6 m/min",
  summary:
    "Enrober for tempered chocolate, compound, or a barrier coat, with single or double curtains and belts from 400–1,600 mm.",
  description:
    "Bars, centers, and biscuits meet a controlled curtain here. The chocolate enrober family includes a single fall at 4 m/min and 15 kW (ENROB-ER-S-1000) and a double fall at 6 m/min and 19 kW (ENROB-ER-D-1000). Belt width is selected between 400 mm and 1,600 mm, and the published cabinet for the 1,000 mm class is 1,400 × 1,600 × 1,800 mm.\n\nTempering sits upstream and a cooling tunnel sits downstream. We quote those three together so viscosity, curtain stability, and exit temperature are one conversation rather than three purchase orders that do not fit.",
  features: [
    "Tempered chocolate, compound, or barrier coating",
    "Single curtain at 4 m/min",
    "Double curtain at 6 m/min",
    "Belt widths 400–1,600 mm",
  ],
  applications: ["Candy bars", "Nougat bars", "Centers", "Inclusion biscuits"],
  extraSpecs: [
    { label: "ENROB-ER-S-1000", value: "Single fall, 4 m/min, 15 kW, 1,400 × 1,600 × 1,800 mm" },
    { label: "ENROB-ER-D-1000", value: "Double fall, 6 m/min, 19 kW, 1,400 × 1,600 × 1,800 mm" },
  ],
});

add("caramel-enrobing-machine", {
  capacityKgH: null,
  capacityLabel: "4 m/min",
  summary:
    "Caramel curtain coater at 4 m/min and 15 kW, with belt widths from 400 mm to 1,600 mm.",
  description:
    "Caramel coating is a different rheology from tempered chocolate, so it has its own fall. ENROB-ER-C-1000 is published at 4 m/min and 15 kW, in a 1,400 × 1,600 × 1,800 mm frame, with belt options from 400 mm to 1,600 mm.\n\nUse it when a bar needs a caramel layer before chocolate, or when caramel is the finished coat. The slab former and cooling tunnel on either side are quoted from the same bar-line family.",
  features: [
    "Dedicated caramel curtain",
    "4 m/min published belt speed",
    "15 kW published total",
    "400–1,600 mm belt options",
  ],
  applications: ["Caramel-coated bars", "Caramel layer under chocolate", "Confectionery centers"],
  extraSpecs: [
    { label: "ENROB-ER-C-1000", value: "Caramel fall, 4 m/min, 15 kW, 1,400 × 1,600 × 1,800 mm" },
  ],
});

add("cooling-tunnel", {
  capacityKgH: null,
  capacityLabel: "8,000–100,000 kcal/h",
  summary:
    "Cooling tunnel for enrobed bars or chocolate drops, 2.2 kW, with belts from 400 mm to 1,600 mm.",
  description:
    "COOL-ER-1000 is the cooling step after an enrober or after a drop depositor. Published duty is 8,000–100,000 kcal/h at 2.2 kW of connected power. Length is built to the layout — the catalog notes length on request above 1,400 mm — and belt width follows the upstream machine from 400 mm to 1,600 mm.\n\nThe right tunnel is the one that matches your belt and your exit temperature, not the one with the largest nameplate. Send the product entering temperature and the pack weight you need at the discharge.",
  features: [
    "For enrobed products or chocolate drops",
    "8,000–100,000 kcal/h",
    "2.2 kW published total",
    "Belt width matched from 400–1,600 mm",
  ],
  applications: ["Enrobed bars", "Chocolate chips", "Caramel-coated bars"],
  extraSpecs: [
    { label: "Frame note", value: "Length as requested; width 1,600 mm class; height 1,800 mm" },
    { label: "Belt width options", value: "400–1,600 mm" },
  ],
});

add("nougat-slab-former", {
  capacityKgH: null,
  capacityLabel: "Slab thickness on request",
  summary:
    "Slab former that cools nougat, cereal mass, or halva to a set thickness. MFND-600 is 1.8 kW.",
  description:
    "After the nougat mixer, the mass has to become a sheet of known thickness before slitting. This former lays and cools nougat, cereal mixtures, halva, and similar soft candy on a belt. MFND-600 is published at 1.8 kW and 1,300 × 1,600 × 1,900 mm.\n\nIt is a forming module, not a whole factory. The usual neighbors are a continuous nougat mixer, a slitter, an enrober, and a cooling tunnel, which we price as a bar line when you want one responsible layout.",
  features: [
    "Sets slab thickness while cooling",
    "Nougat, cereal mass, and halva",
    "MFND-600 at 1.8 kW",
    "Fits a bar-line layout",
  ],
  applications: ["Nougat bars", "Cereal bars", "Halva slabs"],
  extraSpecs: [{ label: "MFND-600 dimensions (L × W × H)", value: "1,300 × 1,600 × 1,900 mm" }],
});

add("caramel-slab-former", {
  capacityKgH: null,
  capacityLabel: "Slab thickness on request",
  summary:
    "Drum former that cools caramel, marmalade, or jelly to an even thickness. MFCD-600 is 3.5 kW.",
  description:
    "Caramel sheet goods need an even gauge or the cutter and the enrober both suffer. This former cools caramel, marmalade, and jelly masses to the thickness you set. MFCD-600 is published at 3.5 kW and 1,580 × 1,750 × 3,750 mm.\n\nPair it with the caramel continuous mixer when the kitchen and the slab have to share one rate. Rope forming is a different drum if your finished good is a rope rather than a slab.",
  features: [
    "Even cooled thickness",
    "Caramel, marmalade, and jelly masses",
    "MFCD-600 at 3.5 kW",
    "Quoted with the caramel mixer",
  ],
  applications: ["Caramel layers", "Jelly slabs", "Layered bars"],
  extraSpecs: [{ label: "MFCD-600 dimensions (L × W × H)", value: "1,580 × 1,750 × 3,750 mm" }],
});

add("nuga-conti-mixer", {
  capacityKgH: null,
  capacityLabel: "Continuous nougat mixing",
  summary:
    "Continuous mixer and doser for nougat mass, with an optional granule feed. MFCM-N is 2.3 kW.",
  description:
    "Batch bowls struggle once a bar line is running all day. This continuous mixer doses and blends nougat, and a granule feeder can add inclusions at a set rate. MFCM-N is published at 2.3 kW and 3,075 × 1,035 × 2,160 mm.\n\nIt feeds the nougat slab former. Send the recipe solids and whether nuts are mixed in or sprinkled later; that choice changes the feeder, not just the mixer speed.",
  features: [
    "Continuous nougat mixing and dosing",
    "Optional granule feed",
    "2.3 kW on MFCM-N",
    "Upstream of the slab former",
  ],
  applications: ["Nougat bars", "Nut nougat", "Aerated nougat mass"],
  extraSpecs: [{ label: "MFCM-N dimensions (L × W × H)", value: "3,075 × 1,035 × 2,160 mm" }],
});

add("caramel-conti-mixer", {
  capacityKgH: null,
  capacityLabel: "Continuous caramel mixing",
  summary:
    "Continuous caramel mixer and doser with optional granule feed. MFCM-CA is 1.3 kW.",
  description:
    "This mixer keeps caramel mass moving and dosed instead of holding it in a kettle between batches. Granules can be metered in. MFCM-CA is published at 1.3 kW and 2,250 × 1,585 × 590 mm, a low frame that has to be checked against the slab former infeed height.\n\nWe quote it with the caramel slab former and, when the bar is coated, with the caramel or chocolate enrober.",
  features: [
    "Continuous caramel dosing",
    "Optional granule addition",
    "1.3 kW on MFCM-CA",
    "Low infeed height to confirm",
  ],
  applications: ["Caramel bars", "Caramel layers", "Inclusion caramel"],
  extraSpecs: [{ label: "MFCM-CA dimensions (L × W × H)", value: "2,250 × 1,585 × 590 mm" }],
});

add("cereal-bar-conti-mixer", {
  capacityKgH: null,
  capacityLabel: "Continuous cereal mixing",
  summary:
    "Continuous mixer that doses cereal-bar mass. MFCM-C is published at 1.1 kW.",
  description:
    "Cereal bars fail when the binder and the grains are not in the same ratio from minute to minute. This continuous mixer is the dosing step for that mass. MFCM-C is published at 1.1 kW and 2,600 × 1,040 × 2,825 mm.\n\nDownstream is typically a slab former, a cutter, and either chocolate or caramel enrobing. Tell us the grain size and whether the binder is caramel, syrup, or fat-based so the contact parts are specified correctly.",
  features: [
    "Continuous cereal-mass dosing",
    "1.1 kW on MFCM-C",
    "Feeds slab forming and cutting",
    "Binder type confirmed on the quote",
  ],
  applications: ["Cereal bars", "Granola-style confectionery bars", "Seed bars"],
  extraSpecs: [{ label: "MFCM-C dimensions (L × W × H)", value: "2,600 × 1,040 × 2,825 mm" }],
});

add("chocolate-tempering-machine", {
  featured: true,
  capacityKgH: 250,
  capacityLabel: "250 kg/h",
  summary:
    "Tempering machine at 250 kg/h for chocolate, compound, and nougat crystallization ahead of moulding or enrobing.",
  description:
    "Gloss and snap are set here, not in the mould. The published MKTM-250 rating is 250 kg/h, with a 0.75 kW mixer, 4.5 kW of heat, and 13.5 kW total, in a frame of 1,040 × 980 × 1,530 mm. The same heat-treatment duty is used for compounds and for nougat that needs a controlled crystal structure, and the family can also detemper mass that is going back into process.\n\nA moulding line at 1,000 kg/h needs more tempering capacity than this single 250 kg/h unit. We stack or select the tempering duty to match the depositor rather than leaving a bottleneck in front of a new line.",
  features: [
    "250 kg/h published throughput",
    "13.5 kW total on MKTM-250",
    "For chocolate, compound, and nougat",
    "Detempering path for rework",
  ],
  applications: ["Moulding feed", "Enrober feed", "Compound coating", "Nougat temperature control"],
  extraSpecs: [
    { label: "Mixer motor", value: "0.75 kW" },
    { label: "Heating", value: "4.5 kW" },
    { label: "Dimensions (L × W × H)", value: "1,040 × 980 × 1,530 mm" },
  ],
});

add("chocolate-ball-mill", {
  capacityKgH: null,
  capacityLabel: "600–800 kg per 2–4 h batch",
  summary:
    "Batch ball mill for fat-based chocolate. MKCM-800 refines 800 kg in 2–4 hours at 34 kW.",
  description:
    "A batch ball mill is the refining step for plants that still run discrete chocolate batches. MKCM-800 holds 800 kg and finishes a batch in 2–4 hours, with a 22 kW mill motor at 110 rpm, a 2.2 kW lobe pump, 9 kW of heat, and 34 kW total. MKCM-600 is the 600 kg version at 26.3 kW. Both tanks are jacketed.\n\nParticle-size targets belong in the quote. If you need a steady hourly flow into a conche, look at the continuous mill instead of stacking more batch tanks.",
  features: [
    "Batch refining of fat-based mass",
    "800 kg and 600 kg frames",
    "Jacketed tank",
    "2–4 hour published cycle",
  ],
  applications: ["Chocolate mass", "Compound", "Filling creams"],
  extraSpecs: [
    { label: "MKCM-800", value: "800 kg / 2–4 h; 34 kW; 2,070 × 1,585 × 2,270 mm" },
    { label: "MKCM-600", value: "600 kg / 2–4 h; 26.3 kW; 2,060 × 1,620 × 2,210 mm" },
  ],
});

add("continuous-chocolate-mill", {
  featured: true,
  capacityKgH: 1000,
  capacityLabel: "600–1,000 kg/h",
  summary:
    "Continuous ball mill refiner at 600–1,000 kg/h for fat-based chocolate mass. MKBM-1000 is 92 kW.",
  description:
    "Continuous refining is how a moulding line stays fed without waiting on a batch cycle. MKBM-1000 is published at 600–1,000 kg/h, with a 90 kW mill motor at 245 rpm, a 1.5 kW transfer pump, and 92 kW total, in a vertical frame of 1,925 × 1,000 × 3,200 mm.\n\nCheck the 3.2 m height against the room before you fall in love with the kilograms per hour. Upstream is a pre-mixer; downstream is usually a conche or a storage tank and then tempering.",
  features: [
    "600–1,000 kg/h continuous refining",
    "92 kW published total",
    "Vertical footprint",
    "Fed from a pre-mixer",
  ],
  applications: ["Industrial chocolate mass", "Compound coatings", "Line-fed moulding"],
  extraSpecs: [
    { label: "Mill motor", value: "90 kW at 245 rpm" },
    { label: "Dimensions (L × W × H)", value: "1,925 × 1,000 × 3,200 mm" },
  ],
});

add("continuous-ball-mill-refiner-line", {
  capacityKgH: 1000,
  capacityLabel: "Line built around 600–1,000 kg/h",
  summary:
    "Continuous ball-mill refiner line that ties premixing, milling, and transfer into one chocolate-mass cell.",
  description:
    "A lone mill still needs a mixer, pumps, and a place for the refined mass to go. This line groups the continuous ball-mill refiner with the tanks and transfer that keep 600–1,000 kg/h moving. The mill rating itself remains the MKBM class: up to 1,000 kg/h and a tall vertical frame.\n\nWe use this page when you want the refining room engineered as one cell rather than a list of loose tanks. Storage hours and cleaning breaks are part of that layout.",
  features: [
    "Mill plus transfer as one cell",
    "Built around the 600–1,000 kg/h refiner",
    "Premix and downstream storage included in the layout",
  ],
  applications: ["Chocolate mass kitchens", "Compound production", "Feeding several moulding lines"],
});

add("conching-machine", {
  capacityKgH: null,
  capacityLabel: "3,000–6,000 kg batches",
  summary:
    "Conche for flavor development in 3,000, 4,500, or 6,000 kg batches over a 6–8 hour cycle.",
  description:
    "Refining sets particle size; conching strips volatiles and builds texture. The MKTC family is published at 3,000 kg and 94 kW, 4,500 kg and 137 kW, or 6,000 kg and 167 kW, each with a 6–8 hour conche. Frames grow from about 3.8 m long to just under 5 m.\n\nMatch the conche to the mill ahead of it. A 1,000 kg/h continuous mill will overfeed a single 3,000 kg conche unless you plan batch timing or a second unit. That arithmetic is part of the quote.",
  features: [
    "3, 4.5, and 6 tonne batches",
    "6–8 hour published cycle",
    "94–167 kW depending on size",
    "Sized against the upstream mill",
  ],
  applications: ["Chocolate flavor development", "Mass finishing before storage", "Premium tablet plants"],
  extraSpecs: [
    { label: "MKTC-3000", value: "3,000 kg; 6–8 h; 94 kW; 3,828 × 3,695 × 3,446 mm" },
    { label: "MKTC-4500", value: "4,500 kg; 6–8 h; 137 kW; 4,230 × 3,695 × 3,900 mm" },
    { label: "MKTC-6000", value: "6,000 kg; 6–8 h; 167 kW; 4,980 × 3,695 × 3,990 mm" },
  ],
});

add("chocolate-pre-mixer", {
  capacityKgH: null,
  capacityLabel: "1,650 kg batch",
  summary:
    "Jacketed pre-mixer for cocoa mass and fat-based recipes. MKOH-1650 holds 1,650 kg.",
  description:
    "Everything the mill will see is combined here. The MKOH-1650 holds 1,650 kg, with twin 3 kW agitators, a 2.2 kW chocolate pump, and heating that brings the published total to 17.3 kW on the base model, 23.3 kW on the E model, or 24 kW on the three-tank A model. The tank is jacketed and insulated.\n\nAutomatic weighing and loading are optional. We specify them when the pre-mixer is the batch record for a continuous mill running 600–1,000 kg/h.",
  features: [
    "1,650 kg fat-based batches",
    "Jacketed and insulated",
    "Optional weighing and loading",
    "Feeds the ball mill",
  ],
  applications: ["Cocoa mass melting and mixing", "Recipe batching", "Mill feed"],
  extraSpecs: [
    { label: "MKOH-1650", value: "1,650 kg; 17.3 kW; 2,720 × 1,675 × 1,655 mm" },
    { label: "MKOH-E-1650", value: "1,650 kg; 23.3 kW; same base footprint" },
  ],
});

add("horizontal-mixer", {
  capacityKgH: null,
  capacityLabel: "2,500 kg in about 30 min",
  summary:
    "Horizontal shear mixer for high-viscosity masses. MKYH-2500 holds 2,500 kg with a 30-minute mix and 55 kW.",
  description:
    "High-viscosity pastes do not turn over in a simple paddle tank. This horizontal mixer uses a shear agitator for a short, heavy mix. MKYH-2500 is published at 2,500 kg, about 30 minutes, and 55 kW, in a frame of 1,560 × 2,735 × 2,653 mm.\n\nIt is the pre-step when particle size still has to drop before a roll refiner or another finishing machine. Tell us the incoming viscosity so we do not undersize the drive.",
  features: [
    "Shear mixing for viscous mass",
    "2,500 kg tank",
    "About 30 minutes published",
    "55 kW",
  ],
  applications: ["Chocolate premix", "High-viscosity fat-based pastes", "Refiner feed"],
  extraSpecs: [{ label: "Dimensions (L × W × H)", value: "1,560 × 2,735 × 2,653 mm" }],
});

add("z-mixer", {
  capacityKgH: null,
  capacityLabel: "500 L",
  summary:
    "Z-blade mixer for high-viscosity confectionery masses. 500 L models are published at 26.5 kW and 30 kW.",
  description:
    "Z-blades are for dough-like or paste masses that a propeller cannot move. MKZM-250 is a 500 L mixer at 2 × 11 kW and 26.5 kW total. MNZM-250 is the companion 500 L frame at 30 kW. Both sit in a 2,695 × 1,510 × 2,000 mm envelope.\n\nOn a confectionery floor this is the mixer for heavy fillings and similar pastes, not a bread dough line. The cake-dough Z-mixer is a different MEMAK family and is not offered on this site.",
  features: [
    "Z-blade mixing",
    "500 L working volume",
    "26.5 kW and 30 kW models",
    "For viscous confectionery pastes",
  ],
  applications: ["Heavy fillings", "Viscous confectionery pastes", "Inclusion bases"],
  extraSpecs: [
    { label: "MKZM-250", value: "500 L; 26.5 kW; 2,695 × 1,510 × 2,000 mm" },
    { label: "MNZM-250", value: "500 L; 30 kW; 2,695 × 1,510 × 2,000 mm" },
  ],
});

add("fat-melting-tank", {
  capacityKgH: null,
  capacityLabel: "1,000–1,600 kg batches",
  summary:
    "Jacketed tanks for melting fat blocks. MKYE-1600 holds 1,600 kg; MNYE-1000 holds 1,000 kg.",
  description:
    "Cocoa butter and compound fats arrive as blocks. MKYE-1600 melts 1,600 kg with a 1.5 kW agitator, 15 kW of heat, and 16.6 kW total, in a 2,300 × 1,980 × 1,500 mm tank. MNYE-1000 is the 1,000 kg tank at 1.5 kW, with a jacketed hot-water design, and a load-cell option when the melt has to be a weighed batch.\n\nPlace it near the pre-mixer so liquid fat does not travel across a cold room. We confirm hot-water or electric heat against the utilities you already have.",
  features: [
    "1,600 kg and 1,000 kg frames",
    "Jacketed hot-water design",
    "Load cells available on MNYE-1000",
    "Feeds the chocolate pre-mixer",
  ],
  applications: ["Cocoa butter", "Compound fat", "Weighed fat batches"],
  extraSpecs: [
    { label: "MKYE-1600", value: "1,600 kg; 16.6 kW; 2,300 × 1,980 × 1,500 mm" },
    { label: "MNYE-1000", value: "1,000 kg; 1.5 kW; 2,165 × 1,590 × 1,340 mm" },
  ],
});

add("continuous-mass-melting-system", {
  capacityKgH: null,
  capacityLabel: "1,500 kg continuous melt",
  summary:
    "Continuous melter for cocoa-mass blocks. MKMM-1000 is rated at 1,500 kg with 56 kW connected.",
  description:
    "Block cocoa mass is awkward in a batch kettle once the mill is running continuously. MKMM-1000 is published to melt cocoa-mass blocks on a continuous basis at a 1,500 kg rating, with a 22 kW drive, 30 kW of heat, a 3 kW pump, and 56 kW total. The frame is long: 6,700 × 2,000 × 2,400 mm.\n\nIt belongs at the head of a mass kitchen that already has a pre-mixer and a ball mill. Confirm how blocks are loaded — pallet, hoist, or conveyor — before the layout is signed.",
  features: [
    "Continuous cocoa-mass block melting",
    "1,500 kg published rating",
    "56 kW connected",
    "6.7 m frame",
  ],
  applications: ["Cocoa mass preparation", "Feed to the pre-mixer", "Continuous chocolate kitchens"],
  extraSpecs: [
    { label: "Drive / heat / pump", value: "22 kW / 30 kW / 3 kW" },
    { label: "Dimensions (L × W × H)", value: "6,700 × 2,000 × 2,400 mm" },
  ],
});

add("sugar-powder-mill", {
  capacityKgH: 1000,
  capacityLabel: "650–1,000 kg/h",
  summary:
    "Sugar powder mill at 650–1,000 kg/h, grinding crystal sugar to 25–80 microns.",
  description:
    "Icing sugar bought in bags is not always the right particle size, and it is one more ingredient to inventory. MKPD-1000 grinds crystal sugar to powder at 650–1,000 kg/h. Published fineness is 25–80 microns for about 80% of the product, with an 11 kW grinding motor and 13.2 kW total. The mill is 2,245 × 1,080 × 2,165 mm and uses a cold-water jacket.\n\nIt supports chocolate and candy recipes that call for powdered sugar. It is not a panning drum — that duty sits on the sugar and paraffin coater.",
  features: [
    "650–1,000 kg/h",
    "25–80 micron published range",
    "13.2 kW total",
    "Cold-water jacket",
  ],
  applications: ["Powdered sugar for chocolate", "Candy recipe prep", "In-house sugar milling"],
  extraSpecs: [
    { label: "Grinding motor", value: "11 kW at 3,000 rpm" },
    { label: "Dimensions (L × W × H)", value: "2,245 × 1,080 × 2,165 mm" },
  ],
});

add("sugar-paraffin-coating-drum", {
  capacityKgH: null,
  capacityLabel: "600 kg batch",
  summary:
    "Coating drum for sugar or paraffin on jelly products. MSSD-600 holds 600 kg at 2 kW.",
  description:
    "Gummies often leave the mould sticky. This drum coats jelly pieces with sugar or paraffin so they pack cleanly. MSSD-600 is a 600 kg batch at 2 kW, in a 2,350 × 1,250 × 1,750 mm frame.\n\nIt sits after the soft-candy moulding line and before wrapping. Coat weight and dwell time are recipe items we confirm with a sample, not guesses from the motor size.",
  features: [
    "Sugar or paraffin coating",
    "600 kg batch",
    "2 kW",
    "Placed after jelly demoulding",
  ],
  applications: ["Sugared gummies", "Sanded jellies", "Paraffin-finished jelly"],
  extraSpecs: [{ label: "Dimensions (L × W × H)", value: "2,350 × 1,250 × 1,750 mm" }],
});

add("batch-type-cooker", {
  capacityKgH: 1200,
  capacityLabel: "250–1,200 kg/h",
  summary:
    "Batch cooker for pectin and milk-based syrups, from a single 400 L tank up to a triple tank at 1,200 kg/h.",
  description:
    "Jelly and caramel kitchens still cook in batches when the recipe or the inclusions demand it. The single-tank MSBC-S-400 is 250–400 kg/h from a 400 L vessel at 12 kW. The double tank reaches 500–800 kg/h at 27 kW. The triple-tank MSBC-T-400 reaches 750–1,200 kg/h at 39 kW, with 12–28 minutes in each tank. Weighing is optional.\n\nMatch the cooker to the moulding line: an MSCL running near 540 kg/h should not be fed by an undersized single kettle. That is the capacity check we do on every gummy quote.",
  features: [
    "Pectin and milk-based syrups",
    "One, two, or three 400 L tanks",
    "12–28 minutes per tank",
    "Optional automatic weighing",
  ],
  applications: ["Pectin jelly", "Milk syrups", "Gummy kitchens", "Caramel prep"],
  extraSpecs: [
    { label: "MSBC-S-400", value: "250–400 kg/h; 400 L; 12 kW; 1,495 × 2,670 × 3,330 mm" },
    { label: "MSBC-D-400", value: "500–800 kg/h; 2 × 400 L; 27 kW" },
    { label: "MSBC-T-400", value: "750–1,200 kg/h; 3 × 400 L; 39 kW; 4,450 × 2,670 × 3,330 mm" },
  ],
});

add("continuous-cooking-unit-with-vacuum", {
  capacityKgH: 600,
  capacityLabel: "400–600 kg/h",
  summary:
    "Vacuum cooking for jelly, caramel, toffee, and fondant. MNCC-600 is 400–600 kg at 15 kW; MSCC-500 is 500 kg at 12 kW.",
  description:
    "Vacuum lets you hit solids without the color and flavor damage of a long atmospheric boil. MNCC-600 is the scraper vacuum cooker published at 400–600 kg and 15 kW, including the duty for milk-based syrups, in a 3,933 × 1,634 × 2,602 mm frame. MSCC-500 is the 500 kg vacuum unit at 12 kW. The family is used for caramel, toffee, fondant, and pectin jelly.\n\nContinuous cooking only pays when the moulding line can take a continuous feed. We will say so if a batch cooker is the better fit for your changeover pattern.",
  features: [
    "Vacuum cooking with scraper option",
    "Jelly, caramel, toffee, and fondant",
    "400–600 kg class",
    "Sized against the depositor",
  ],
  applications: ["Pectin jelly", "Caramel", "Toffee", "Fondant"],
  extraSpecs: [
    { label: "MNCC-600", value: "400–600 kg; 15 kW; 3,933 × 1,634 × 2,602 mm" },
    { label: "MSCC-500", value: "500 kg; 12 kW; 1,207 × 1,387 × 2,520 mm" },
  ],
});

add("cooker-aeration-system", {
  capacityKgH: null,
  capacityLabel: "400 L cook and aerate",
  summary:
    "Batch cooker and aeration system for soft candy, with a 400 L pressurized buffer available alongside it.",
  description:
    "Some soft-candy textures are cooked and aerated in the same cell rather than whipped later on the depositor. The MNAC-400 class is a 400 L batch cooker and aeration system published at 30 kW, in a 1,732 × 2,425 × 4,001 mm frame. A companion pressurized buffer, MNAS-400, holds 400 L at 5 kW so the aerated mass is not collapsed in a vented tank.\n\nUse this path for aerated soft candy and then deposit with the aerated head. The 4 m height has to be checked against the room before anything else.",
  features: [
    "Batch cooking plus aeration",
    "400 L class",
    "Pressurized buffer to hold the foam",
    "Pairs with the aerated depositor",
  ],
  applications: ["Aerated soft candy", "Marshmallow-style centers", "Whipped confectionery mass"],
  extraSpecs: [
    { label: "MNAC-400", value: "400 L; 30 kW; 1,732 × 2,425 × 4,001 mm" },
    { label: "MNAS-400 buffer", value: "400 L; 5 kW; 1,338 × 1,419 × 2,951 mm" },
  ],
});

add("chocolate-wrapping-machine", {
  capacityKgH: null,
  capacityLabel: "220–300 pieces/min",
  summary:
    "Chocolate wrapper for single twist, double twist, top twist, fold, and bunch styles at 220–300 pieces per minute.",
  description:
    "Demoulded tablets still have to become a retail unit. MCPM is published at 220–300 pieces per minute and 8 kW, with a 5,000 × 1,750 × 2,065 mm frame, and it covers single twist, double twist, top twist, fold wrap, and bunch wrap.\n\nWrapper speed only matters if the moulding line and the feeding conveyor can present pieces that fast. We check piece length, foil or film, and the number of wrappers against the demoulding rate before recommending one machine or a bank of them.",
  features: [
    "220–300 pieces/min",
    "Twist, fold, and bunch styles",
    "8 kW",
    "Matched to moulding discharge",
  ],
  applications: ["Wrapped tablets", "Seasonal twists", "Fold-wrapped bars"],
  extraSpecs: [{ label: "Dimensions (L × W × H)", value: "5,000 × 1,750 × 2,065 mm" }],
});

add("jelly-and-chocolate-ball-wrapping-machine", {
  capacityKgH: null,
  capacityLabel: "350–600 pieces/min",
  summary:
    "Double-twist wrapper for jelly at 500–600 pieces/min and for ball chocolate at 350–450 pieces/min.",
  description:
    "Round and jelly pieces need a different wrap path than a flat tablet. MCJP is published at 8 kW in a 3,450 × 1,400 × 1,400 mm frame. Jelly runs at 500–600 pieces per minute; ball chocolate runs at 350–450 pieces per minute, both in double twist.\n\nIt is the finisher after sugaring on a gummy line, or after the lentil and ball former on a chocolate line. Film width and piece diameter travel with the quote.",
  features: [
    "Double twist",
    "Jelly at 500–600 pcs/min",
    "Ball chocolate at 350–450 pcs/min",
    "8 kW compact frame",
  ],
  applications: ["Wrapped gummies", "Ball chocolates", "Double-twist jelly"],
  extraSpecs: [{ label: "Dimensions (L × W × H)", value: "3,450 × 1,400 × 1,400 mm" }],
});

add("automatic-chocolate-feeding-conveyor", {
  capacityKgH: null,
  capacityLabel: "600–1,200 pieces/min",
  summary:
    "Feeding conveyor that takes demoulded chocolates to two, four, or six wrappers at 600–1,200 pieces per minute.",
  description:
    "A fast moulding line will bury a single wrapper. MTFC spreads demoulded pieces to two, four, or six wrapping machines. Published throughput is 600–1,200 pieces per minute. Connected power is 6 kW, 8 kW, or 12 kW, and length grows from 7.9 m to 19.2 m as you add wrapper stations.\n\nThis is the link we draw between the demoulding end of an MKCD or MKSL line and the MCPM wrappers. Lane count follows the piece rate, not the other way around.",
  features: [
    "Feeds 2, 4, or 6 wrappers",
    "600–1,200 pieces/min",
    "Length grows with station count",
    "Designed around moulding discharge",
  ],
  applications: ["Moulding-to-wrap transfer", "Multi-wrapper cells", "Tablet packing rooms"],
  extraSpecs: [
    { label: "MTFC-2", value: "6 kW; 7,900 × 1,350 × 930 mm" },
    { label: "MTFC-4", value: "8 kW; 13,500 × 1,350 × 930 mm" },
    { label: "MTFC-6", value: "12 kW; 19,200 × 1,350 × 930 mm" },
  ],
});

add("cup-filling-machine", {
  capacityKgH: null,
  capacityLabel: "21–48 jars/min",
  summary:
    "Double-color cup filler for spreadable cream: 42–48 jars/min at 100–250 g, or 21–24 jars/min at 350–700 g.",
  description:
    "Spreadable cream is a filling job, not a moulding job. MKCF-450 deposits one or two colors into jars or cups. Published rates are 42–48 jars per minute for 100–250 g packs and 21–24 jars per minute for 350–700 g packs, at 10 kW. The frame is 4,140 × 4,260 × 2,420 mm.\n\nLid, jar mouth, and viscosity decide the nozzle more than the brochure photo does. Send a jar drawing with the quote request and we will confirm whether one head or a double-color setup is required.",
  features: [
    "Single or double color",
    "100–700 g pack range",
    "Up to 48 jars/min on smaller packs",
    "10 kW",
  ],
  applications: ["Chocolate spreads", "Two-color cups", "Jarred cream"],
  extraSpecs: [{ label: "Dimensions (L × W × H)", value: "4,140 × 4,260 × 2,420 mm" }],
});

add("fondant-beater", {
  capacityKgH: null,
  capacityLabel: "600 kg",
  summary:
    "Fondant beater that works a cooked sugar mass. MSFB-600 is a 600 kg unit at 18 kW.",
  description:
    "Fondant texture comes from beating a cooked, supersaturated sugar mass, not from depositing alone. MSFB-600 is published at 600 kg and 18 kW, in a 4,050 × 1,000 × 1,500 mm frame.\n\nIt sits with the vacuum cooker and ahead of moulding when fondant pieces or fondant fillings are in the range. If your SKU is only pectin gummy, you likely do not need this machine — we will say that plainly.",
  features: [
    "Beats cooked sugar into fondant",
    "600 kg",
    "18 kW",
    "Paired with the cooker, not sold as a standalone novelty",
  ],
  applications: ["Fondant candy", "Fondant fillings", "Cream centers"],
  extraSpecs: [{ label: "Dimensions (L × W × H)", value: "4,050 × 1,000 × 1,500 mm" }],
});

add("bar-line", {
  capacityKgH: null,
  capacityLabel: "Configured to the bar",
  summary: "A bar-line scope that links mixing, slab forming, cutting, enrobing, and cooling for nougat, caramel, and cereal bars.",
  description:
    "A bar is not one machine. This scope is the conversation for a full bar path: a continuous mixer, a slab or rope former, coating, and a cooling tunnel, sized to the bar you pack.\n\nThe individual frames — nougat mixer, slab former, enrober, and tunnel — are listed separately so each published rating stays visible. Ask for this line when you want one layout instead of four unrelated quotes.",
  features: ["Mixer through cooling in one scope", "Nougat, caramel, and cereal paths", "Each frame still quoted with its own rating"],
  applications: ["Nougat bars", "Caramel bars", "Cereal bars"],
});

add("caramel-rope-former", {
  capacityKgH: null,
  capacityLabel: "Rope thickness on request",
  summary: "Rope former that cools caramel, marmalade, or jelly into an even rope. MFCF-600 is published at 3.5 kW.",
  description:
    "Some caramel goods are a rope, not a slab. This drum cools caramel, marmalade, or jelly to a thickness you set and shapes it as a rope. MFCF-600 is published at 3.5 kW and 1,580 × 1,750 × 3,750 mm.\n\nIt sits with the caramel mixer. If the finished good is a flat bar, use the slab former instead and we will say so on the quote.",
  features: ["Even rope thickness", "Caramel, marmalade, and jelly", "3.5 kW on MFCF-600"],
  applications: ["Caramel ropes", "Jelly ropes", "Layered confectionery"],
  extraSpecs: [{ label: "MFCF-600 dimensions (L × W × H)", value: "1,580 × 1,750 × 3,750 mm" }],
});

add("robotic-packaging-machine", {
  capacityKgH: null,
  capacityLabel: "180–250 pieces/min",
  summary:
    "Camera-guided robotic packer that picks random pieces and places them at 180–250 pieces per minute.",
  description:
    "Pieces do not always leave a belt in neat lanes. MCRP uses a camera to find them and robotic arms to place them into pockets or onto the next conveyor. The published rating is 180–250 pieces per minute at 22.5 kW, on an 11.5 × 3.8 × 2.5 m cell.\n\nIt is a packing module for moulded chocolates, not a wrapper by itself. We quote it when lane feeding is not practical and the piece shape changes often.",
  features: ["Camera detection", "Robotic pick and place", "180–250 pieces/min", "22.5 kW"],
  applications: ["Random infeed packing", "Assortment placement", "Moulding discharge"],
  extraSpecs: [{ label: "Dimensions (L × W × H)", value: "11,500 × 3,800 × 2,500 mm" }],
});

add("soft-candy-production-line", {
  capacityKgH: 540,
  capacityLabel: "Matched to the MSCL moulding line",
  summary:
    "Soft-candy production scope that ties cooking, moulding, and finishing for jelly, caramel, and fondant.",
  description:
    "A moulding frame does not cook the syrup. This production-line scope is the place we talk about the whole soft-candy cell: cooker, moulding (MSCL-500 for pectin jelly or MSCL-600 when caramel and fondant are included), optional sugaring, and wrapping.\n\nPublished moulding rates remain 430 kg/h at 10 g and 540 kg/h at 15 g. The quote lists each machine so you can see what is in the line and what is left as a future bay.",
  features: ["Kitchen plus moulding in one scope", "Pectin, caramel, and fondant paths", "Rates aligned to the MSCL frames", "US layout and utilities included in the conversation"],
  applications: ["Gummy lines", "Jelly lines", "Soft caramel pieces"],
});

export const editorial = E;

export function editorialFor(slug: string): Editorial | undefined {
  if (editorial[slug]) return editorial[slug];
  const base = slug.replace(/-\d+$/, "");
  return editorial[base];
}
