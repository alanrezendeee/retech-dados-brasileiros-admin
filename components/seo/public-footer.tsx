import Link from 'next/link';
import { PUBLIC_NAV } from './public-header';

// Footer com links para todas as áreas públicas: distribui autoridade interna e dá ao crawler
// um caminho para cada hub (APIs, ferramentas, conteúdo programático, blog).
export default function PublicFooter() {
  const groups: { title: string; links: { label: string; href: string }[] }[] = [
    { title: 'APIs', links: PUBLIC_NAV.apis },
    { title: 'Ferramentas grátis', links: PUBLIC_NAV.ferramentas },
    { title: 'Conteúdo', links: PUBLIC_NAV.conteudo },
    { title: 'RetechHub', links: PUBLIC_NAV.institucional },
  ];
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-white/10">
      <div className="container max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-1">
            <p className="text-white font-bold text-lg mb-3">
              Retech<span className="text-emerald-400">Hub</span>
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              APIs de dados públicos brasileiros: CEP, CNPJ, geografia e artigos penais. Textos oficiais, cache
              inteligente e plano gratuito.
            </p>
            <p className="text-xs text-slate-500 mt-4">
              by{' '}
              <a href="https://theretech.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                The Retech
              </a>{' '}
              · CNPJ 54.802.231/0001-48
            </p>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">{g.title}</h4>
              <ul className="space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} The Retech LTDA. Todos os direitos reservados.</p>
          <p className="flex gap-4">
            <Link href="/legal/termos" className="hover:text-white">
              Termos de uso
            </Link>
            <Link href="/legal/privacidade" className="hover:text-white">
              Privacidade
            </Link>
            <Link href="/status" className="hover:text-white">
              Status
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
