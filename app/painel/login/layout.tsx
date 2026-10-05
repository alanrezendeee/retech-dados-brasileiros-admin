import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - Portal do Desenvolvedor | RetechHub API',
  description: 'Faça login no portal do desenvolvedor para gerenciar suas API Keys, visualizar estatísticas de uso e acessar a documentação completa do RetechHub API.',
  openGraph: {
    title: 'Login - Portal do Desenvolvedor | RetechHub API',
    description: 'Acesse sua conta de desenvolvedor no RetechHub API',
  },
  alternates: {
    canonical: 'https://core.theretech.com.br/painel/login',
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

