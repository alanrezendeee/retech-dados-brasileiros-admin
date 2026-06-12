import Link from 'next/link';
import Image from 'next/image';

const productLinks = [
  { label: 'APIs disponíveis', href: '/#apis' },
  { label: 'Preços', href: '/precos' },
  { label: 'Documentação', href: '/painel/docs' },
  { label: 'Status', href: '/status' },
  { label: 'Playground', href: '/playground' },
];

const companyLinks = [
  { label: 'Sobre nós', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
  { label: 'The Retech', href: 'https://theretech.com.br', external: true },
];

const legalLinks = [
  { label: 'Termos de Uso', href: '/legal/termos' },
  { label: 'Privacidade', href: '/legal/privacidade' },
];

export default function LandingFooter() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image
                src="/logo-retechhub.svg"
                alt="RetechHub"
                width={32}
                height={32}
              />
              <span className="text-white font-bold text-lg tracking-tight">
                Retech<span style={{ color: '#00e676' }}>Hub</span>
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed">
              APIs de dados públicos brasileiros de alta performance para
              desenvolvedores que precisam ir além do básico.
            </p>
            <p className="text-xs text-white/25 mt-4">
              by{' '}
              <a
                href="https://theretech.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/60 transition-colors"
              >
                The Retech
              </a>
            </p>
            <p className="text-xs text-white/20 mt-1">
              CNPJ: 54.802.231/0001-48
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Produto
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Empresa
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  {'external' in l && l.external ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {l.label} ↗
                    </a>
                  ) : (
                    <Link
                      href={l.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + CTA */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 mb-6">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/painel/register"
              className="inline-block text-sm font-semibold px-4 py-2 rounded-lg transition-all"
              style={{ backgroundColor: '#00e676', color: '#0a0a0a' }}
            >
              Começar Grátis →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/25">
          <p>© {new Date().getFullYear()} The Retech LTDA. Todos os direitos reservados.</p>
          <p>
            Criado por{' '}
            <strong className="text-white/40">Alan Rezende</strong> —
            Florianópolis, SC
          </p>
        </div>
      </div>
    </footer>
  );
}
