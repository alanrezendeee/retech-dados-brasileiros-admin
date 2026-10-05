import Link from 'next/link';
import JsonLd from './json-ld';
import { absoluteUrl } from '@/lib/seo/site';

export interface Crumb {
  label: string;
  href?: string; // último item sem href = página atual
}

// Breadcrumb visível + JSON-LD BreadcrumbList. Sempre inclui "Início" como primeiro item.
export default function Breadcrumb({ items, className = '' }: { items: Crumb[]; className?: string }) {
  const all: Crumb[] = [{ label: 'Início', href: '/' }, ...items];
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: absoluteUrl(c.href) } : {}),
    })),
  };
  return (
    <>
      <JsonLd data={ld} />
      <nav aria-label="Breadcrumb" className={`text-sm text-slate-500 ${className}`}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {c.href && i < all.length - 1 ? (
                <Link href={c.href} className="hover:text-slate-900 hover:underline">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-slate-700 font-medium">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
