import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-serif text-4xl text-chocolate">That page is not in the catalog</h1>
      <p className="mt-4 text-charcoal/80">The machine or category may have moved. Start from the catalog.</p>
      <Link href="/machines" className="btn btn-primary mt-6">
        Browse machines
      </Link>
    </div>
  );
}
