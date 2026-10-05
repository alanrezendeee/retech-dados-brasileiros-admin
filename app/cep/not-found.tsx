import Link from 'next/link';
import PublicShell from '@/components/seo/public-shell';
import Breadcrumb from '@/components/seo/breadcrumb';
import CepSearchForm from './_components/cep-search-form';

// 404 amigável para /cep/*: CEP inexistente, UF ou cidade que não resolve.
// O Next responde com status 404 ao usar notFound() nas páginas deste segmento.
export default function CepNotFound() {
  return (
    <PublicShell>
      <main className="container max-w-3xl mx-auto px-4 py-12">
        <Breadcrumb items={[{ label: 'CEP', href: '/cep' }, { label: 'Não encontrado' }]} className="mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">CEP, estado ou cidade não encontrado</h1>
        <p className="text-slate-600 leading-relaxed mb-6">
          Não encontramos o endereço que você procurou. Isso pode acontecer quando o CEP tem menos de 8 dígitos, ainda
          não foi atribuído pelos Correios, foi desativado, ou quando a sigla do estado ou o nome da cidade estão
          escritos de forma diferente da grafia oficial do IBGE.
        </p>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-3">Tente consultar outro CEP</h2>
          <CepSearchForm />
        </div>
        <h2 className="text-lg font-semibold mb-3">Outras formas de encontrar o endereço</h2>
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li>
            <Link href="/cep" className="text-emerald-700 hover:underline">
              Navegar por estado e cidade
            </Link>{' '}
            até chegar ao município desejado.
          </li>
          <li>
            <Link href="/ferramentas/buscar-cep" className="text-emerald-700 hover:underline">
              Buscar o CEP pelo nome da rua
            </Link>{' '}
            informando UF, cidade e logradouro.
          </li>
          <li>
            <Link href="/ferramentas/consultar-cep" className="text-emerald-700 hover:underline">
              Usar a ferramenta de consulta de CEP
            </Link>{' '}
            com validação em tempo real.
          </li>
          <li>
            Integrar a{' '}
            <Link href="/apis/cep" className="text-emerald-700 hover:underline">
              API de CEP
            </Link>{' '}
            no seu sistema.
          </li>
        </ul>
      </main>
    </PublicShell>
  );
}
