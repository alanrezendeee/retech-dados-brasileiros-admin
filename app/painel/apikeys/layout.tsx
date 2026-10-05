import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Minhas API Keys - Portal do Desenvolvedor | RetechHub',
  description: 'Gerencie suas chaves de API, crie novas, rotacione ou revogue existentes. Controle completo de autenticação.',
  alternates: {
    canonical: 'https://core.theretech.com.br/painel/apikeys',
  },
};

export default function APIKeysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

