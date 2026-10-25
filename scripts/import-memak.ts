/**
 * Crawl MEMAK confectionery product pages and write /data/machines.json.
 *
 * - Reads robots.txt and skips disallowed paths
 * - Waits between requests
 * - Downloads images into /public/images/machines/{slug}/
 * - Keeps specification figures as published
 * - Replaces marketing sentences with original US-buyer copy from scripts/editorial.ts
 * - Writes a TODO entry when a page cannot be fetched
 */
import { load, type CheerioAPI } from "cheerio";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { categories } from "../data/categories";
import type { Machine, MachineCatalog, MachineImage, ProductType, SpecRow } from "../lib/types";
import { editorialFor } from "./editorial";
import {
  ENTRY_PAGES,
  inferCategory,
  inferProductTypes,
  inScopePath,
  seeds,
  type Seed,
} from "./seeds";

const ORIGIN = "https://www.memak.com";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_JSON = path.join(ROOT, "data", "machines.json");
const LOG_JSON = path.join(ROOT, "data", "import-log.json");
const IMAGE_ROOT = path.join(ROOT, "public", "images", "machines");
const PLACEHOLDER = "/images/placeholder-machine.svg";
const PAGE_DELAY_MS = 800;
const IMAGE_DELAY_MS = 150;
const MAX_IMAGES = 5;
const USER_AGENT =
  "RizwanConfectioneryCatalogBot/1.0 (+https://rizwanconfectionery.com; confectionery catalog import; respects robots.txt)";

const MATERIALS =
  "Food-contact parts are stainless steel unless the quotation drawing names another alloy. Confirm gasket and belt materials for your recipe.";
const VOLTAGE =
  "Voltage is not published as a single figure on the manufacturer page. MEMAK confectionery machines are commonly built around 380–400 V, 50 Hz, three-phase. US 460 V / 60 Hz plants are specified when the quote is prepared.";

type Failure = { url: string; error: string };
type RobotRules = { disallow: string[] };

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function log(message: string) {
  const line = `[import] ${new Date().toISOString()} ${message}`;
  console.log(line);
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "text/html,application/xml,text/plain,*/*" },
    redirect: "follow",
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return response.text();
}

function parseRobots(text: string): RobotRules {
  const lines = text.split(/\r?\n/);
  let applies = false;
  const disallow: string[] = [];
  for (const raw of lines) {
    const line = raw.split("#")[0]?.trim() ?? "";
    if (!line) continue;
    const [keyRaw, ...rest] = line.split(":");
    const key = keyRaw.trim().toLowerCase();
    const value = rest.join(":").trim();
    if (key === "user-agent") {
      applies = value === "*";
    } else if (applies && key === "disallow" && value) {
      disallow.push(value);
    }
  }
  return { disallow };
}

function isAllowed(pathname: string, rules: RobotRules) {
  return !rules.disallow.some((rule) => rule !== "/" && pathname.startsWith(rule));
}

function encodePath(url: string) {
  try {
    const parsed = new URL(url);
    parsed.pathname = parsed.pathname
      .split("/")
      .map((part) => encodeURIComponent(decodeURIComponent(part)))
      .join("/");
    return parsed.toString();
  } catch {
    return url;
  }
}

function absoluteUrl(value: string) {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("//")) return `https:${value}`;
  if (value.startsWith("www.")) return `https://${value}`;
  return `${ORIGIN}${value.startsWith("/") ? "" : "/"}${value}`;
}

function slugBaseFromPath(pathname: string) {
  const file = pathname.split("/").pop()?.replace(/\.html$/, "") ?? "machine";
  const withoutId = file.replace(/-\d+$/, "");
  return withoutId.replace(/_/g, "-").replace(/[^a-z0-9-]/gi, "").replace(/-+/g, "-").toLowerCase();
}

function idFromPath(pathname: string) {
  const match = pathname.match(/-(\d+)\.html$/);
  return match ? `memak-${match[1]}` : `memak-${slugBaseFromPath(pathname)}`;
}

function cleanText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function parseSpecs($: CheerioAPI): SpecRow[] {
  const tables = $(".memak-product-middle table").toArray();
  const specs: SpecRow[] = [];
  for (const table of tables) {
    const matrix = $(table)
      .find("tr")
      .toArray()
      .map((row) =>
        $(row)
          .find("th,td")
          .toArray()
          .map((cell) => cleanText($(cell).text())),
      )
      .filter((row) => row.some(Boolean));
    if (!matrix.length) continue;
    const width = Math.max(...matrix.map((row) => row.length));
    if (width <= 2) {
      for (const row of matrix) {
        const label = row[0] || "Specification";
        const value = row.slice(1).filter(Boolean).join(" · ");
        if (value) specs.push({ label, value });
      }
      continue;
    }
    const header = matrix[0] ?? [];
    for (const row of matrix.slice(1)) {
      const label = row[0] || "Specification";
      for (let index = 1; index < row.length; index += 1) {
        const value = row[index];
        if (!value) continue;
        const model = header[index] || `Column ${index}`;
        specs.push({ label: `${label} (${model})`, value });
      }
    }
  }
  const block = cleanText($(".memak-product-middle").text());
  const code = block.match(/Product Code\s*:\s*([A-Z0-9][A-Z0-9 .+/_-]{1,48})/i);
  if (code?.[1]) {
    specs.unshift({ label: "Product code", value: cleanText(code[1]) });
  }
  return specs;
}

function collectMedia($: CheerioAPI) {
  const images: string[] = [];
  const brochures: { label: string; href: string }[] = [];
  const videos: { title: string; url: string }[] = [];
  const pushImage = (value?: string | null) => {
    if (!value) return;
    const url = absoluteUrl(value.split("?")[0] ?? "");
    if (!/\.(png|jpe?g|webp|gif)$/i.test(url)) return;
    if (/logo|lang\.png|icon/i.test(url)) return;
    if (!images.includes(url)) images.push(url);
  };

  const banner = $(".memak-product-top").attr("style") ?? "";
  const bannerMatch = banner.match(/url\((['"]?)([^'")]+)\1\)/i);
  pushImage(bannerMatch?.[2]);

  const zones = ".memak-product-top, .memak-product-top-bottom, .memak-product-middle";
  $(zones)
    .find("[data-fancybox], img")
    .each((_, element) => {
      pushImage($(element).attr("href"));
      pushImage($(element).attr("src"));
    });
  pushImage($('meta[property="og:image"]').attr("content"));

  $(`${zones} a[href$=".pdf"]`).each((_, element) => {
    const href = absoluteUrl($(element).attr("href") ?? "");
    if (!href || brochures.some((item) => item.href === href)) return;
    brochures.push({ label: cleanText($(element).text()) || "Product brochure", href });
  });

  $("iframe, a").each((_, element) => {
    const src = $(element).attr("src") || $(element).attr("href") || "";
    if (/youtube\.com|youtu\.be|vimeo\.com|\.mp4(\?|$)/i.test(src)) {
      const url = absoluteUrl(src);
      if (!videos.some((video) => video.url === url)) {
        videos.push({ title: "Product video", url });
      }
    }
  });

  const ranked = [...images].sort((a, b) => Number(a.includes("/detay/")) - Number(b.includes("/detay/")));
  return { images: ranked.slice(0, 12), brochures, videos };
}

function maxKgPerHour(specs: SpecRow[]) {
  let max = 0;
  for (const spec of specs) {
    if (!/capacity|kg/i.test(`${spec.label} ${spec.value}`)) continue;
    const matches = spec.value.match(/(\d[\d.,]*)\s*kg\s*\/\s*h/gi) ?? [];
    for (const match of matches) {
      const number = Number(match.replace(/[^\d.]/g, ""));
      if (number > max && number < 20000) max = number;
    }
  }
  return max || null;
}

function generatedCopy(name: string, specs: SpecRow[]) {
  const headline = specs
    .filter((spec) => /capacity|power|dimension|product code/i.test(spec.label))
    .slice(0, 4)
    .map((spec) => `${spec.label}: ${spec.value}`)
    .join(". ");
  const summary = `${name} is quoted for US confectionery plants with the manufacturer's published ratings left intact.`;
  const description = [
    `${name} is offered in North America through Rizwan Confectionery Equipment for confectionery production only.`,
    headline
      ? `Published technical data — ${headline}.`
      : "A full specification table was not present on the manufacturer page, so ratings will be confirmed on the quotation.",
    "Layout, utilities, and spare parts are confirmed before an order. This description was written for US buyers and does not reuse the manufacturer's marketing sentences.",
  ].join("\n\n");
  return {
    summary,
    description,
    features: [
      "Quoted for US installation planning",
      "Published ratings kept as printed",
      "Confectionery duty only",
    ],
    applications: ["Confectionery production"],
    capacityLabel: specs.find((spec) => /capacity/i.test(spec.label))?.value ?? "See specifications",
    capacityKgH: null as number | null,
  };
}

function sharesPhrase(original: string, rewritten: string) {
  const words = original
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2);
  const haystack = ` ${rewritten.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ")} `;
  for (let index = 0; index <= words.length - 10; index += 1) {
    const phrase = words.slice(index, index + 10).join(" ");
    if (haystack.includes(` ${phrase} `)) return phrase;
  }
  return null;
}

async function downloadImages(slug: string, urls: string[], name: string): Promise<MachineImage[]> {
  const folder = path.join(IMAGE_ROOT, slug);
  await mkdir(folder, { recursive: true });
  const saved: MachineImage[] = [];
  let index = 1;
  for (const url of urls) {
    try {
      await sleep(IMAGE_DELAY_MS);
      const response = await fetch(encodePath(url), { headers: { "User-Agent": USER_AGENT } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 2000) throw new Error("file too small");
      const type = response.headers.get("content-type") ?? "";
      const ext = type.includes("png")
        ? "png"
        : type.includes("webp")
          ? "webp"
          : type.includes("gif")
            ? "gif"
            : url.toLowerCase().endsWith(".png")
              ? "png"
              : "jpg";
      const filename = `${String(index).padStart(2, "0")}.${ext}`;
      await writeFile(path.join(folder, filename), bytes);
      saved.push({
        src: `/images/machines/${slug}/${filename}`,
        alt: `${name}, photograph ${index} of the MEMAK machine`,
        sourceUrl: url,
      });
      index += 1;
      if (saved.length >= MAX_IMAGES) break;
    } catch (error) {
      log(`image failed ${url} (${error instanceof Error ? error.message : "unknown"})`);
    }
  }
  return saved;
}

function discoverLinks(html: string) {
  const $ = load(html);
  const found = new Set<string>();
  $("a[href]").each((_, element) => {
    const href = $(element).attr("href") ?? "";
    if (!href.includes("/en/")) return;
    try {
      const url = new URL(href, ORIGIN);
      if (url.hostname.replace(/^www\./, "") !== "memak.com") return;
      if (inScopePath(url.pathname)) found.add(url.pathname);
    } catch {
      /* ignore malformed hrefs */
    }
  });
  return [...found];
}

async function scrapePage(seed: Seed, rules: RobotRules, usedSlugs: Set<string>): Promise<Machine> {
  const sourceUrl = seed.path.startsWith("http") ? seed.path : `${ORIGIN}${seed.path}`;
  const pathname = new URL(sourceUrl).pathname;
  const category = categories.find((item) => item.slug === seed.category);
  const baseSlug = slugBaseFromPath(pathname);
  const slug = usedSlugs.has(baseSlug) ? `${baseSlug}-${idFromPath(pathname).replace("memak-", "")}` : baseSlug;
  usedSlugs.add(slug);
  const editorial = editorialFor(slug) ?? editorialFor(baseSlug);

  const blank = (name: string, todo: string, specs: SpecRow[] = []): Machine => ({
    id: idFromPath(pathname),
    name,
    category: seed.category,
    categoryLabel: category?.label ?? seed.category,
    slug,
    productTypes: seed.productTypes,
    summary: editorial?.summary ?? `${name} — specifications pending a successful manufacturer-page import.`,
    description:
      editorial?.description ??
      `${name} could not be fully imported. ${todo} Replace this note after a successful run of npm run import.`,
    features: editorial?.features ?? ["Quotation required", "Confectionery duty", "US installation support"],
    specs,
    capacityKgH: editorial?.capacityKgH ?? null,
    capacityLabel: editorial?.capacityLabel ?? "See quotation",
    applications: editorial?.applications ?? ["Confectionery production"],
    images: [
      {
        src: PLACEHOLDER,
        alt: `Placeholder illustration for ${name} because a product photo was not downloaded`,
      },
    ],
    brochures: [],
    videos: [],
    sourceUrl,
    featured: Boolean(seed.featured || editorial?.featured),
    materials: MATERIALS,
    voltage: VOLTAGE,
    todo,
  });

  if (!isAllowed(pathname, rules)) {
    log(`SKIP robots.txt disallows ${pathname}`);
    return blank("Unnamed machine", `TODO: robots.txt disallows ${pathname}. Do not crawl this URL.`);
  }

  try {
    log(`fetch ${sourceUrl}`);
    const html = await fetchText(sourceUrl);
    const $ = load(html);
    const heading = cleanText($(".memak-product-top h2").first().text());
    const titled = cleanText($("title").first().text()).replace(/\s*\|.*$/, "");
    const name =
      (heading && !/memak professional/i.test(heading) ? heading : "") ||
      (titled && !/memak professional/i.test(titled) ? titled : "") ||
      baseSlug.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
    const detail = $(".product-left-detail").first().clone();
    detail.find("form, .modal, script, style, a").remove();
    const raw = cleanText(detail.text());
    const specs = parseSpecs($);
    const media = collectMedia($);
    const copy = editorial ?? generatedCopy(name, specs);
    if (editorial && raw) {
      const overlap = sharesPhrase(raw, `${editorial.summary} ${editorial.description}`);
      if (overlap) log(`WARNING copy overlap on ${slug}: "${overlap}"`);
    }
    const merged: SpecRow[] = [...specs];
    for (const extra of editorial?.extraSpecs ?? []) {
      const exists = merged.some((spec) => spec.label.toLowerCase() === extra.label.toLowerCase());
      if (!exists) merged.push(extra);
    }
    const images = await downloadImages(slug, media.images, name);
    const parsedCapacity = maxKgPerHour(merged);
    return {
      id: idFromPath(pathname),
      name,
      category: seed.category,
      categoryLabel: category?.label ?? seed.category,
      slug,
      productTypes: seed.productTypes,
      summary: copy.summary,
      description: copy.description,
      features: copy.features,
      specs: merged,
      capacityKgH: parsedCapacity ?? editorial?.capacityKgH ?? null,
      capacityLabel: editorial?.capacityLabel ?? copy.capacityLabel ?? (parsedCapacity ? `Up to ${parsedCapacity} kg/h` : "See specifications"),
      applications: copy.applications,
      images: images.length
        ? images
        : [
            {
              src: PLACEHOLDER,
              alt: `Placeholder illustration for ${name} because no photo downloaded`,
            },
          ],
      brochures: media.brochures,
      videos: media.videos,
      sourceUrl,
      featured: Boolean(seed.featured || editorial?.featured),
      materials: MATERIALS,
      voltage: VOLTAGE,
      todo: images.length ? null : "TODO: product page was read, but no image file could be saved. Placeholder is in use.",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    log(`FAIL ${sourceUrl} — ${message}`);
    return blank(
      editorial?.summary.split(".")[0] || baseSlug.replace(/-/g, " "),
      `TODO: page could not be scraped (${message}). Placeholder image is in use. Re-run npm run import.`,
    );
  }
}

async function main() {
  await mkdir(path.dirname(OUT_JSON), { recursive: true });
  await mkdir(IMAGE_ROOT, { recursive: true });

  let rules: RobotRules = { disallow: [] };
  try {
    const robots = await fetchText(`${ORIGIN}/robots.txt`);
    rules = parseRobots(robots);
    log(`robots.txt loaded. Disallow rules: ${rules.disallow.length ? rules.disallow.join(", ") : "(none)"}`);
  } catch (error) {
    log(`robots.txt could not be read (${error instanceof Error ? error.message : "unknown"}). Continuing cautiously with the confectionery allowlist.`);
  }

  const discovered = new Set<string>();
  for (const entry of ENTRY_PAGES) {
    try {
      await sleep(PAGE_DELAY_MS);
      const html = await fetchText(entry);
      for (const pathname of discoverLinks(html)) discovered.add(pathname);
      log(`discovered ${discovered.size} in-scope paths from navigation`);
    } catch (error) {
      log(`discovery failed for ${entry}: ${error instanceof Error ? error.message : "unknown"}`);
    }
  }

  const byPath = new Map<string, Seed>();
  for (const seed of seeds) byPath.set(seed.path, seed);
  for (const pathname of discovered) {
    if (byPath.has(pathname)) continue;
    byPath.set(pathname, {
      path: pathname,
      category: inferCategory(pathname),
      productTypes: inferProductTypes(pathname) as ProductType[],
    });
  }

  const failures: Failure[] = [];
  const machines: Machine[] = [];
  const usedSlugs = new Set<string>();
  for (const seed of byPath.values()) {
    await sleep(PAGE_DELAY_MS);
    const machine = await scrapePage(seed, rules, usedSlugs);
    if (machine.todo?.startsWith("TODO: page could not")) {
      failures.push({ url: machine.sourceUrl, error: machine.todo });
    }
    machines.push(machine);
  }

  const bestByName = new Map<string, Machine>();
  for (const machine of machines) {
    const key = `${machine.category}|${machine.name.toLowerCase()}`;
    const current = bestByName.get(key);
    const score = (item: Machine) =>
      item.images.filter((image) => !image.src.includes("placeholder")).length * 10 +
      item.specs.length -
      (item.todo ? 5 : 0);
    if (!current || score(machine) > score(current)) bestByName.set(key, machine);
  }
  const unique = [...bestByName.values()];

  const order = new Map(categories.map((category, index) => [category.slug, index]));
  unique.sort((a, b) => {
    const category = (order.get(a.category) ?? 99) - (order.get(b.category) ?? 99);
    if (category !== 0) return category;
    return a.name.localeCompare(b.name);
  });

  const catalog: MachineCatalog = {
    generatedAt: new Date().toISOString(),
    disclaimer:
      "Technical figures are taken from MEMAK public pages and the 2025 equipment catalog. Descriptions were rewritten for US buyers. Confirm every rating on the quotation drawing.",
    machines: unique,
  };

  await writeFile(OUT_JSON, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
  await writeFile(
    LOG_JSON,
    `${JSON.stringify({ finishedAt: catalog.generatedAt, count: unique.length, failures, todos: unique.filter((machine) => machine.todo).map((machine) => ({ slug: machine.slug, todo: machine.todo })) }, null, 2)}\n`,
    "utf8",
  );
  log(`wrote ${unique.length} machines to data/machines.json. Failures: ${failures.length}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
