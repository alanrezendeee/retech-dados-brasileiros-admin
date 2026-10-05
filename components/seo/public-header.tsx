import Link from 'next/link';
import Image from 'next/image';

// Header claro para páginas públicas (landings de API, ferramentas, blog, páginas programáticas).
// Server component sem estado: todos os links ficam no HTML para o crawler.
export const PUBLIC_NAV = {
  apis: [
    { label: 'API de CEP', href: '/apis/cep' },
    { label: 'API de Artigos Penais', href: '/apis/penal' },
  ],
  ferramentas: [
    { label: 'Consultar CEP', href: '/ferramentas/consultar-cep' },
    { label: 'Buscar CEP por endereço', href: '/ferramentas/buscar-cep' },
    { label: 'Validar CNPJ', href: '/ferramentas/validar-cnpj' },
    { label: 'Consultar artigo penal', href: '/ferramentas/penal' },
  ],
  conteudo: [
    { label: 'Código Penal por artigo', href: '/penal/artigos' },
    { label: 'CEPs por estado', href: '/cep' },
    { label: 'Blog', href: '/blog' },
    { label: 'Documentação', href: '/docs' },
  ],
  institucional: [
    { label: 'Preços', href: '/precos' },
    { label: 'Playground', href: '/playground' },
    { label: 'Status', href: '/status' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Contato', href: '/contato' },
  ],
};

const topLinks = [
  { label: 'APIs', href: '/#apis' },
  { label: 'Artigos Penais', href: '/apis/penal' },
  { label: 'CEP', href: '/apis/cep' },
  { label: 'Ferramentas', href: '/ferramentas/consultar-cep' },
  { label: 'Blog', href: '/blog' },
  { label: 'Docs', href: '/docs' },
  { label: 'Preços', href: '/precos' },
];

export default function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="RetechHub - página inicial">
          <Image src="/logo-retechhub.svg" alt="RetechHub" width={32} height={32} />
          <span className="font-bold text-lg tracking-tight text-slate-900">
            Retech<span className="text-emerald-600">Hub</span>
          </span>
        </Link>
        <nav aria-label="Principal" className="hidden md:flex items-center gap-1">
          {topLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/painel/login" className="hidden sm:inline text-sm text-slate-600 hover:text-slate-900">
            Entrar
          </Link>
          <Link
            href="/painel/register"
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-emerald-500 text-slate-900 hover:bg-emerald-400 transition-colors"
          >
            Começar grátis
          </Link>
        </div>
      </div>
      {/* Navegação secundária (mobile) – links no HTML, sem JS */}
      <nav aria-label="Seções" className="md:hidden border-t border-slate-100 overflow-x-auto">
        <ul className="flex gap-4 px-4 py-2 text-sm whitespace-nowrap">
          {topLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-slate-600 hover:text-slate-900">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
