'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock, Eye, Database, Trash2, Download } from 'lucide-react';

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-blue-600">Legal</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Política de Privacidade
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Transparência total sobre como tratamos seus dados
          </p>
          <p className="text-sm text-slate-400 mt-4">
            Última atualização: 27 de Outubro de 2025
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Resumo LGPD */}
        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <Shield className="w-5 h-5" />
          <AlertDescription className="text-slate-700">
            <strong>Conformidade com LGPD:</strong> A Retech Core respeita a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). 
            Seus dados pessoais são tratados com segurança e você tem direitos garantidos sobre eles.
          </AlertDescription>
        </Alert>

        <div className="prose prose-slate max-w-none">
          {/* 1. Dados Coletados */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-600" />
                1. Dados que Coletamos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                <strong>1.1. Dados de Cadastro (obrigatórios)</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Nome completo</li>
                <li>Email</li>
                <li>Senha (armazenada com hash bcrypt, nunca em texto)</li>
                <li>Empresa/Organização (opcional)</li>
              </ul>
              
              <p className="mt-4">
                <strong>1.2. Dados de Uso (automáticos)</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>API Keys geradas (keyId, hash HMAC-SHA256, scopes)</li>
                <li>Logs de uso: endpoint acessado, timestamp, tenant_id</li>
                <li>Rate limiting: contadores diários e por minuto</li>
                <li>Activity logs: ações realizadas (login, criação de keys, etc.)</li>
              </ul>

              <p className="mt-4">
                <strong>1.3. Dados NÃO Coletados</strong>
              </p>
              <Alert className="bg-green-50 border-green-200">
                <AlertDescription className="text-green-700">
                  <strong>✅ NÃO armazenamos:</strong>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>CEPs, CNPJs, ou Artigos Penais que você consultou (armazenamos apenas cache compartilhado)</li>
                    <li>Relação "usuário X consultou dado Y"</li>
                    <li>Histórico individual de consultas</li>
                    <li>Cookies de tracking ou analytics de terceiros</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* 2. Uso dos Dados */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-600" />
                2. Como Usamos Seus Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Autenticação:</strong> Login e gestão de sessão (JWT)</li>
                <li><strong>Billing:</strong> Contagem de requests para faturamento (planos pagos)</li>
                <li><strong>Analytics Agregados:</strong> Métricas globais (requests totais, top endpoints) - SEM identificação individual</li>
                <li><strong>Suporte Técnico:</strong> Logs para debug e resolução de problemas</li>
                <li><strong>Segurança:</strong> Detecção de abusos e ataques</li>
                <li><strong>Comunicação:</strong> Emails sobre sua conta, updates de serviço, manutenção</li>
              </ul>
              <Alert className="mt-4">
                <AlertDescription>
                  <strong>NÃO usamos para:</strong> Marketing de terceiros, venda de dados, tracking comportamental.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* 3. Cache Compartilhado */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>3. Cache de Dados Públicos (Compartilhado)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                <strong>Como funciona:</strong>
              </p>
              <p>
                Quando QUALQUER usuário consulta um dado (CEP, CNPJ, Artigo Penal), armazenamos o resultado em cache 
                <strong> compartilhado</strong> (7 dias para CEP, 30 dias para CNPJ, permanente para Artigos Penais). 
                Se OUTRO usuário consultar o mesmo dado, retornamos do cache (resposta ultra-rápida).
              </p>
              <Alert className="bg-blue-50 border-blue-200">
                <AlertDescription className="text-blue-700">
                  <strong>Importante:</strong> O cache NÃO contém informação de "quem consultou". 
                  Apenas armazenamos: <code>{"cep: '01310100', logradouro: 'Avenida Paulista', ...}"}</code>
                </AlertDescription>
              </Alert>
              <p>
                <strong>Por que fazemos isso:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Performance: 160x mais rápido (1ms vs 160ms)</li>
                <li>Economia: Reduz chamadas para APIs externas</li>
                <li>Confiabilidade: Funciona mesmo se fonte cair</li>
              </ul>
              <p>
                <strong>TTL (tempo de vida):</strong> CEP: 7 dias | CNPJ: 30 dias | Geografia: permanente
              </p>
            </CardContent>
          </Card>

          {/* 4. Compartilhamento */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>4. Compartilhamento de Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                <strong>NÃO vendemos ou compartilhamos</strong> seus dados pessoais com terceiros.
              </p>
              <p>
                <strong>Exceções (exigidas por lei):</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Ordem judicial (mandado de busca, intimação)</li>
                <li>Investigação criminal (requerida por autoridades)</li>
                <li>Proteção de direitos (fraude, abuso, ataques)</li>
              </ul>
            </CardContent>
          </Card>

          {/* 5. Segurança */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-600" />
                5. Segurança dos Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                <strong>Medidas de Segurança Implementadas:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>API Keys:</strong> Hash HMAC-SHA256 com salt secreto (nunca armazenadas em texto)</li>
                <li><strong>Senhas:</strong> Hash bcrypt (algoritmo resistente a ataques de força bruta)</li>
                <li><strong>JWT Tokens:</strong> Curto prazo (15 minutos access, 7 dias refresh)</li>
                <li><strong>HTTPS:</strong> Todas as conexões criptografadas (TLS 1.2+)</li>
                <li><strong>Rate Limiting:</strong> Proteção contra DDoS e abusos</li>
                <li><strong>Scopes:</strong> Controle granular de permissões</li>
                <li><strong>CORS:</strong> Proteção contra requisições não autorizadas</li>
                <li><strong>MongoDB:</strong> Hospedado em Railway/Oracle Cloud (certificados ISO 27001)</li>
                <li><strong>Backups:</strong> Diários, criptografados, retenção de 30 dias</li>
              </ul>
            </CardContent>
          </Card>

          {/* 6. Retenção */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>6. Retenção de Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Dados de cadastro:</strong> Até você excluir sua conta</li>
                <li><strong>Logs de uso:</strong> 90 dias (depois deletados automaticamente)</li>
                <li><strong>Cache (CEP/CNPJ):</strong> 7-30 dias (depois expiram automaticamente)</li>
                <li><strong>Activity logs:</strong> 180 dias (auditoria)</li>
                <li><strong>Backups:</strong> 30 dias</li>
              </ul>
            </CardContent>
          </Card>

          {/* 7. Seus Direitos (LGPD) */}
          <Card className="mb-6 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-700">7. Seus Direitos (LGPD - Lei 13.709/2018)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                Você tem os seguintes direitos sobre seus dados pessoais:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-start gap-2">
                  <Download className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <strong>Acesso:</strong>
                    <p className="text-sm">Solicitar cópia de todos os seus dados</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <strong>Correção:</strong>
                    <p className="text-sm">Corrigir dados incorretos ou desatualizados</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Trash2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <strong>Exclusão:</strong>
                    <p className="text-sm">Deletar sua conta e dados permanentemente</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Download className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <strong>Portabilidade:</strong>
                    <p className="text-sm">Exportar seus dados em formato estruturado (JSON)</p>
                  </div>
                </div>
              </div>
              <Alert className="mt-4 bg-blue-50 border-blue-200">
                <AlertDescription className="text-blue-700">
                  <strong>Como exercer seus direitos:</strong> Envie email para suporte@theretech.com.br 
                  ou WhatsApp +55 48 99961-6679. Responderemos em até 15 dias.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* 8. Cookies */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>8. Cookies e Tecnologias Similares</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                <strong>Cookies Essenciais (obrigatórios):</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><code>auth_token</code>: Token JWT para autenticação (HttpOnly, Secure)</li>
                <li><code>refresh_token</code>: Token de renovação (HttpOnly, Secure)</li>
              </ul>
              <p className="mt-4">
                <strong>Cookies que NÃO usamos:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>❌ Google Analytics ou similares</li>
                <li>❌ Pixels de tracking (Facebook, LinkedIn, etc.)</li>
                <li>❌ Cookies de terceiros para publicidade</li>
                <li>❌ Fingerprinting de navegador para tracking (apenas para segurança no playground)</li>
              </ul>
            </CardContent>
          </Card>

          {/* 9. Transferência Internacional */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>9. Transferência Internacional de Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                Atualmente, nossos servidores estão hospedados em:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Railway (EUA):</strong> Temporário, migração planejada para Brasil</li>
                <li><strong>Oracle Cloud (São Paulo):</strong> Migração planejada (dados no Brasil)</li>
              </ul>
              <Alert className="mt-4">
                <AlertDescription>
                  Tanto Railway quanto Oracle Cloud possuem certificações de segurança internacionais 
                  (ISO 27001, SOC 2) e cumprem com LGPD e GDPR.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* 10. Menores de Idade */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>10. Menores de 18 Anos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                Nosso serviço <strong>não é direcionado a menores de 18 anos</strong>. 
                Não coletamos intencionalmente dados de menores.
              </p>
              <p>
                Se você é menor de 18 anos, <strong>não crie conta</strong> sem autorização dos pais ou responsável legal.
              </p>
            </CardContent>
          </Card>

          {/* 11. Alterações */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>11. Alterações nesta Política</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                Podemos atualizar esta política periodicamente. Mudanças significativas serão notificadas por email 
                com <strong>30 dias de antecedência</strong>.
              </p>
              <p>
                A data de "Última atualização" no topo indica quando foi modificada pela última vez.
              </p>
            </CardContent>
          </Card>

          {/* 12. Encarregado de Dados (DPO) */}
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle>12. Encarregado de Dados (DPO - LGPD)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-slate-700">
              <p><strong>Alan Rezende</strong></p>
              <p>DPO (Data Protection Officer) da The Retech</p>
              <p>Email: suporte@theretech.com.br</p>
              <p>WhatsApp: +55 48 99961-6679</p>
              <p className="text-sm text-slate-600 mt-4">
                Para exercer seus direitos LGPD, entre em contato diretamente.
              </p>
            </CardContent>
          </Card>

          {/* 13. Base Legal */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>13. Base Legal (LGPD)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                Processamos seus dados com base nas seguintes bases legais:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Consentimento:</strong> Ao criar conta, você consente com o processamento</li>
                <li><strong>Execução de Contrato:</strong> Necessário para fornecer o serviço</li>
                <li><strong>Legítimo Interesse:</strong> Analytics agregados, segurança, anti-fraude</li>
                <li><strong>Obrigação Legal:</strong> Retenção de logs para compliance fiscal</li>
              </ul>
            </CardContent>
          </Card>

          {/* 14. Exclusão de Conta */}
          <Card className="mb-6 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Trash2 className="w-5 h-5" />
                14. Como Excluir Sua Conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                Para excluir sua conta permanentemente:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Acesse seu Dashboard</li>
                <li>Vá em Configurações → Excluir Conta</li>
                <li>Confirme a exclusão</li>
              </ol>
              <p className="mt-4">
                <strong>O que acontece:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Seus dados pessoais são deletados em <strong>até 30 dias</strong></li>
                <li>API Keys são revogadas imediatamente</li>
                <li>Logs de uso são anonimizados (removemos relação com você)</li>
                <li>Cache compartilhado <strong>NÃO é afetado</strong> (dados públicos, sem vínculo com você)</li>
              </ul>
            </CardContent>
          </Card>

          {/* 15. Contato */}
          <Card className="mb-6 bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle>15. Contato para Questões de Privacidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-slate-700">
              <p>
                Para dúvidas, solicitações ou reclamações sobre privacidade:
              </p>
              <p className="mt-4"><strong>Alan Rezende</strong> (DPO)</p>
              <p>The Retech</p>
              <p>Florianópolis, SC, Brasil</p>
              <p>Email: suporte@theretech.com.br</p>
              <p>WhatsApp: +55 48 99961-6679</p>
            </CardContent>
          </Card>

          {/* Aceitação */}
          <Alert className="bg-blue-50 border-blue-200">
            <Shield className="w-5 h-5 text-blue-600" />
            <AlertDescription className="text-slate-700">
              <strong>Ao usar a Retech Core API, você declara ter lido, compreendido e aceito esta Política de Privacidade.</strong>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}








