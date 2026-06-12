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
    default: 'Retech Core - APIs Brasileiras | CEP, CNPJ, Geografia',
    template: '%s | Retech Core API'
  },
  description: 'A API definitiva de dados brasileiros. Consulte CEP, CNPJ, CPF, dados geográficos e mais em uma única integração. Gratuito para começar. Respostas em <100ms.',
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
    title: 'Retech Core - 30+ APIs Brasileiras em uma só',
    description: 'CEP, CNPJ, CPF, Geografia e mais. Gratuito para começar. Respostas em <100ms.',
    siteName: 'Retech Core API',
    images: [
      {
        url: 'https://core.theretech.com.br/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Retech Core API - 30+ APIs Brasileiras',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retech Core - APIs Brasileiras',
    description: '30+ APIs de dados brasileiros em uma integração. Gratuito para começar.',
    images: ['https://core.theretech.com.br/twitter-card.png'],
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
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://core.theretech.com.br',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Retech Core API",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "API definitiva de dados brasileiros: CEP, CNPJ, CPF, Geografia e mais",
    "url": "https://core.theretech.com.br",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL",
      "description": "Plano gratuito com 100 requests/dia"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "creator": {
      "@type": "Organization",
      "name": "The Retech",
      "url": "https://theretech.com.br"
    },
    "featureList": [
      "Consulta de CEP",
      "Validação de CNPJ",
      "Validação de CPF",
      "Dados Geográficos IBGE",
      "30+ APIs Brasileiras",
      "Cache Inteligente",
      "Resposta em <100ms"
    ]
  };

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
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
