'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  LayoutDashboard, 
  Key, 
  BarChart2, 
  BookOpen,
  LogOut,
  User,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getMyStats } from '@/lib/api/tenant';

interface Stats {
  activeKeys: number;
  requestsToday: number;
  requestsMonth: number;
  dailyLimit: number;
  remaining: number;
  percentageUsed: number;
}

export default function PainelLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getMyStats();
        setStats(data);
      } catch (error) {
        console.error('Erro ao carregar stats:', error);
      }
    };

    loadStats();
    // Auto-refresh a cada 30 segundos
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/painel/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/painel/dashboard', icon: LayoutDashboard },
    { name: 'Minhas API Keys', href: '/painel/apikeys', icon: Key },
    { name: 'Uso da API', href: '/painel/usage', icon: BarChart2 },
    { name: 'Documentação', href: '/painel/docs', icon: BookOpen },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Retech API
                </h1>
                <p className="text-sm text-slate-500">Portal do Desenvolvedor</p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                      {user?.name?.substring(0, 2).toUpperCase() || 'DV'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name || 'Desenvolvedor'}</p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        DESENVOLVEDOR
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/painel/profile')}>
                  <User className="w-4 h-4 mr-2" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-73px)] flex flex-col">
          <nav className="p-3 space-y-1 flex-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                    active
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  {/* Indicador ativo */}
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-r-full" />
                  )}
                  
                  <Icon 
                    className={cn(
                      "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                      active ? "text-blue-600" : "text-slate-400"
                    )} 
                  />
                  <span className={cn(
                    "font-medium text-sm",
                    active && "font-semibold"
                  )}>
                    {item.name}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Plano Free Badge */}
          <div className="mx-3 mb-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-semibold text-blue-700">PLANO FREE</span>
            </div>
            <p className="text-xs text-slate-600">
              {stats ? `${stats.dailyLimit.toLocaleString()} requests/dia` : 'Carregando...'}
            </p>
            <div className="mt-3">
              <div className="w-full bg-slate-200 rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(stats?.percentageUsed || 0, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {stats ? `${stats.requestsToday} de ${stats.dailyLimit.toLocaleString()} usados hoje` : '0 de 0 usados hoje'}
              </p>
            </div>
          </div>

          {/* Footer do Sidebar */}
          <div className="mt-auto p-4 border-t border-slate-200 bg-slate-50">
            <div className="text-xs text-slate-500 text-center">
              <p className="font-medium">RetechHub API</p>
              <p className="mt-1">v1.0.0</p>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-8 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
