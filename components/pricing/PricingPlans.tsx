import Link from 'next/link';
import { plans, enterprisePlan } from '@/lib/data/plans';

interface PricingPlansProps {
  variant?: 'landing' | 'page';
}

export default function PricingPlans({ variant = 'landing' }: PricingPlansProps) {
  const isPage = variant === 'page';

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan) => {
          const isFeatured = !!plan.featured;

          const cardStyle: React.CSSProperties = {
            backgroundColor: isPage
              ? '#0d0d0d'
              : isFeatured
              ? 'rgba(0,230,118,0.06)'
              : '#111',
            border: isFeatured
              ? '1px solid rgba(0,230,118,0.3)'
              : '1px solid rgba(255,255,255,0.08)',
            borderRadius: '1rem',
            padding: '1.75rem',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            transition: 'border-color 0.2s',
          };

          return (
            <div key={plan.id} style={cardStyle}>
              {/* Badge */}
              {plan.badge && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full"
                  style={
                    plan.badgeHighlight
                      ? { backgroundColor: '#00e676', color: '#0a0a0a' }
                      : {
                          backgroundColor: '#1a1a1a',
                          color: 'rgba(255,255,255,0.5)',
                          border: '1px solid rgba(255,255,255,0.12)',
                        }
                  }
                >
                  {plan.badge.text}
                </span>
              )}

              {/* Header */}
              <div className="mb-5">
                <h3
                  className="text-lg font-bold mb-1"
                  style={{ color: isFeatured ? '#00e676' : '#fff' }}
                >
                  {plan.name}
                </h3>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {plan.description}
                </p>
                <div className="mt-4">
                  <span className="text-3xl font-black text-white">{plan.price}</span>
                  <span
                    className="text-sm ml-1"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    {plan.priceLabel}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div
                className="mb-5"
                style={{
                  height: '1px',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                }}
              />

              {/* Features */}
              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <span
                      className="shrink-0 mt-0.5"
                      style={{ color: isFeatured ? '#00e676' : 'rgba(255,255,255,0.4)' }}
                    >
                      ✓
                    </span>
                    <span
                      style={{
                        color: f.highlight ? '#fff' : 'rgba(255,255,255,0.5)',
                        fontWeight: f.highlight ? 600 : 400,
                      }}
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.buttonHref}
                className="block w-full text-center text-sm font-bold py-3 rounded-xl transition-all mt-auto"
                style={
                  isFeatured
                    ? { backgroundColor: '#00e676', color: '#0a0a0a' }
                    : {
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: 'rgba(255,255,255,0.7)',
                      }
                }
              >
                {plan.buttonText}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Enterprise — sob medida */}
      <div
        className="mt-4 rounded-2xl border p-7 flex flex-col lg:flex-row lg:items-center gap-6"
        style={{
          backgroundColor: isPage ? '#0d0d0d' : '#111',
          borderColor: 'rgba(255,255,255,0.12)',
        }}
      >
        <div className="lg:max-w-xs">
          <h3 className="text-lg font-bold text-white mb-1">
            {enterprisePlan.name}
          </h3>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {enterprisePlan.description}
          </p>
          <div className="mt-3">
            <span className="text-2xl font-black text-white">Sob medida</span>
          </div>
        </div>

        <ul className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
          {enterprisePlan.features.map((text) => (
            <li key={text} className="flex items-start gap-2.5 text-sm">
              <span
                className="shrink-0 mt-0.5"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                ✓
              </span>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>{text}</span>
            </li>
          ))}
        </ul>

        <Link
          href={enterprisePlan.buttonHref}
          className="shrink-0 text-center text-sm font-bold px-8 py-3 rounded-xl transition-all"
          style={{
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          {enterprisePlan.buttonText}
        </Link>
      </div>
    </div>
  );
}
