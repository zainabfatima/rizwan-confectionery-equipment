export type TurnkeyLine = {
  slug: string;
  title: string;
  summary: string;
  fit: string;
  steps: { title: string; detail: string; machineSlug?: string }[];
};

export const turnkeyLines: TurnkeyLine[] = [
  {
    slug: "chocolate-tablet-line",
    title: "Chocolate tablet line",
    summary:
      "From fat and cocoa mass to a wrapped tablet: melting, mixing, refining, tempering, one-shot moulding, and feeding into wrappers.",
    fit: "Solid, filled, and two-color tablets when you want one party responsible for the rate from kitchen to wrap.",
    steps: [
      { title: "Melt", detail: "Fat blocks or cocoa mass become a pumpable liquid.", machineSlug: "fat-melting-tank" },
      { title: "Mix", detail: "The recipe is batched in the pre-mixer before refining.", machineSlug: "chocolate-pre-mixer" },
      { title: "Refine", detail: "A ball mill brings particle size down. Continuous mills feed larger moulding halls.", machineSlug: "continuous-chocolate-mill" },
      { title: "Conche", detail: "Flavor and texture are finished before the mass is stored.", machineSlug: "conching-machine" },
      { title: "Temper", detail: "Crystals are set so the tablet has gloss and snap.", machineSlug: "chocolate-tempering-machine" },
      { title: "Mould", detail: "One-shot depositing, cooling, and demoulding.", machineSlug: "automatic-one-shot-moulding-line" },
      { title: "Feed and wrap", detail: "Pieces are laned into one or more wrappers.", machineSlug: "automatic-chocolate-feeding-conveyor" },
    ],
  },
  {
    slug: "shell-praline-line",
    title: "Shell-moulded praline line",
    summary:
      "Classic shell forming for assortments: a thin shell, a fluid or chunky center, a chocolate back, then cooling and wrapping.",
    fit: "Boxed assortments, whole-nut pieces, and liquid centers that should not go through a one-shot depositor.",
    steps: [
      { title: "Temper", detail: "Viscosity has to be stable before the shell is cast.", machineSlug: "chocolate-tempering-machine" },
      { title: "Shell mould", detail: "Form, fill, back, cool, and demould on the MKSL-A family.", machineSlug: "automatic-chocolate-shell-moulding-line" },
      { title: "Feed", detail: "Demoulded pieces are presented to wrapping in lanes.", machineSlug: "automatic-chocolate-feeding-conveyor" },
      { title: "Wrap", detail: "Twist, fold, or bunch wrap at the published piece rate.", machineSlug: "chocolate-wrapping-machine" },
    ],
  },
  {
    slug: "gummy-jelly-line",
    title: "Gummy and jelly line",
    summary:
      "A candy production line for pectin gummies: cook, mould, sugar, and double-twist wrap, rated against 10 g and 15 g pieces.",
    fit: "Plants that searched for a gummy depositor and actually need the kitchen and the finisher as well.",
    steps: [
      { title: "Cook", detail: "Batch kettles or a vacuum cooker hit the solids the recipe needs.", machineSlug: "batch-type-cooker" },
      { title: "Mould", detail: "MSCL deposits, sets, and demoulds jelly, and MSCL-600 also covers caramel and fondant.", machineSlug: "soft-candy-automatic-moulding-line" },
      { title: "Sugar", detail: "A coating drum finishes sticky jellies before they are packed.", machineSlug: "sugar-paraffin-coating-drum" },
      { title: "Wrap", detail: "Double-twist wrapping at jelly piece rates.", machineSlug: "jelly-and-chocolate-ball-wrapping-machine" },
    ],
  },
  {
    slug: "bar-and-nougat-line",
    title: "Bar and nougat line",
    summary:
      "Continuous mixing, slab forming, chocolate or caramel enrobing, and cooling for nougat, caramel, and cereal bars.",
    fit: "Bar plants that want the slab, the curtain, and the tunnel specified as one belt path.",
    steps: [
      { title: "Mix", detail: "Nougat, caramel, or cereal mass is dosed continuously.", machineSlug: "nuga-conti-mixer" },
      { title: "Form", detail: "A slab former sets thickness while the mass cools.", machineSlug: "nougat-slab-former" },
      { title: "Enrobe", detail: "A chocolate or caramel curtain coats the bar.", machineSlug: "enrobing-machine" },
      { title: "Cool", detail: "The tunnel sets the coat before packing.", machineSlug: "cooling-tunnel" },
    ],
  },
];
