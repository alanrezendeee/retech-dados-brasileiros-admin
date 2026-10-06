import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - RetechHub',
  description: 'Painel administrativo RetechHub API',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

