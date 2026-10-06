import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PublicShell from '@/components/seo/public-shell';
import Breadcrumb from '@/components/seo/breadcrumb';
import JsonLd from '@/components/seo/json-ld';
import { ORGANIZATION, SITE_URL, absoluteUrl } from '@/lib/seo/site';
import { BLOG_CATEGORIES, formatPostDate, getAllPosts, getPost, getRelatedPosts } from '@/lib/blog/posts';
import { Prose } from '../_components/article-ui';

import AlternativaViacep from './content/alternativa-viacep';
import ApiCepGratuita from './content/api-cep-gratuita';
import ConsultarCepGratis from './content/consultar-cep-gratis';
import ValidarCnpjReceitaFederal from './content/validar-cnpj-receita-federal';
import CrimesHediondosLista2026 from './content/crimes-hediondos-lista-2026';
import ArtigosMaisCitadosCodigoPenal from './content/artigos-mais-citados-codigo-penal';
import AutocompleteArtigosPenais from './content/autocomplete-artigos-penais';

const CONTENT: Record<string, ComponentType> = {
  'alternativa-viacep': AlternativaViacep,
  'api-cep-gratuita': ApiCepGratuita,
  'consultar-cep-gratis': ConsultarCepGratis,
  'validar-cnpj-receita-federal': ValidarCnpjReceitaFederal,
  'crimes-hediondos-lista-2026': CrimesHediondosLista2026,
  'artigos-mais-citados-codigo-penal': ArtigosMaisCitadosCodigoPenal,
  'autocomplete-artigos-penais': AutocompleteArtigosPenais,
};

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      siteName: 'RetechHub',
      locale: 'pt_BR',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [ORGANIZATION.url],
      section: BLOG_CATEGORIES[post.category].label,
      tags: post.keywords,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const Body = CONTENT[slug];
  if (!post || !Body) notFound();

  const category = BLOG_CATEGORIES[post.category];
  const related = getRelatedPosts(post.slug, 3);
  const url = absoluteUrl(`/blog/${post.slug}`);

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.description,
    inLanguage: 'pt-BR',
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    keywords: post.keywords.join(', '),
    articleSection: category.label,
    author: { '@type': 'Organization', name: ORGANIZATION.name, url: ORGANIZATION.url },
    publisher: {
      '@type': 'Organization',
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
      logo: { '@type': 'ImageObject', url: ORGANIZATION.logo },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: { '@type': 'Blog', '@id': `${SITE_URL}/blog` },
  };

  return (
    <PublicShell>
      <JsonLd data={articleLd} />
      <main className="container max-w-6xl mx-auto px-4 py-10 md:py-14">
        <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} className="mb-6" />

        <article className="max-w-3xl mx-auto">
          <header>
            <p className="text-sm font-medium text-emerald-700">{category.label}</p>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">{post.title}</h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">{post.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
              <span>
                Por <span className="text-slate-700 font-medium">The Retech</span>
              </span>
              <span>
                Publicado em <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
              </span>
              {post.updatedAt !== post.publishedAt && (
                <span>
                  Atualizado em <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt)}</time>
                </span>
              )}
              <span>{post.readingMinutes} min de leitura</span>
            </div>
          </header>

          <hr className="my-8 border-slate-200" />

          <Prose>
            <Body />
          </Prose>

          <section className="mt-14 rounded-2xl bg-slate-900 text-white p-7 md:p-9" aria-labelledby="cta-heading">
            <h2 id="cta-heading" className="text-2xl font-bold">
              Use esses dados na sua aplicação
            </h2>
            <p className="mt-2 text-slate-300">
              A {category.apiLabel} do RetechHub tem plano gratuito com 100 requisições por dia, chave de API em segundos e
              documentação com exemplos prontos. Sem cartão de crédito.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/painel/register" className="rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-5 py-2.5">
                Criar conta grátis
              </Link>
              <Link href={category.apiHref} className="rounded-lg border border-slate-600 hover:border-slate-400 px-5 py-2.5 font-medium">
                Conhecer a {category.apiLabel}
              </Link>
            </div>
          </section>

          <section className="mt-14" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-2xl font-bold text-slate-900 mb-5">
              Leia também
            </h2>
            <ul className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug} className="rounded-xl border border-slate-200 p-4 hover:border-emerald-300 transition">
                  <p className="text-xs text-slate-500 mb-1">{BLOG_CATEGORIES[r.category].label}</p>
                  <Link href={`/blog/${r.slug}`} className="font-semibold text-slate-900 hover:text-emerald-700 leading-snug">
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
    </PublicShell>
  );
}
