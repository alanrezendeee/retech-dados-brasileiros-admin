import { ImageResponse } from 'next/og';

// Gera imagens Open Graph (1200x630) por código, eliminando os PNGs ausentes (404) que
// quebravam previews no WhatsApp/LinkedIn/Twitter. Uso em `opengraph-image.tsx`:
//   export default function Image() { return ogImage({ title, subtitle, badge }); }
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

export interface OgProps {
  title: string;
  subtitle?: string;
  badge?: string;
  accent?: string; // cor de destaque (hex)
}

export function ogImage({ title, subtitle, badge, accent = '#00e676' }: OgProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 60%, #0f172a 100%)',
          color: '#ffffff',
          fontFamily: 'Inter, Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0a0a0a',
              fontWeight: 800,
              fontSize: 26,
            }}
          >
            R
          </div>
          <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>
            Retech<span style={{ color: accent }}>Hub</span>
          </div>
          {badge ? (
            <div
              style={{
                marginLeft: 18,
                padding: '6px 16px',
                borderRadius: 999,
                border: `2px solid ${accent}`,
                color: accent,
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              {badge}
            </div>
          ) : null}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', fontSize: title.length > 60 ? 52 : 64, fontWeight: 800, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1040 }}>
            {title}
          </div>
          {subtitle ? (
            <div style={{ display: 'flex', fontSize: 30, color: 'rgba(255,255,255,0.72)', lineHeight: 1.3, maxWidth: 1000 }}>{subtitle}</div>
          ) : null}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: 'rgba(255,255,255,0.55)' }}>
          <div style={{ display: 'flex' }}>core.theretech.com.br</div>
          <div style={{ display: 'flex' }}>APIs de dados públicos brasileiros</div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
