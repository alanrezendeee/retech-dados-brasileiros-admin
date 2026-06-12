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
  HelpCircle,
  Scale
} from 'lucide-react';
import BreadcrumbSchema from '@/app/components/schemas/BreadcrumbSchema';

export default function APIPenalPage() {
  // API Base URL da env
  const apiBaseURL = process.env.NEXT_PUBLIC_API_URL || 'https://api-core.theretech.com.br';

  // Breadcrumbs para schema SEO
  const breadcrumbs = [
    { name: "Home", url: "https://core.theretech.com.br" },
    { name: "APIs", url: "https://core.theretech.com.br/apis" },
    { name: "API de Artigos Penais", url: "https://core.theretech.com.br/apis/penal" }
  ];

  const codeExamples = {
    javascript: `// Node.js / JavaScript
const axios = require('axios');

// Listar todos os artigos (autocomplete)
const response = await axios.get(
  '${apiBaseURL}/penal/artigos',
  {
    headers: {
      'X-API-Key': 'rtc_sua_chave_aqui'
    },
    params: {
      q: 'homicidio',  // Busca opcional
      tipo: 'crime',   // Filtrar por tipo
      legislacao: 'CP' // Filtrar por legislação
    }
  }
);

console.log(response.data);
// {
//   "success": true,
//   "data": [
//     {
//       "codigo": "121",
//       "codigoFormatado": "Art. 121 do CP",
//       "descricao": "Homicídio simples",
//       "tipo": "crime",
//       "legislacao": "CP",
//       "legislacaoNome": "Código Penal",
//       "idUnico": "CP:121",
//       "fonte": "https://www2.senado.leg.br/bdsf/bitstream/handle/id/685738/Codigo_penal_8ed.pdf",
//       "dataAtualizacao": "fevereiro/2025"
//     }
//   ]
// }

// Buscar artigo específico
const artigo = await axios.get(
  '${apiBaseURL}/penal/artigos/121',
  {
    headers: {
      'X-API-Key': 'rtc_sua_chave_aqui'
    }
  }
);

// Buscar por texto
const busca = await axios.get(
  '${apiBaseURL}/penal/search',
  {
    headers: {
      'X-API-Key': 'rtc_sua_chave_aqui'
    },
    params: {
      q: 'matar alguém'
    }
  }
);`,
    python: `# Python
import requests

# Listar artigos (autocomplete)
response = requests.get(
    '${apiBaseURL}/penal/artigos',
    headers={'X-API-Key': 'rtc_sua_chave_aqui'},
    params={
        'q': 'homicidio',
        'tipo': 'crime'
    }
)

data = response.json()
for artigo in data['data']:
    print(f"{artigo['codigoFormatado']}: {artigo['descricao']}")

# Buscar artigo específico
artigo = requests.get(
    '${apiBaseURL}/penal/artigos/121',
    headers={'X-API-Key': 'rtc_sua_chave_aqui'}
).json()

print(f"Artigo: {artigo['data']['codigoFormatado']}")
print(f"Descrição: {artigo['data']['descricao']}")
print(f"Texto: {artigo['data']['textoCompleto']}")
print(f"Pena: {artigo['data']['penaMin']}")
print(f"Fonte: {artigo['data']['fonte']}")
print(f"Atualizado em: {artigo['data']['dataAtualizacao']}")`,
    php: `<?php
// PHP
$ch = curl_init();

// Listar artigos
curl_setopt($ch, CURLOPT_URL, '${apiBaseURL}/penal/artigos?q=homicidio');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'X-API-Key: rtc_sua_chave_aqui'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$data = json_decode($response, true);

foreach ($data['data'] as $artigo) {
    echo $artigo['codigoFormatado'] . ": " . $artigo['descricao'] . "\\n";
}

curl_close($ch);
?>`,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Schema SEO */}
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-orange-700 text-white py-20 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <Badge className="mb-4 bg-red-500/30 text-white border-red-400">
            ⚖️ Código Penal Completo
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            API de Artigos Penais
          </h1>
          <p className="text-xl md:text-2xl text-red-100 mb-8 max-w-3xl mx-auto">
            <strong>122 artigos penais brasileiros</strong> de múltiplas legislações com estrutura hierárquica completa, 
            ideal para <strong>autocomplete</strong> e sistemas jurídicos
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" variant="secondary">
              <Link href="/ferramentas/penal">
                Consultar Artigos Grátis
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
              <div className="text-3xl font-bold">122</div>
              <div className="text-sm text-red-200">artigos disponíveis</div>
            </div>
            <div>
              <div className="text-3xl font-bold">Cache</div>
              <div className="text-sm text-red-200">permanente ultra-rápido</div>
            </div>
            <div>
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm text-red-200">dados oficiais</div>
            </div>
            <div>
              <div className="text-3xl font-bold">Grátis</div>
              <div className="text-sm text-red-200">100 req/dia</div>
            </div>
          </div>
        </div>
      </section>

      {/* Ferramenta Grátis */}
      <section className="py-16 px-4 bg-white border-y-4 border-red-100">
        <div className="container max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm px-4 py-1">
              ✨ Teste Grátis
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Consulte Artigos Penais <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Agora Mesmo</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
              Teste nossa ferramenta gratuitamente, sem cadastro. Digite um código de artigo e veja funcionando em tempo real.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto border-2 border-red-200 hover:border-red-400 hover:shadow-2xl transition-all">
            <CardHeader className="text-center">
              <div className="text-5xl mb-4">⚖️</div>
              <CardTitle className="text-2xl mb-2 text-red-600">Consultar Artigos Penais Grátis</CardTitle>
              <CardDescription className="text-base">
                Digite o código do artigo (ex: 121, 157, 155) e obtenha informações completas instantaneamente
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white w-full">
                <Link href="/ferramentas/penal">
                  Consultar Agora →
                </Link>
              </Button>
              <p className="text-xs text-slate-500 mt-3">
                ⚡ Cache permanente • ✅ 100% Gratuito • 🎁 Sem cadastro necessário
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Por que usar nossa API de Artigos Penais?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Scale className="w-12 h-12 text-red-600 mb-4" />
                <CardTitle>Estrutura Hierárquica</CardTitle>
                <CardDescription>Organização completa: Artigo → Parágrafo → Inciso → Alínea</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>122 artigos de crimes que podem levar à prisão</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Estrutura hierárquica completa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Fonte oficial documentada (Senado Federal)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Data de atualização rastreável</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle>Ultra-Rápido</CardTitle>
                <CardDescription>Cache permanente para máxima performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Cache inteligente multi-camada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Infraestrutura otimizada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Dados sempre disponíveis</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Globe2 className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>Perfeito para Autocomplete</CardTitle>
                <CardDescription>Ideal para Autocomplete e componentes de busca</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Busca por texto em tempo real</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Filtros por tipo e legislação</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Formato JSON otimizado</span>
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

      {/* Response Example */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Exemplo de Resposta Completa</h2>
          <p className="text-center text-slate-300 mb-8">
            Cada artigo retorna informações completas incluindo fonte oficial, data de atualização, identificador único (idUnico) e hash para rastreamento de alterações
          </p>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <pre className="bg-slate-900 text-green-400 p-6 rounded-lg overflow-auto text-sm font-mono border border-slate-700">
{`{
  "success": true,
  "data": {
    "id": "66a1b2c3d4e5f6g7h8i9j0k1",
    "codigo": "121",
    "artigo": 121,
    "paragrafo": null,
    "inciso": null,
    "alinea": null,
    "descricao": "Homicídio simples",
    "textoCompleto": "Matar alguém",
    "tipo": "crime",
    "legislacao": "CP",
    "legislacaoNome": "Código Penal",
    "penaMin": "Reclusão, de 6 a 20 anos",
    "penaMax": "",
    "codigoFormatado": "Art. 121 do CP",
    "idUnico": "CP:121",
    "hashConteudo": "a1b2c3d4e5f6...",
    "fonte": "https://www2.senado.leg.br/bdsf/bitstream/handle/id/685738/Codigo_penal_8ed.pdf",
    "dataAtualizacao": "fevereiro/2025",
    "createdAt": "2025-10-29T12:00:00Z",
    "updatedAt": "2025-10-29T12:00:00Z"
  }
}`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Casos de Uso</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Sistemas Jurídicos</CardTitle>
                <CardDescription>Autocomplete de crimes em sistemas de gestão jurídica</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Popule campos de seleção de artigos penais em sistemas jurídicos, processos, 
                  denúncias e petições. Reduza erros de digitação e padronize nomenclaturas.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Formulários Online</CardTitle>
                <CardDescription>Autocomplete, React Select e outros componentes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Integre nossa API em qualquer componente de autocomplete (React Select, Downshift, 
                  Radix UI, Headless UI). Formato JSON otimizado para fácil integração.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Busca Inteligente</CardTitle>
                <CardDescription>Pesquisa por texto, código ou legislação</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Busque artigos por texto completo, código (ex: "121"), tipo (crime/contravenção) 
                  ou legislação (CP, LCP). Perfeito para sistemas de busca jurídica.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análise de Dados</CardTitle>
                <CardDescription>Estatísticas e relatórios jurídicos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Use os dados para gerar estatísticas sobre tipos de crimes mais comuns, 
                  análises por legislação ou criar relatórios jurídicos automatizados.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para integrar?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Crie sua conta grátis agora e comece a usar em menos de 5 minutos
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" variant="secondary">
              <Link href="/painel/register">
                Criar Conta Grátis
                <ArrowRight className="w-4 h-4 ml-2" />
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
            <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes sobre API de Artigos Penais</h2>
            <p className="text-slate-600">Tudo que você precisa saber antes de começar</p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Quantos artigos estão disponíveis?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    A API contém <strong>122 artigos penais</strong> de crimes que podem levar à prisão, distribuídos em:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li><strong>Código Penal (CP):</strong> 97 artigos (incluindo homicídio simples, qualificado, feminicídio, culposo, receptação, furto qualificado, roubo qualificado, estelionato qualificado, estupro qualificado, extorsão, sequestro, tráfico de pessoas, violação sexual mediante fraude, importunação sexual, assédio sexual, desacato, ocultação de cadáver, falsa identidade, resistência, favorecimento real)</li>
                      <li><strong>Estatuto da Criança e do Adolescente (ECA):</strong> 4 artigos</li>
                      <li><strong>Lei de Contravenções Penais (LCP):</strong> 3 artigos</li>
                      <li><strong>Lei de Drogas (Lei 11.343/2006):</strong> 2 artigos (tráfico, associação)</li>
                      <li><strong>Lei Maria da Penha (Lei 11.340/2006):</strong> 2 artigos (violência doméstica e descumprimento de medidas protetivas)</li>
                      <li><strong>Estatuto do Desarmamento (Lei 10.826/2003):</strong> 3 artigos (posse ilegal, porte ilegal de arma de uso permitido e restrito)</li>
                      <li><strong>Código de Trânsito Brasileiro (CTB):</strong> 4 artigos</li>
                      <li><strong>Lei de Crimes Ambientais (Lei 9.605/98):</strong> 5 artigos</li>
                      <li><strong>Código de Defesa do Consumidor (CDC):</strong> 2 artigos</li>
                      <li><strong>Lei de Lavagem de Dinheiro (Lei 9.613/98):</strong> 1 artigo</li>
                    </ul>
                    Todos os artigos incluem identificador único (<code className="bg-slate-100 px-1 rounded">idUnico</code> no formato "LEGISLACAO:CODIGO") para evitar ambiguidade quando o mesmo código aparece em legislações diferentes. Caso precise de artigos específicos que ainda não estejam disponíveis, <strong>entre em contato</strong> e podemos adicionar rapidamente.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    A API é adequada para autocomplete?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Sim! A API foi desenvolvida especialmente para <strong>componentes de autocomplete modernos</strong>. 
                    Retorna dados em formato JSON otimizado, permite busca por texto em tempo real, 
                    filtros por tipo (crime/contravenção) e legislação (CP/LCP). <strong>Respostas ultra-rápidas</strong> 
                    graças ao nosso sistema de cache inteligente.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Quais legislações estão incluídas?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Incluímos artigos de <strong>10 legislações brasileiras</strong>:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li><strong>Código Penal (CP - Decreto-Lei 2.848/1940):</strong> 97 artigos (incluindo variações qualificadas de furto, roubo, estelionato, estupro, extorsão, sequestro, tráfico de pessoas, violação sexual mediante fraude, importunação sexual, assédio sexual, desacato, ocultação de cadáver, falsa identidade, resistência e favorecimento real)</li>
                      <li><strong>Estatuto da Criança e do Adolescente (ECA - Lei 8.069/1990):</strong> 4 artigos</li>
                      <li><strong>Lei de Contravenções Penais (LCP - Decreto-Lei 3.688/1941):</strong> 3 artigos</li>
                      <li><strong>Lei de Drogas (Lei 11.343/2006):</strong> 2 artigos (tráfico, associação)</li>
                      <li><strong>Lei Maria da Penha (Lei 11.340/2006):</strong> 2 artigos (violência doméstica, descumprimento de medidas protetivas)</li>
                      <li><strong>Estatuto do Desarmamento (Lei 10.826/2003):</strong> 2 artigos (porte ilegal de arma)</li>
                      <li><strong>Código de Trânsito Brasileiro (CTB - Lei 9.503/1997):</strong> 4 artigos</li>
                      <li><strong>Lei de Crimes Ambientais (Lei 9.605/98):</strong> 5 artigos</li>
                      <li><strong>Código de Defesa do Consumidor (CDC - Lei 8.078/1990):</strong> 2 artigos</li>
                      <li><strong>Lei de Lavagem de Dinheiro (Lei 9.613/98):</strong> 1 artigo</li>
                    </ul>
                    <strong>Total: 122 artigos de crimes que podem levar à prisão.</strong> Incluindo formas qualificadas e agravadas dos crimes mais comuns. Estamos constantemente expandindo nossa base de dados. Se precisar de outras legislações específicas, <strong>entre em contato</strong> com nossa equipe.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Como funciona a busca?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    A API oferece <strong>3 tipos de busca</strong>: 
                    <ol className="list-decimal list-inside mt-2 space-y-1">
                      <li><strong>Lista todos os artigos</strong> (com filtros opcionais por tipo e legislação) - ideal para autocomplete</li>
                      <li><strong>Busca artigo específico</strong> por código (ex: "121", "157") ou por identificador único (ex: "CP:121", "Lei 11.343/2006:33") - útil quando o mesmo código aparece em múltiplas legislações</li>
                      <li><strong>Busca por texto livre</strong> em descrição e conteúdo completo</li>
                    </ol>
                    Todos os artigos incluem o campo <code className="bg-slate-100 px-1 rounded">idUnico</code> (formato "LEGISLACAO:CODIGO") para evitar ambiguidade. Todos os endpoints são <strong>extremamente rápidos</strong> e otimizados para alta performance.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Os dados são atualizados?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Os artigos penais são baseados na <strong>legislação oficial brasileira</strong> vigente. 
                    Como a legislação penal não muda com frequência, mantemos os dados em cache permanente para máxima performance. 
                    Quando houver alterações oficiais no Código Penal ou legislações relacionadas, <strong>nossa equipe atualiza a base de dados </strong> 
                    e todas as consultas passam a retornar as informações atualizadas automaticamente. Você não precisa fazer nada!
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

