import Link from 'next/link';
import PublicShell from '@/components/seo/public-shell';
import Breadcrumb from '@/components/seo/breadcrumb';
import JsonLd from '@/components/seo/json-ld';
import { ORGANIZATION, SITE_URL, absoluteUrl } from '@/lib/seo/site';
import { BLOG_CATEGORIES, getAllPosts, getPostsByCategory, formatPostDate, type BlogCategory, type BlogPost } from '@/lib/blog/posts';

const CATEGORY_ORDER: BlogCategory[] = ['cep', 'penal', 'cnpj'];

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col gap-3 hover:border-emerald-300 hover:shadow-sm transition">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingMinutes} min de leitura</span>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 leading-snug">
        <Link href={`/blog/${post.slug}`} className="hover:text-emerald-700">
          {post.title}
        </Link>
      </h3>
      <p className="text-sm text-slate-600 leading-relaxed">{post.description}</p>
      <Link href={`/blog/${post.slug}`} className="mt-auto text-sm font-medium text-emerald-700 hover:underline">
        Ler artigo →
      </Link>
    </article>
  );
}

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog`,
    url: `${SITE_URL}/blog`,
    name: 'Blog Retech Core',
    description: 'Tutoriais e guias sobre CEP, CNPJ e artigos penais para desenvolvedores e equipes jurídicas.',
    inLanguage: 'pt-BR',
    publisher: { '@type': 'Organization', name: ORGANIZATION.name, url: ORGANIZATION.url, logo: { '@type': 'ImageObject', url: ORGANIZATION.logo } },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: absoluteUrl(`/blog/${p.slug}`),
      datePublished: p.publishedAt,
      dateModified: p.updatedAt,
    })),
  };

  return (
    <PublicShell>
      <JsonLd data={ld} />
      <main className="container max-w-6xl mx-auto px-4 py-10 md:py-14">
        <Breadcrumb items={[{ label: 'Blog' }]} className="mb-6" />

        <header className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Blog Retech Core</h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Guias práticos sobre dados brasileiros para quem constrói software: CEP, CNPJ e Código Penal explicados do jeito que um
            desenvolvedor ou um analista precisa usar no dia a dia.
          </p>
        </header>

        <section className="mt-8 max-w-3xl text-slate-700 leading-relaxed space-y-4">
          <p>
            Este blog nasceu das dúvidas que recebemos de quem integra a <Link href="/apis/cep" className="text-emerald-700 underline">API de CEP</Link>, a{' '}
            <Link href="/apis/penal" className="text-emerald-700 underline">API de Artigos Penais</Link> e as{' '}
            <Link href="/ferramentas/consultar-cep" className="text-emerald-700 underline">ferramentas gratuitas</Link> da Retech Core. Em vez de
            responder a mesma pergunta por e-mail dezenas de vezes, documentamos aqui o que aprendemos mantendo uma base de CEPs com
            múltiplas fontes, um validador de CNPJ e uma coleção de 2.438 dispositivos penais do Código Penal e de 35 leis especiais.
          </p>
          <p>
            Os textos são escritos para serem úteis mesmo para quem nunca vai usar a nossa API: explicamos como o CEP brasileiro é
            estruturado, como funciona o cálculo dos dígitos verificadores do CNPJ e quais são os crimes hediondos previstos na Lei
            8.072/1990, sempre com a redação atual e com links para a página de cada artigo. Quando há código, ele está em JavaScript,
            PHP ou Python e pode ser copiado e executado como está.
          </p>
          <p>
            Os artigos são organizados em três trilhas: endereços e CEP, direito penal e dados de empresas. Cada post indica a data de
            publicação e de última revisão, e mantemos os conteúdos legais alinhados à base que alimenta a página{' '}
            <Link href="/penal/artigos" className="text-emerald-700 underline">Código Penal por artigo</Link>.
          </p>
        </section>

        {CATEGORY_ORDER.map((cat) => {
          const list = getPostsByCategory(cat);
          if (list.length === 0) return null;
          const meta = BLOG_CATEGORIES[cat];
          return (
            <section key={cat} className="mt-14" aria-labelledby={`cat-${cat}`}>
              <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
                <div>
                  <h2 id={`cat-${cat}`} className="text-2xl font-bold text-slate-900">
                    {meta.label}
                  </h2>
                  <p className="text-slate-600 mt-1">{meta.description}</p>
                </div>
                <Link href={meta.apiHref} className="text-sm font-medium text-emerald-700 hover:underline">
                  {meta.apiLabel} →
                </Link>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {list.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </section>
          );
        })}

        <section className="mt-16 rounded-2xl bg-slate-900 text-white p-8 md:p-10">
          <h2 className="text-2xl font-bold">Prefere testar em vez de ler?</h2>
          <p className="mt-2 text-slate-300 max-w-2xl">
            Crie uma conta gratuita, gere sua chave e faça até 100 requisições por dia na API de CEP, CNPJ, geografia e artigos
            penais. Sem cartão de crédito.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/painel/register" className="rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-5 py-2.5">
              Criar conta grátis
            </Link>
            <Link href="/playground" className="rounded-lg border border-slate-600 hover:border-slate-400 px-5 py-2.5 font-medium">
              Abrir o playground
            </Link>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
