'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { register as registerAPI } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Eye, EyeOff, Loader2, Sparkles } from 'lucide-react';

const registerSchema = z.object({
  // Empresa/Tenant
  tenantName: z.string().min(2, 'Nome da empresa muito curto'),
  tenantEmail: z.string().email('Email inválido'),
  company: z.string().optional(),
  purpose: z.string().optional(),
  
  // Usuário
  userName: z.string().min(2, 'Nome muito curto'),
  userEmail: z.string().email('Email inválido'),
  userPassword: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.userPassword === data.confirmPassword, {
  message: 'Senhas não conferem',
  path: ['confirmPassword'],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function PainelRegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true);
      setError('');

      const response = await registerAPI({
        tenantName: data.tenantName,
        tenantEmail: data.tenantEmail,
        company: data.company,
        purpose: data.purpose,
        userName: data.userName,
        userEmail: data.userEmail,
        userPassword: data.userPassword,
      });

      // Salvar autenticação
      setAuth(response.user, response.accessToken, response.refreshToken);

      // Pequeno delay para garantir que o estado foi salvo
      await new Promise(resolve => setTimeout(resolve, 100));

      // Redirecionar para dashboard
      router.push('/painel/dashboard');
    } catch (err: any) {
      console.error('Erro no registro:', err);
      setError(err.response?.data?.detail || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Criar Conta Gratuita
          </h1>
          <p className="text-slate-600">
            Comece a usar a Retech Core API em segundos
          </p>
        </div>

        {/* Card de Registro */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Dados da Empresa */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-slate-900">Dados da Empresa</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tenantName" className="text-slate-700 font-medium">
                    Nome da Empresa <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="tenantName"
                    placeholder="Minha Startup"
                    className="h-12 text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register('tenantName')}
                    disabled={loading}
                  />
                  {errors.tenantName && (
                    <p className="text-sm text-red-500">{errors.tenantName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tenantEmail" className="text-slate-700 font-medium">
                    Email da Empresa <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="tenantEmail"
                    type="email"
                    placeholder="contato@startup.com"
                    className="h-12 text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register('tenantEmail')}
                    disabled={loading}
                  />
                  {errors.tenantEmail && (
                    <p className="text-sm text-red-500">{errors.tenantEmail.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-slate-700 font-medium">
                    Razão Social (opcional)
                  </Label>
                  <Input
                    id="company"
                    placeholder="Startup LTDA"
                    className="h-12 text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register('company')}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose" className="text-slate-700 font-medium">
                    Para que vai usar? (opcional)
                  </Label>
                  <Input
                    id="purpose"
                    placeholder="App mobile, site, etc"
                    className="h-12 text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register('purpose')}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Separador */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
            </div>

            {/* Dados do Usuário */}
            <div className="space-y-6 pt-6">
              <h3 className="text-xl font-semibold text-slate-900">Seus Dados</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="userName" className="text-slate-700 font-medium">
                    Seu Nome <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="userName"
                    placeholder="João Silva"
                    className="h-12 text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register('userName')}
                    disabled={loading}
                  />
                  {errors.userName && (
                    <p className="text-sm text-red-500">{errors.userName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userEmail" className="text-slate-700 font-medium">
                    Seu Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="userEmail"
                    type="email"
                    placeholder="joao@startup.com"
                    className="h-12 text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register('userEmail')}
                    disabled={loading}
                  />
                  {errors.userEmail && (
                    <p className="text-sm text-red-500">{errors.userEmail.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="userPassword" className="text-slate-700 font-medium">
                    Senha <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="userPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="h-12 text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
                      {...register('userPassword')}
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
                  {errors.userPassword && (
                    <p className="text-sm text-red-500">{errors.userPassword.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">
                    Confirmar Senha <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="h-12 text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
                      {...register('confirmPassword')}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Plano Free */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-2">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-2">Plano Free incluso:</h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                      <strong>100 requisições/dia</strong>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                      4 APIs (CEP, CNPJ, Geografia, Penal)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                      Cache 3 camadas + Dashboard
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                      Documentação completa
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                      Sem cartão de crédito
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Botão de Registro */}
            <Button 
              type="submit" 
              className="w-full h-14 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Criando conta...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Criar Conta Gratuita
                </>
              )}
            </Button>
          </form>

          {/* Link para login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Já tem uma conta?{' '}
              <Link 
                href="/painel/login" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Fazer login
              </Link>
            </p>
          </div>

          {/* Termos */}
          <div className="mt-6 text-center text-xs text-slate-500">
            Ao criar uma conta, você concorda com nossos{' '}
            <Link href="/termos" className="text-blue-600 hover:text-blue-700 underline">
              Termos de Uso
            </Link>{' '}
            e{' '}
            <Link href="/privacidade" className="text-blue-600 hover:text-blue-700 underline">
              Política de Privacidade
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>© 2025 Retech Core. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
