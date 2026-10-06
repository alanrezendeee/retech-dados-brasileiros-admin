import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portal do Desenvolvedor - RetechHub',
  description: 'Gerencie suas API Keys e monitore o uso',
};

export default function PainelRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

