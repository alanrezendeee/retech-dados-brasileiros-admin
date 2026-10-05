// Injeta um ou mais objetos schema.org como <script type="application/ld+json">.
// Server component: funciona em qualquer página (client ou server) desde que importado de um server component.
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify escapa "<" para evitar fechamento prematuro do script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  );
}
