'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Globe2, 
  CheckCircle2, 
  XCircle,
  Clock,
  Database,
  Code2,
  HelpCircle
} from 'lucide-react';
import BreadcrumbSchema from '@/app/components/schemas/BreadcrumbSchema';

export default function APICEPPage() {
  // API Base URL da env
  const apiBaseURL = process.env.NEXT_PUBLIC_API_URL || 'https://api-core.theretech.com.br';

  // Breadcrumbs para schema SEO
  const breadcrumbs = [
    { name: "Home", url: "https://core.theretech.com.br" },
    { name: "APIs", url: "https://core.theretech.com.br/apis" },
    { name: "API de CEP", url: "https://core.theretech.com.br/apis/cep" }
  ];

  const codeExamples = {
    javascript: `// Node.js / JavaScript
const axios = require('axios');

const response = await axios.get(
  '${apiBaseURL}/cep/01310100',
  {
    headers: {
      'X-API-Key': 'rtc_sua_chave_aqui'
    }
  }
);

console.log(response.data);
// {
//   "cep": "01310-100",
//   "logradouro": "Avenida Paulista",
//   "bairro": "Bela Vista",
//   "localidade": "São Paulo",
//   "uf": "SP",
//   "ddd": "11",
//   "source": "cache"
// }`,
    python: `# Python
import requests

response = requests.get(
    '${apiBaseURL}/cep/01310100',
    headers={'X-API-Key': 'rtc_sua_chave_aqui'}
)

data = response.json()
print(f"Endereço: {data['logradouro']}, {data['bairro']}")
print(f"Cidade: {data['localidade']} - {data['uf']}")`,
    php: `<?php
// PHP
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${apiBaseURL}/cep/01310100');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'X-API-Key: rtc_sua_chave_aqui'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$data = json_decode($response, true);

curl_close($ch);

echo "CEP: " . $data['cep'];
echo "Logradouro: " . $data['logradouro'];
?>`,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Schema SEO */}
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-500/30 text-white border-blue-400">
            ✨ Mais rápida que ViaCEP
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            API de CEP Gratuita
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Consulte endereços brasileiros com <strong>cache inteligente em 3 camadas</strong>, 
            múltiplas fontes e resposta de <strong>~1ms a ~160ms</strong>
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" variant="secondary">
              <Link href="/playground">
                Testar Agora Grátis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
              <Link href="/painel/register">
                Criar Conta (100 requests/dia)
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold">~160ms</div>
              <div className="text-sm text-blue-200">média total</div>
            </div>
            <div>
              <div className="text-3xl font-bold">3 fontes</div>
              <div className="text-sm text-blue-200">ViaCEP + Brasil API</div>
            </div>
            <div>
              <div className="text-3xl font-bold">99.9%</div>
              <div className="text-sm text-blue-200">uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold">Grátis</div>
              <div className="text-sm text-blue-200">100 req/dia</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Por que usar nossa API de CEP?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Zap className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle>Ultra-Rápido</CardTitle>
                <CardDescription>Respostas em ~160ms com cache Redis em 3 camadas</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Cache compartilhado (7 dias)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>MongoDB otimizado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Go backend (performance nativa)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle>Alta Disponibilidade</CardTitle>
                <CardDescription>Múltiplas fontes com fallback automático</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>ViaCEP (fonte principal)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Brasil API (fallback)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>99.9% uptime garantido</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Globe2 className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>Fácil Integração</CardTitle>
                <CardDescription>REST API simples e bem documentada</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Exemplos em JS, Python, PHP</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Playground interativo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Documentação completa</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Code2 className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Exemplos de Código</h2>
            <p className="text-slate-600">Copie e cole no seu projeto. Funciona em segundos.</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="javascript">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="php">PHP</TabsTrigger>
                </TabsList>

                {Object.entries(codeExamples).map(([lang, code]) => (
                  <TabsContent key={lang} value={lang}>
                    <pre className="bg-slate-900 text-slate-100 p-6 rounded-lg overflow-auto text-sm font-mono">
                      {code}
                    </pre>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Comparação com Concorrentes</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="p-4 text-left">Recurso</th>
                  <th className="p-4 text-center">Retech Core</th>
                  <th className="p-4 text-center">ViaCEP</th>
                  <th className="p-4 text-center">Brasil API</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Tempo de Resposta</td>
                  <td className="p-4 text-center">
                    <Badge className="bg-green-100 text-green-800">~160ms (médio)</Badge>
                  </td>
                  <td className="p-4 text-center">~200ms</td>
                  <td className="p-4 text-center">~300ms+</td>
                </tr>
                <tr className="border-b bg-slate-50">
                  <td className="p-4 font-semibold">Cache Inteligente</td>
                  <td className="p-4 text-center"><CheckCircle2 className="w-6 h-6 text-green-600 mx-auto" /></td>
                  <td className="p-4 text-center"><XCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
                  <td className="p-4 text-center"><XCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Fallback Automático</td>
                  <td className="p-4 text-center"><CheckCircle2 className="w-6 h-6 text-green-600 mx-auto" /></td>
                  <td className="p-4 text-center"><XCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
                  <td className="p-4 text-center"><XCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
                </tr>
                <tr className="border-b bg-slate-50">
                  <td className="p-4 font-semibold">Rate Limiting</td>
                  <td className="p-4 text-center">100/dia (grátis)</td>
                  <td className="p-4 text-center">Ilimitado</td>
                  <td className="p-4 text-center">Sem controle</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Dashboard de Uso</td>
                  <td className="p-4 text-center"><CheckCircle2 className="w-6 h-6 text-green-600 mx-auto" /></td>
                  <td className="p-4 text-center"><XCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
                  <td className="p-4 text-center"><XCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold">Outras APIs (CNPJ, CPF, Geo)</td>
                  <td className="p-4 text-center"><CheckCircle2 className="w-6 h-6 text-green-600 mx-auto" /></td>
                  <td className="p-4 text-center"><XCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
                  <td className="p-4 text-center"><CheckCircle2 className="w-6 h-6 text-green-600 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Casos de Uso</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>E-commerce</CardTitle>
                <CardDescription>Autocomplete de endereço no checkout</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Melhore a experiência de compra permitindo que seus clientes preencham endereços 
                  automaticamente apenas digitando o CEP. Reduz abandono de carrinho em até 30%.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Marketplaces</CardTitle>
                <CardDescription>Cálculo de frete automático</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Calcule fretes automaticamente a partir do CEP de origem e destino. Integre com 
                  Correios, transportadoras e faça cotações em tempo real.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cadastros</CardTitle>
                <CardDescription>Validação e preenchimento de formulários</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Valide endereços em tempo real durante cadastros. Reduza erros de digitação e 
                  melhore a qualidade dos dados do seu sistema.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análise de Dados</CardTitle>
                <CardDescription>Enriquecimento de bases de dados</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Enriqueça sua base de clientes com dados geográficos completos. Faça análises 
                  por região, cidade, bairro e tome decisões estratégicas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Crie sua conta grátis agora e comece a usar em menos de 5 minutos
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" variant="secondary">
              <Link href="/playground">
                Testar no Playground
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
              <Link href="/painel/register">
                Criar Conta Grátis
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ / SEO Content */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes sobre API de CEP</h2>
            <p className="text-slate-600">Tudo que você precisa saber antes de começar</p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    O que é uma API de CEP?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Uma API de CEP é um serviço web que permite consultar endereços brasileiros a partir do 
                    Código de Endereçamento Postal (CEP). Nossa API consulta automaticamente múltiplas fontes 
                    (ViaCEP e Brasil API) e retorna dados completos como logradouro, bairro, cidade, estado e DDD.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Qual a diferença entre Retech Core e ViaCEP?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Enquanto o ViaCEP é gratuito, nossa API oferece <strong>cache inteligente em 3 camadas</strong> 
                    (Redis L1, MongoDB L2, API Externa L3), <strong>fallback automático</strong> (se o ViaCEP cair, usamos Brasil API), 
                    <strong>dashboard de uso</strong>, e integração com outras APIs (CNPJ, CPF, Geografia) em uma única plataforma.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Quantas requisições posso fazer por dia?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    O plano gratuito oferece <strong>100 requisições por dia</strong>. Para volumes maiores, 
                    oferecemos planos Pro (10.000/dia) e Business (ilimitado). Entre em contato para planos empresariais.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Como funciona o cache?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Nossa API usa cache Redis em 3 camadas (L1, L2, L3), garantindo respostas rápidas (~160ms em média). 
                    CEPs populares ficam em cache por 7 dias. Sistema com fallback automático entre múltiplas fontes 
                    (ViaCEP, Brasil API) para máxima confiabilidade.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    A API é confiável?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Sim! Garantimos <strong>99.9% de uptime</strong> com infraestrutura na Railway. Temos 
                    fallback automático entre ViaCEP e Brasil API, então mesmo se uma fonte falhar, sua 
                    aplicação continua funcionando.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

