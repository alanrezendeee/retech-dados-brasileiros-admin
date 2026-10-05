import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://core.theretech.com.br'),
  title: {
    default: 'RetechHub - APIs Brasileiras | CEP, CNPJ, Artigos Penais, Geografia',
    template: '%s | RetechHub'
  },
  description: 'APIs de dados públicos brasileiros em uma integração: CEP com fallback automático, CNPJ, geografia IBGE e Código Penal completo (2.438 dispositivos). Grátis para começar.',
  keywords: [
    'api brasil',
    'api cep',
    'api cnpj',
    'api cpf',
    'api geografia',
    'dados brasileiros',
    'viacep alternativa',
    'brasil api',
    'api gratuita',
    'api ibge',
    'consultar cep',
    'validar cnpj',
    'api receita federal',
    'dados publicos brasil'
  ],
  authors: [{ name: 'The Retech', url: 'https://theretech.com.br' }],
  creator: 'The Retech',
  publisher: 'The Retech',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://core.theretech.com.br',
    title: 'RetechHub - 30+ APIs Brasileiras em uma só',
    description: 'CEP, CNPJ, CPF, Geografia e mais. Gratuito para começar. Respostas em <100ms.',
    siteName: 'RetechHub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RetechHub - APIs Brasileiras',
    description: '30+ APIs de dados brasileiros em uma integração. Gratuito para começar.',
    creator: '@theretech',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '0Odx0AYoSmLkNUPdhi3hdq_v8r2CzNcpMlUuf0Kaac0',
  },
  // canonical NÃO é definido aqui: cada página define o seu em seu layout/page.
  // (um canonical global faria todas as páginas apontarem para a home)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD global: Organization + WebSite (com SearchAction). Sem aggregateRating:
  // avaliações só entram no schema quando existirem avaliações reais e verificáveis.
  const schemaOrg = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://core.theretech.com.br/#organization",
      "name": "The Retech",
      "legalName": "The Retech LTDA",
      "url": "https://theretech.com.br",
      "logo": "https://core.theretech.com.br/logo.png",
      "email": "suporte@theretech.com.br",
      "address": { "@type": "PostalAddress", "addressLocality": "Florianópolis", "addressRegion": "SC", "addressCountry": "BR" },
      "sameAs": ["https://theretech.com.br"]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://core.theretech.com.br/#website",
      "url": "https://core.theretech.com.br",
      "name": "RetechHub",
      "description": "APIs de dados públicos brasileiros: CEP, CNPJ, geografia e artigos penais.",
      "inLanguage": "pt-BR",
      "publisher": { "@id": "https://core.theretech.com.br/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": { "@type": "EntryPoint", "urlTemplate": "https://core.theretech.com.br/cep/consulta?cep={cep}" },
        "query-input": "required name=cep"
      }
    }
  ];

  return (
    <html lang="pt-BR">
      <head>
        {schemaOrg.map((item, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, '\\u003c') }}
          />
        ))}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D858LKG5N9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D858LKG5N9', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        
        {children}
        <Toaster />
      </body>
    </html>
  );
}
