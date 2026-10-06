'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      setError('');

      console.log('🔐 Tentando login...', data.email);
      const response = await login(data);
      console.log('✅ Login response:', response);
      
      // Verificar se é super admin
      if (response.user.role !== 'SUPER_ADMIN') {
        setError('Acesso negado. Apenas super administradores podem acessar.');
        return;
      }

      console.log('👤 Salvando auth no store...', response.user);
      
      // Salvar autenticação
      setAuth(response.user, response.accessToken, response.refreshToken);

      // Aguardar um pouco para garantir que salvou
      await new Promise(resolve => setTimeout(resolve, 100));

      console.log('📍 Redirecionando para dashboard...');
      
      // Redirecionar para dashboard
      router.push('/admin/dashboard');
    } catch (err: any) {
      console.error('❌ Erro no login:', err);
      setError(err.response?.data?.detail || 'Email ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg mb-4">
            <span className="text-white font-bold text-2xl">RT</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Acesse sua conta
          </h1>
          <p className="text-slate-600">
            Quer saber mais sobre nós?{' '}
            <Link href="/sobre" className="text-blue-600 hover:text-blue-700 font-medium">
              Clique aqui
            </Link>
          </p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                Endereço de e-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="demo@minimals.cc"
                className="h-12 text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                {...register('email')}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700 font-medium">
                  Senha
                </Label>
                <Link 
                  href="/admin/recuperar-senha" 
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="h-12 text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
                  {...register('password')}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Erro */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Botão de Login */}
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          {/* Link para desenvolvedor */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Não é administrador?{' '}
              <Link 
                href="/painel/login" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Acessar portal do desenvolvedor
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>© 2025 RetechHub. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
