import Link from 'next/link';
import type { ReactNode } from 'react';

// Blocos reutilizados pelos corpos dos posts. Tudo server component, sem estado.

// Wrapper tipográfico do artigo (não usamos @tailwindcss/typography).
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className={[
        'text-slate-700 leading-relaxed text-[17px]',
        '[&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:scroll-mt-24',
        '[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-slate-900 [&_h3]:mt-8 [&_h3]:mb-3',
        '[&_p]:my-4',
        '[&_ul]:my-4 [&_ul]:pl-6 [&_ul]:list-disc [&_ul>li]:my-1.5',
        '[&_ol]:my-4 [&_ol]:pl-6 [&_ol]:list-decimal [&_ol>li]:my-1.5',
        '[&_a]:text-emerald-700 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-emerald-900',
        '[&_strong]:text-slate-900',
        '[&_code]:font-mono [&_code]:text-[0.9em]',
        '[&_:not(pre)>code]:bg-slate-100 [&_:not(pre)>code]:text-slate-800 [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:rounded',
        '[&_table]:my-6 [&_table]:w-full [&_table]:text-sm [&_table]:border-collapse',
        '[&_th]:text-left [&_th]:bg-slate-50 [&_th]:font-semibold [&_th]:text-slate-900 [&_th]:border [&_th]:border-slate-200 [&_th]:px-3 [&_th]:py-2',
        '[&_td]:border [&_td]:border-slate-200 [&_td]:px-3 [&_td]:py-2 [&_td]:align-top',
        '[&_blockquote]:border-l-4 [&_blockquote]:border-emerald-500 [&_blockquote]:pl-4 [&_blockquote]:my-6 [&_blockquote]:text-slate-600 [&_blockquote]:italic',
      ].join(' ')}
    >
      {children}
    </div>
  );
}

// Bloco de código. `lang` vira className="language-xxx" no <code> (padrão Prism/hljs).
export function Code({ lang, children, title }: { lang: string; children: string; title?: string }) {
  return (
    <figure className="my-6">
      {title && (
        <figcaption className="text-xs font-mono text-slate-500 bg-slate-800 border-b border-slate-700 rounded-t-lg px-4 py-2">
          {title}
        </figcaption>
      )}
      <pre className={`bg-slate-900 text-slate-100 text-[13.5px] leading-relaxed p-4 overflow-x-auto ${title ? 'rounded-b-lg' : 'rounded-lg'}`}>
        <code className={`language-${lang}`}>{children}</code>
      </pre>
    </figure>
  );
}

// Caixa de destaque (dica, atenção, nota).
export function Callout({ title, children, tone = 'info' }: { title?: string; children: ReactNode; tone?: 'info' | 'warn' | 'tip' }) {
  const tones = {
    info: 'border-sky-200 bg-sky-50 text-sky-950',
    warn: 'border-amber-200 bg-amber-50 text-amber-950',
    tip: 'border-emerald-200 bg-emerald-50 text-emerald-950',
  };
  return (
    <aside className={`my-6 rounded-xl border px-5 py-4 text-[15px] ${tones[tone]} [&_p]:my-1.5 [&_a]:text-current [&_a]:font-medium`}>
      {title && <p className="font-semibold">{title}</p>}
      {children}
    </aside>
  );
}

// Tabela responsiva com scroll horizontal.
export function TableWrap({ children, caption }: { children: ReactNode; caption?: string }) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-slate-200">
      <table className="!my-0 !border-0 min-w-[560px]">
        {caption && <caption className="text-left text-xs text-slate-500 px-3 py-2 bg-slate-50 border-b border-slate-200">{caption}</caption>}
        {children}
      </table>
    </div>
  );
}

// Link para a página de um dispositivo do Código Penal.
export function ArtigoLink({ numero, children }: { numero: string; children?: ReactNode }) {
  const slug = `cp-${numero.toLowerCase()}`;
  return <Link href={`/penal/artigo/${slug}`}>{children ?? `art. ${numero} do CP`}</Link>;
}
