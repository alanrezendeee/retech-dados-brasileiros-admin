import Link from 'next/link';
import LandingNavbar from '@/components/landing/navbar';
import LandingFooter from '@/components/landing/footer';
import FAQSchema from '@/app/components/schemas/FAQSchema';
import BreadcrumbSchema from '@/app/components/schemas/BreadcrumbSchema';
import PricingPlans from '@/components/pricing/PricingPlans';

const faqs = [
  {
    question: 'Posso mudar de plano a qualquer momento?',
    answer:
      'Sim! Você pode fazer upgrade ou downgrade a qualquer momento. O valor é cobrado proporcionalmente ao tempo de uso.',
  },
  {
    question: 'O que acontece se eu exceder o limite de requests?',
    answer:
      'No plano Free, requests adicionais são bloqueadas até o dia seguinte. Nos planos pagos, você pode configurar limites maiores ou pagar por excedente (R$ 0,001 por request adicional).',
  },
  {
    question: 'Quais as formas de pagamento?',
    answer:
      'Aceitamos cartão de crédito, boleto e Pix. Pagamento mensal ou anual com 10% de desconto.',
  },
  {
    question: 'Tem contrato de fidelidade?',
    answer:
      'Não! Você pode cancelar a qualquer momento. Sem multas ou taxas de cancelamento.',
  },
];

const breadcrumbs = [
  { name: 'Home', url: 'https://core.theretech.com.br' },
  { name: 'Preços', url: 'https://core.theretech.com.br/precos' },
];

const statusItems = [
  { label: 'API CEP', ok: true },
  { label: 'API CNPJ', ok: true },
  { label: 'API Geografia', ok: true },
  { label: 'API Penal', ok: true },
  { label: 'Redis Cache', ok: true },
  { label: 'MongoDB', ok: true },
];

export default function PrecosPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: '#0a0a0a', color: '#fff' }}
    >
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={breadcrumbs} />

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
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: '#00e676' }}
          >
            Planos & Preços
          </span>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 text-white">
            Comece de graça.{' '}
            <span style={{ color: '#00e676' }}>Escale quando precisar.</span>
          </h1>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Sem cartão de crédito. Sem contratos. Sem surpresas. 100
            requests/dia grátis para sempre.
          </p>
        </div>
      </section>

      {/* Planos */}
      <section className="pb-24 px-4 sm:px-6">
        <PricingPlans variant="page" />
      </section>

      {/* Status */}
      <section className="py-20" style={{ backgroundColor: '#0d0d0d' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-white text-center mb-12">
            Status da <span style={{ color: '#00e676' }}>Plataforma</span>
          </h2>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-px rounded-2xl overflow-hidden mb-8"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
          >
            {[
              { value: '99.9%', label: 'Uptime (30d)' },
              { value: '~160ms', label: 'Latência Média' },
              { value: '4 APIs', label: 'Disponíveis' },
            ].map((s) => (
              <div
                key={s.label}
                className="py-7 text-center"
                style={{ backgroundColor: '#111' }}
              >
                <div
                  className="text-2xl font-black mb-1"
                  style={{ color: '#00e676' }}
                >
                  {s.value}
                </div>
                <div className="text-xs text-white/40">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Status list */}
          <div
            className="rounded-2xl border p-6"
            style={{
              backgroundColor: '#111',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: '#00e676' }}
              />
              <span className="text-sm font-semibold text-white">
                Todos os sistemas operacionais
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {statusItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  <span style={{ color: '#00e676' }}>✓</span>
                  {item.label}
                </div>
              ))}
            </div>
            <p className="text-xs text-white/25 mt-5">
              Última atualização: {new Date().toLocaleString('pt-BR')}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-white text-center mb-12">
            Perguntas <span style={{ color: '#00e676' }}>Frequentes</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border p-6"
                style={{
                  backgroundColor: '#0d0d0d',
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                <h3 className="text-base font-bold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ backgroundColor: '#0d0d0d' }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,230,118,0.07) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Pronto para <span style={{ color: '#00e676' }}>começar?</span>
          </h2>
          <p className="text-white/40 mb-8">
            Crie sua conta grátis e comece a integrar em minutos.
          </p>
          <Link
            href="/painel/register"
            className="inline-block text-base font-bold px-10 py-4 rounded-xl transition-all"
            style={{ backgroundColor: '#00e676', color: '#0a0a0a' }}
          >
            Criar Conta Grátis
          </Link>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
