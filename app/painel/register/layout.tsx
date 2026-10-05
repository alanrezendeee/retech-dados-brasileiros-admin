import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criar Conta Grátis - RetechHub API | 100 Requests/Dia',
  description: 'Crie sua conta gratuita no RetechHub API e ganhe 100 requests/dia sem cartão de crédito. Acesso imediato a CEP, CNPJ e Geografia do Brasil.',
  openGraph: {
    title: 'Criar Conta Grátis - RetechHub API',
    description: '100 requests/dia grátis • Sem cartão de crédito • APIs de CEP, CNPJ e Geografia',
  },
  alternates: {
    canonical: 'https://core.theretech.com.br/painel/register',
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

