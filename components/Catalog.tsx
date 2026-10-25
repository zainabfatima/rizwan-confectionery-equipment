"use client";

import { useMemo, useState } from "react";
import { MachineCard } from "@/components/MachineCard";
import { categories } from "@/data/categories";
import { capacityBand } from "@/lib/labels";
import { productTypes, type Machine, type ProductType } from "@/lib/types";

export function Catalog({ machines }: { machines: Machine[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [productType, setProductType] = useState("all");
  const [capacity, setCapacity] = useState("all");
  const [sort, setSort] = useState("featured");

  const presentCategories = categories.filter((item) => machines.some((machine) => machine.category === item.slug));

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = machines.filter((machine) => {
      if (category !== "all" && machine.category !== category) return false;
      if (productType !== "all" && !machine.productTypes.includes(productType as ProductType)) return false;
      if (capacity !== "all" && capacityBand(machine) !== capacity) return false;
      if (!needle) return true;
      const haystack = [machine.name, machine.summary, machine.categoryLabel, machine.capacityLabel, ...machine.applications, ...machine.features]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
    return [...filtered].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "capacity") return (b.capacityKgH ?? -1) - (a.capacityKgH ?? -1);
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  }, [machines, query, category, productType, capacity, sort]);

  return (
    <div>
      <form className="card grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-5" onSubmit={(event) => event.preventDefault()}>
        <div className="xl:col-span-2">
          <label htmlFor="machine-search" className="mb-1 block text-sm font-medium">
            Search
          </label>
          <input
            id="machine-search"
            className="field"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search moulding, enrobing, gummy..."
            type="search"
          />
        </div>
        <div>
          <label htmlFor="filter-category" className="mb-1 block text-sm font-medium">
            Category
          </label>
          <select id="filter-category" className="field" value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">All categories</option>
            {presentCategories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filter-type" className="mb-1 block text-sm font-medium">
            Product type
          </label>
          <select id="filter-type" className="field" value={productType} onChange={(event) => setProductType(event.target.value)}>
            <option value="all">All products</option>
            {productTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filter-capacity" className="mb-1 block text-sm font-medium">
            Capacity
          </label>
          <select id="filter-capacity" className="field" value={capacity} onChange={(event) => setCapacity(event.target.value)}>
            <option value="all">Any rating</option>
            <option value="lt500">Under 500 kg/h</option>
            <option value="mid">500–1,000 kg/h</option>
            <option value="gt1000">Over 1,000 kg/h</option>
            <option value="other">Pieces, belt speed, or batch</option>
          </select>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-3 xl:col-span-5">
          <label className="text-sm font-medium">
            Sort
            <select className="field ml-2 w-auto" value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="name">Name</option>
              <option value="capacity">Highest kg/h</option>
            </select>
          </label>
          <p className="whitespace-nowrap text-sm text-cocoa" aria-live="polite">
            {results.length} machine{results.length === 1 ? "" : "s"}
          </p>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => {
              setQuery("");
              setCategory("all");
              setProductType("all");
              setCapacity("all");
              setSort("featured");
            }}
          >
            Clear filters
          </button>
        </div>
      </form>

      {results.length === 0 ? (
        <p className="card mt-8 p-8 text-center text-cocoa">No machines match those filters. Clear them or try a broader product type.</p>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((machine) => (
            <li key={machine.slug}>
              <MachineCard machine={machine} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
