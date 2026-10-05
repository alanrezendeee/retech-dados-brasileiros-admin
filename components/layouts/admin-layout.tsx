'use client';

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
  Users, 
  Key, 
  BarChart3, 
  Settings,
  LogOut,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Tenants', href: '/admin/tenants', icon: Users },
    { name: 'API Keys', href: '/admin/apikeys', icon: Key },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Configurações', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">RT</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Retech Admin
                </h1>
                <p className="text-sm text-slate-500">Painel Administrativo</p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                      {user?.name?.substring(0, 2).toUpperCase() || 'AD'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name || 'Admin'}</p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        SUPER ADMIN
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/admin/profile')}>
                  <User className="w-4 h-4 mr-2" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/admin/settings')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
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
