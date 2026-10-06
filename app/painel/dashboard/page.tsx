'use client';

import { useRequireAuth } from '@/lib/hooks/use-auth';
import PainelLayout from '@/components/layouts/painel-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Key, 
  BarChart2, 
  Zap, 
  CheckCircle2,
  ArrowRight,
  Book,
  TrendingUp
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getMyStats } from '@/lib/api/tenant';

interface Stats {
  activeKeys: number;
  requestsToday: number;
  requestsMonth: number;
  dailyLimit: number;
  remaining: number;
  percentageUsed: number;
}

export default function PainelDashboardPage() {
  const { isReady, user } = useRequireAuth('TENANT_USER');
  const [stats, setStats] = useState<Stats>({
    activeKeys: 0,
    requestsToday: 0,
    requestsMonth: 0,
    dailyLimit: 1000,
    remaining: 1000,
    percentageUsed: 0,
  });
  const [loading, setLoading] = useState(true);

  // Carregar dados reais da API
  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getMyStats();
        setStats({
          activeKeys: data.activeKeys || 0,
          requestsToday: data.requestsToday || 0,
          requestsMonth: data.requestsMonth || 0,
          dailyLimit: data.dailyLimit || 1000,
          remaining: data.remaining || 0,
          percentageUsed: data.percentageUsed || 0,
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isReady) {
      loadStats();
      // Auto-refresh a cada 30 segundos
      const interval = setInterval(loadStats, 30000);
      return () => clearInterval(interval);
    }
  }, [isReady]);

  if (!isReady || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const percentage = stats.percentageUsed;

  const quickActions = [
    {
      title: 'Criar API Key',
      description: 'Gere sua primeira chave de acesso',
      icon: Key,
      href: '/painel/apikeys',
      color: 'blue',
    },
    {
      title: 'Ver Documentação',
      description: 'Aprenda a integrar a API',
      icon: Book,
      href: '/painel/docs',
      color: 'purple',
    },
    {
      title: 'Monitorar Uso',
      description: 'Acompanhe suas requisições',
      icon: BarChart2,
      href: '/painel/usage',
      color: 'green',
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Crie sua primeira API Key',
      description: 'Vá para a seção de API Keys e gere uma nova chave',
      completed: stats.activeKeys > 0,
    },
    {
      number: 2,
      title: 'Faça sua primeira requisição',
      description: 'Use a chave para consultar UFs ou municípios',
      completed: stats.requestsToday > 0,
    },
    {
      number: 3,
      title: 'Monitore seu uso',
      description: 'Acompanhe suas métricas em tempo real',
      completed: false,
    },
  ];

  return (
    <PainelLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Bem-vindo, {user?.name}! 👋
          </h1>
          <p className="text-slate-500 mt-1">
            Gerencie suas API Keys e monitore o uso do RetechHub API
          </p>
        </div>

        {/* Plano Atual */}
        <Card className="border-blue-200 bg-gradient-to-br from-blue-600 to-purple-600 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Plano Free</h3>
                </div>
                <p className="text-blue-100 text-sm">
                  {stats.dailyLimit.toLocaleString()} requests por dia
                </p>
              </div>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                Ativo
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-100">Uso de hoje</span>
                <span className="font-semibold">
                  {stats.requestsToday.toLocaleString()} / {stats.dailyLimit.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm">
                <div
                  className="bg-white h-3 rounded-full transition-all duration-300 shadow-lg"
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
              <p className="text-xs text-blue-100">
                {percentage < 50 && 'Você ainda tem muita margem disponível hoje'}
                {percentage >= 50 && percentage < 80 && 'Você já usou mais da metade do seu limite diário'}
                {percentage >= 80 && percentage < 100 && '⚠️ Atenção: Você está próximo do limite diário'}
                {percentage >= 100 && '🚫 Limite diário atingido'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-slate-200 hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-500 mb-1">
                    API Keys Ativas
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 mb-1">
                    {stats.activeKeys}
                  </h3>
                  <Link href="/painel/apikeys">
                    <Button variant="link" className="text-xs p-0 h-auto text-blue-600 hover:text-blue-700">
                      Gerenciar keys →
                    </Button>
                  </Link>
                </div>
                <div className="p-3 rounded-xl bg-blue-100">
                  <Key className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-500 mb-1">
                    Requests Hoje
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 mb-1">
                    {stats.requestsToday.toLocaleString()}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Últimas 24 horas
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-green-100">
                  <BarChart2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-500 mb-1">
                    Requests Mês
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 mb-1">
                    {stats.requestsMonth.toLocaleString()}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Mês atual
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-purple-100">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grid 2 colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ações Rápidas */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              <CardDescription>Acesse as funcionalidades principais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  const bgColors: Record<string, string> = {
                    blue: 'bg-blue-50 hover:bg-blue-100',
                    purple: 'bg-purple-50 hover:bg-purple-100',
                    green: 'bg-green-50 hover:bg-green-100',
                  };
                  const iconColors: Record<string, string> = {
                    blue: 'text-blue-600',
                    purple: 'text-purple-600',
                    green: 'text-green-600',
                  };

                  return (
                    <Link key={index} href={action.href}>
                      <div className={`flex items-center gap-3 p-4 rounded-lg ${bgColors[action.color]} cursor-pointer transition-all duration-200 group`}>
                        <div className="p-2 rounded-lg bg-white shadow-sm">
                          <Icon className={`w-5 h-5 ${iconColors[action.color]}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900 text-sm">{action.title}</h4>
                          <p className="text-xs text-slate-600">{action.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Primeiros Passos */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Primeiros Passos</CardTitle>
              <CardDescription>Configure sua API em minutos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {steps.map((step) => (
                  <div key={step.number} className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                      step.completed 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {step.completed ? <CheckCircle2 className="w-5 h-5" /> : step.number}
                    </div>
                    <div className="flex-1 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                      <h4 className={`font-medium text-sm mb-1 ${
                        step.completed ? 'text-slate-900' : 'text-slate-600'
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-500">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PainelLayout>
  );
}
