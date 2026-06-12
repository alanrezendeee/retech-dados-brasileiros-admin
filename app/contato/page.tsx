'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, MessageSquare, MapPin, Clock, Phone } from 'lucide-react';
import { toast } from 'sonner';

export default function ContatoPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [whatsapp, setWhatsapp] = useState('48999616679');

  // WhatsApp fixo (não precisa buscar de settings - página pública)
  // Se precisar atualizar, mude aqui ou via env

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (!nome || !email || !mensagem) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    setEnviando(true);

    // TODO: Integrar com serviço de email (SendGrid, AWS SES, etc.)
    // Por enquanto, redireciona para WhatsApp com a mensagem
    const mensagemWhatsApp = `Olá! Sou ${nome}${empresa ? ` da ${empresa}` : ''}.\n\nEmail: ${email}\n\nMensagem: ${mensagem}`;
    const whatsappUrl = `https://wa.me/55${whatsapp}?text=${encodeURIComponent(mensagemWhatsApp)}`;
    
    setTimeout(() => {
      toast.success('Redirecionando para WhatsApp...', {
        description: 'Sua mensagem será enviada via WhatsApp'
      });
      window.open(whatsappUrl, '_blank');
      setNome('');
      setEmail('');
      setEmpresa('');
      setMensagem('');
      setEnviando(false);
    }, 500);
  };

  const whatsappLink = `https://wa.me/55${whatsapp}?text=Olá! Gostaria de falar sobre a Retech Core API`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-blue-600">Fale Conosco</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Estamos aqui para ajudar você a integrar nossas APIs
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulário */}
          <Card>
            <CardHeader>
              <CardTitle>Envie uma Mensagem</CardTitle>
              <CardDescription>Responderemos em até 24 horas úteis</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa (opcional)</Label>
                  <Input
                    id="empresa"
                    placeholder="Nome da sua empresa"
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensagem">Mensagem *</Label>
                  <Textarea
                    id="mensagem"
                    placeholder="Como podemos ajudar?"
                    rows={6}
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={enviando}>
                  {enviando ? 'Enviando...' : 'Enviar Mensagem'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Informações de Contato */}
          <div className="space-y-6">
            {/* WhatsApp */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-green-100">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">WhatsApp (Preferencial)</h3>
                    <p className="text-slate-700 mb-3">
                      Fale diretamente com o CEO
                    </p>
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                      <Link href={whatsappLink} target="_blank">
                        Abrir WhatsApp
                      </Link>
                    </Button>
                    <p className="text-sm text-slate-600 mt-2">
                      +55 {whatsapp.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Email</h3>
                    <p className="text-slate-700 mb-2">
                      suporte@theretech.com.br
                    </p>
                    <p className="text-sm text-slate-600">
                      Resposta em até 24 horas úteis
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Horário */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-purple-100">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Horário de Atendimento</h3>
                    <p className="text-slate-700">
                      Segunda a Sexta: 9h - 18h
                    </p>
                    <p className="text-sm text-slate-600">
                      Horário de Brasília (GMT-3)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Localização */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-orange-100">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Localização</h3>
                    <p className="text-slate-700">
                      Florianópolis, Santa Catarina
                    </p>
                    <p className="text-sm text-slate-600">
                      Brasil 🇧🇷
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ de Vendas */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Dúvidas sobre Vendas?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quanto tempo leva para começar?</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                Você pode começar a usar imediatamente após criar sua conta grátis. A integração leva menos de 5 minutos.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Oferecem suporte técnico?</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                Sim! Todos os planos incluem suporte por email. Planos Business e Enterprise têm suporte prioritário via WhatsApp.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Posso testar antes de assinar?</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                Com certeza! O plano Free oferece 100 requests/dia para sempre, sem cartão de crédito.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fazem customizações?</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                Sim! No plano Enterprise oferecemos endpoints personalizados, white-label e integrações específicas.
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

