import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Status da API - Monitoramento em Tempo Real | 99.9% Uptime',
  description: 'Acompanhe o status em tempo real das APIs do RetechHub. Uptime: 99.9% | Latência média: ~160ms | Histórico de incidentes e manutenções programadas.',
  keywords: [
    'status api',
    'uptime api',
    'monitoramento api',
    'api disponivel',
    'incidentes api'
  ],
  openGraph: {
    title: 'Status da API - RetechHub',
    description: 'Monitoramento em tempo real | 99.9% Uptime | ~160ms latência',
    type: 'website',
  },
  alternates: {
    canonical: 'https://core.theretech.com.br/status',
  },
};

export default function StatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}





