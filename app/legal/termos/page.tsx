'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-blue-600">Legal</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Termos de Uso
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Leia atentamente antes de usar nossas APIs
          </p>
          <p className="text-sm text-slate-400 mt-4">
            Última atualização: 27 de Outubro de 2025
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Resumo */}
        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <Shield className="w-5 h-5" />
          <AlertDescription className="text-slate-700">
            Ao usar a Retech Core API, você concorda com estes termos. Use as APIs de forma responsável, 
            respeitando os limites de rate limiting e sem práticas abusivas. Dados fornecidos "como estão" 
            a partir de fontes públicas confiáveis.
          </AlertDescription>
        </Alert>

        <div className="prose prose-slate max-w-none">
          {/* 1. Aceitação */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>1. Aceitação dos Termos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                Ao acessar ou usar a plataforma <strong>The Retech Core</strong> ("Serviço", "Plataforma", "APIs"), 
                operada por <strong>Alan Rezende</strong> ("Retech", "nós", "nosso"), você concorda em estar 
                vinculado a estes Termos de Uso.
              </p>
              <p>
                Se você não concorda com qualquer parte destes termos, <strong>não use nossos serviços</strong>.
              </p>
            </CardContent>
          </Card>

          {/* 2. Uso Permitido */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                2. Uso Permitido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>Você PODE usar nossas APIs para:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Desenvolvimento de aplicações comerciais e pessoais</li>
                <li>Consultas a dados públicos (CEP, CNPJ, Geografia, Artigos Penais)</li>
                <li>Integração em websites, aplicativos mobile e sistemas</li>
                <li>Testes e desenvolvimento (ambiente sandbox)</li>
                <li>Redistribuição de dados obtidos (com atribuição à fonte original)</li>
              </ul>
              <p className="mt-4">
                <strong>Limites por Plano:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Free:</strong> 1.000 requests/dia, 60 requests/minuto</li>
                <li><strong>Business:</strong> 50.000 requests/dia, 500 requests/minuto</li>
                <li><strong>Enterprise:</strong> Customizado conforme necessidade</li>
              </ul>
            </CardContent>
          </Card>

          {/* 3. Uso Proibido */}
          <Card className="mb-6 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <XCircle className="w-5 h-5" />
                3. Uso Proibido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>Você NÃO PODE:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-red-700">
                <li><strong>Ataques DDoS ou sobrecarga intencional</strong> do sistema</li>
                <li><strong>Fazer scraping ou loops infinitos</strong> nas APIs</li>
                <li><strong>Compartilhar suas API Keys</strong> com terceiros</li>
                <li><strong>Burlar rate limiting</strong> usando múltiplas contas</li>
                <li><strong>Revender dados</strong> sem autorização expressa</li>
                <li><strong>Uso fraudulento ou ilegal</strong> dos dados obtidos</li>
                <li><strong>Engenharia reversa</strong> da plataforma</li>
                <li><strong>Distribuir malware ou vírus</strong> através da API</li>
              </ul>
              <Alert className="mt-4 border-red-300 bg-red-50">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <AlertDescription className="text-red-700">
                  <strong>Violações resultarão em:</strong> Bloqueio imediato de API Key, bloqueio de IP, 
                  suspensão de conta e possíveis medidas legais.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* 4. Limites de Responsabilidade */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>4. Limitação de Responsabilidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                <strong>4.1. Dados "Como Estão" (As-Is)</strong>
              </p>
              <p>
                Os dados fornecidos pela Retech Core são obtidos de <strong>fontes públicas confiáveis</strong> 
                (ViaCEP, Brasil API, IBGE, Receita Federal, Legislação Brasileira) e fornecidos "COMO ESTÃO", sem garantias expressas ou 
                implícitas de precisão, atualização ou completude.
              </p>
              <p>
                <strong>4.2. Não Somos a Fonte Original</strong>
              </p>
              <p>
                A Retech Core é um <strong>agregador e cache</strong> de dados públicos. Não somos a fonte original 
                dos dados. A precisão depende da fonte (ViaCEP, Brasil API, etc.).
              </p>
              <p>
                <strong>4.3. Disponibilidade</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Plano Free:</strong> Sem garantia de SLA. Uptime esperado: 99%</li>
                <li><strong>Plano Business:</strong> SLA de 99.5%</li>
                <li><strong>Plano Enterprise:</strong> SLA de 99.9%</li>
              </ul>
              <p>
                <strong>4.4. Limitação de Danos</strong>
              </p>
              <p>
                Em nenhuma circunstância a Retech será responsável por danos indiretos, incidentais, especiais 
                ou consequenciais resultantes do uso ou incapacidade de usar o serviço, incluindo, mas não se 
                limitando a, perda de lucros, dados ou oportunidades de negócios.
              </p>
            </CardContent>
          </Card>

          {/* 5. Sanções por Abuso */}
          <Card className="mb-6 border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                5. Sanções por Abuso
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                <strong>Em caso de violação destes termos, podemos:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Bloqueio Temporário:</strong> Suspensão de API Key por 24-72h (primeira violação leve)</li>
                <li><strong>Bloqueio Permanente:</strong> Revogação de API Key (violações graves ou reincidência)</li>
                <li><strong>Bloqueio de IP:</strong> Bloqueio de endereço IP por até 90 dias</li>
                <li><strong>Suspensão de Conta:</strong> Encerramento imediato sem reembolso</li>
                <li><strong>Medidas Legais:</strong> Ação judicial em casos de danos financeiros ou reputacionais</li>
              </ul>
              <Alert className="mt-4">
                <AlertDescription>
                  <strong>Exemplos de violações graves:</strong> DDoS, loops abusivos (&gt;1000 req/s), 
                  revenda não autorizada, fraude, uso para atividades ilegais.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* 6. Garantias e SLA */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>6. Garantias e SLA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                <strong>6.1. Uptime</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Plano Free: Melhor esforço, sem SLA garantido</li>
                <li>Plano Business: 99.5% de uptime mensal</li>
                <li>Plano Enterprise: 99.9% de uptime mensal</li>
              </ul>
              <p>
                <strong>6.2. Performance</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Cache Redis (L1): ~1ms (quando hit)</li>
                <li>Cache MongoDB (L2): ~10ms (quando hit)</li>
                <li>API Externa (L3): ~160-200ms (sem cache)</li>
              </ul>
              <p>
                <strong>6.3. Dados Atualizados</strong>
              </p>
              <p>
                Os dados são atualizados conforme as fontes públicas (ViaCEP, Brasil API, IBGE, Legislação). 
                CEPs em cache por 7 dias, CNPJs por 30 dias, Artigos Penais são permanentes (alterados apenas quando a legislação muda).
              </p>
            </CardContent>
          </Card>

          {/* 7. Planos Pagos */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>7. Planos Pagos e Cobrança</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                <strong>7.1. Cobrança</strong>
              </p>
              <p>
                Planos Business e Enterprise são cobrados mensalmente via cartão de crédito, boleto ou Pix. 
                O pagamento é adiantado (pré-pago).
              </p>
              <p>
                <strong>7.2. Cancelamento</strong>
              </p>
              <p>
                Você pode cancelar a qualquer momento. Sem multas ou taxas de cancelamento. 
                O serviço permanece ativo até o fim do período pago.
              </p>
              <p>
                <strong>7.3. Reembolso</strong>
              </p>
              <p>
                Oferecemos reembolso integral se você cancelar nos primeiros 7 dias (garantia de satisfação). 
                Após 7 dias, não há reembolso proporcional.
              </p>
            </CardContent>
          </Card>

          {/* 8. Propriedade Intelectual */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>8. Propriedade Intelectual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                <strong>8.1. Dados Públicos</strong>
              </p>
              <p>
                Os dados fornecidos (CEPs, CNPJs, Geografia, Artigos Penais) são de <strong>domínio público</strong> e pertencem às 
                suas respectivas fontes (Correios, Receita Federal, IBGE, Legislação Brasileira).
              </p>
              <p>
                <strong>8.2. Plataforma</strong>
              </p>
              <p>
                A plataforma Retech Core (código, design, documentação, marca) é propriedade exclusiva de 
                Alan Rezende e está protegida por direitos autorais.
              </p>
              <p>
                <strong>8.3. Atribuição</strong>
              </p>
              <p>
                Ao redistribuir dados obtidos de nossas APIs, você deve:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Atribuir crédito à fonte original (ex: "Dados via ViaCEP/Brasil API")</li>
                <li>Não remover notices de copyright quando presentes</li>
              </ul>
            </CardContent>
          </Card>

          {/* 9. Privacidade */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>9. Privacidade e Dados Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                Veja nossa <a href="/legal/privacidade" className="text-blue-600 hover:underline">Política de Privacidade</a> completa.
              </p>
              <p>
                <strong>Resumo:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>NÃO armazenamos</strong> CEPs/CNPJs consultados por você</li>
                <li><strong>Armazenamos em cache compartilhado</strong> (anônimo, sem relação com usuário)</li>
                <li><strong>Coletamos:</strong> Email, nome, empresa (cadastro), logs de uso (agregados)</li>
                <li><strong>NÃO vendemos</strong> ou compartilhamos seus dados pessoais</li>
                <li>Conformidade com <strong>LGPD</strong> (Lei Geral de Proteção de Dados)</li>
              </ul>
            </CardContent>
          </Card>

          {/* 10. Alterações nos Termos */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>10. Alterações nos Termos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                Podemos modificar estes termos a qualquer momento. Mudanças significativas serão notificadas 
                por email com <strong>30 dias de antecedência</strong>.
              </p>
              <p>
                O uso continuado após alterações constitui aceitação dos novos termos.
              </p>
            </CardContent>
          </Card>

          {/* 11. Manutenção e Downtime */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>11. Manutenção e Downtime</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                <strong>11.1. Manutenção Programada</strong>
              </p>
              <p>
                Podemos realizar manutenções programadas, que serão notificadas com <strong>48 horas de antecedência</strong> 
                via email e dashboard. Janela típica: madrugada (3h-5h horário de Brasília).
              </p>
              <p>
                <strong>11.2. Manutenção Emergencial</strong>
              </p>
              <p>
                Em caso de falhas críticas, podemos fazer manutenção emergencial sem aviso prévio. 
                Notificaremos via email assim que possível.
              </p>
            </CardContent>
          </Card>

          {/* 12. Rescisão */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>12. Rescisão de Contrato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                <strong>12.1. Por Você</strong>
              </p>
              <p>
                Você pode cancelar sua conta a qualquer momento através do dashboard ou por email. 
                Seus dados serão excluídos em até 30 dias.
              </p>
              <p>
                <strong>12.2. Por Nós</strong>
              </p>
              <p>
                Podemos encerrar sua conta imediatamente se:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Violação destes termos</li>
                <li>Atividade fraudulenta ou ilegal</li>
                <li>Abuso do serviço (DDoS, loops, etc.)</li>
                <li>Falta de pagamento (planos pagos)</li>
              </ul>
            </CardContent>
          </Card>

          {/* 13. Lei Aplicável */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>13. Lei Aplicável e Foro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                Estes termos são regidos pelas <strong>leis brasileiras</strong>.
              </p>
              <p>
                Foro competente: <strong>Comarca de Florianópolis, Santa Catarina, Brasil</strong>, 
                com exclusão de qualquer outro, por mais privilegiado que seja.
              </p>
            </CardContent>
          </Card>

          {/* 14. Contato */}
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle>14. Contato para Questões Legais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-slate-700">
              <p><strong>Alan Rezende</strong></p>
              <p>The Retech</p>
              <p>Florianópolis, SC, Brasil</p>
              <p>Email: suporte@theretech.com.br</p>
              <p>WhatsApp: +55 48 99961-6679</p>
            </CardContent>
          </Card>

          {/* Aceitação */}
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <AlertDescription className="text-slate-700">
              <strong>Ao usar a Retech Core API, você declara ter lido, compreendido e aceito estes Termos de Uso.</strong>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}

