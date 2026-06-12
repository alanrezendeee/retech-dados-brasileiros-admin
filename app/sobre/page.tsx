import Link from 'next/link';
import LandingNavbar from '@/components/landing/navbar';
import LandingFooter from '@/components/landing/footer';

export default function SobrePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a', color: '#fff' }}>
      <LandingNavbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,230,118,0.07) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: '#00e676' }}
          >
            Sobre nós
          </span>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 text-white">
            Retech<span style={{ color: '#00e676' }}>Hub</span>
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Democratizando o acesso a dados públicos brasileiros através de APIs
            de alta performance — um produto da{' '}
            <a
              href="https://theretech.com.br"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#00e676' }}
            >
              The Retech
            </a>
            .
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        {/* História */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-white mb-6 text-center">
            Nossa <span style={{ color: '#00e676' }}>história</span>
          </h2>
          <div
            className="rounded-2xl border p-8"
            style={{
              backgroundColor: '#0d0d0d',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <p className="text-lg text-white/60 leading-relaxed mb-4">
              O <strong className="text-white">RetechHub</strong> nasceu da
              frustração de desenvolvedores brasileiros que precisavam integrar
              dados públicos em seus sistemas. APIs fragmentadas, instáveis,
              lentas ou inexistentes tornavam o trabalho muito mais difícil do
              que deveria ser.
            </p>
            <p className="text-lg text-white/60 leading-relaxed mb-4">
              Criado por <strong className="text-white">Alan Rezende</strong>,
              arquiteto e engenheiro de software, o RetechHub tem uma missão
              clara:{' '}
              <strong className="text-white">
                centralizar e modernizar o acesso a dados públicos brasileiros
              </strong>
              .
            </p>
            <p className="text-lg text-white/60 leading-relaxed">
              Sediados em{' '}
              <strong className="text-white">Florianópolis, Santa Catarina</strong>,
              desenvolvemos soluções de alta performance que combinam cache
              inteligente, fallback automático e múltiplas fontes de dados para
              garantir confiabilidade e velocidade.
            </p>
          </div>
        </div>

        {/* Fundador */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-white mb-6 text-center">
            Fundador <span style={{ color: '#00e676' }}>& CEO</span>
          </h2>
          <div
            className="rounded-2xl border p-8 max-w-3xl mx-auto"
            style={{
              backgroundColor: '#0d0d0d',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <div className="flex items-start gap-6">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0"
                style={{ backgroundColor: 'rgba(0,230,118,0.1)', color: '#00e676' }}
              >
                AR
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  Alan Rezende
                </h3>
                <p className="text-sm mb-4" style={{ color: '#00e676' }}>
                  Fundador & CEO — The Retech
                </p>
                <p className="text-white/50 leading-relaxed mb-4">
                  Engenheiro de software e arquiteto de sistemas com mais de 10
                  anos de experiência. Especializado em sistemas distribuídos,
                  automação com IA e produtos SaaS escaláveis.
                </p>
                <ul className="space-y-2 text-sm text-white/40">
                  {[
                    '10+ anos de experiência em engenharia de software',
                    'Especialista em arquitetura de sistemas distribuídos',
                    'Criador de 4+ produtos SaaS em produção',
                    'Florianópolis, SC — Brasil',
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span style={{ color: '#00e676' }}>✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Missão, Visão, Valores */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-white mb-6 text-center">
            Missão & <span style={{ color: '#00e676' }}>valores</span>
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-px rounded-2xl overflow-hidden"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
          >
            {[
              {
                icon: '🎯',
                title: 'Missão',
                body: 'Centralizar e modernizar o acesso a dados públicos brasileiros, entregando APIs de alta performance que genuinamente resolvem o problema de integradores.',
              },
              {
                icon: '🔭',
                title: 'Visão',
                body: 'Ser a principal plataforma de dados públicos do Brasil — tão confiável quanto Stripe é para pagamentos, mas para dados governamentais.',
              },
              {
                icon: '⚡',
                title: 'Valores',
                body: 'Arquitetura antes de código. Performance não é opcional. Documentação é parte do produto. Confiabilidade acima de tudo.',
              },
            ].map((v) => (
              <div
                key={v.title}
                className="p-8 text-center"
                style={{ backgroundColor: '#0d0d0d' }}
              >
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ color: '#00e676' }}
                >
                  {v.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The Retech */}
        <div
          className="rounded-2xl border p-8 text-center"
          style={{
            backgroundColor: 'rgba(0,230,118,0.04)',
            borderColor: 'rgba(0,230,118,0.15)',
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#00e676' }}
          >
            Família de produtos
          </p>
          <h3 className="text-2xl font-bold text-white mb-3">
            Um produto da The Retech
          </h3>
          <p className="text-white/40 max-w-xl mx-auto mb-6">
            O RetechHub faz parte do portfólio de produtos SaaS da The Retech —
            empresa especializada em software sob medida, IA e automação.
          </p>
          <a
            href="https://theretech.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-semibold px-6 py-3 rounded-xl transition-all"
            style={{ backgroundColor: '#00e676', color: '#0a0a0a' }}
          >
            Conhecer a The Retech ↗
          </a>
        </div>
      </div>

      <LandingFooter />
    </div>
  );
}
