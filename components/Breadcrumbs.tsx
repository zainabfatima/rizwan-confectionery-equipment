import Link from "next/link";

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-cocoa">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link href={item.href} className="underline decoration-caramel/50 underline-offset-2 hover:text-chocolate">
                  {item.name}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined}>{item.name}</span>
              )}
              {last ? null : <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
