import PublicHeader from './public-header';
import PublicFooter from './public-footer';

// Casca padrão das páginas públicas (fundo claro): header com navegação, conteúdo, footer com hubs.
// Uso: <PublicShell><main>…</main></PublicShell> em server components.
export default function PublicShell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`min-h-screen bg-white text-slate-900 flex flex-col ${className}`}>
      <PublicHeader />
      <div className="flex-1">{children}</div>
      <PublicFooter />
    </div>
  );
}
