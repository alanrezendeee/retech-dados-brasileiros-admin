import JsonLd from './json-ld';

export interface FaqItem {
  question: string;
  answer: string; // texto puro (usado no JSON-LD); pode conter quebras de linha
  answerNode?: React.ReactNode; // opcional: versão com markup para exibição
}

// FAQ sempre visível no HTML (sem acordeão fechado) + JSON-LD FAQPage.
// O Google só considera o texto que está no DOM renderizado; acordeões fechados do Radix
// não renderizam o conteúdo, por isso usamos <details open> nativo.
export default function Faq({ items, title = 'Perguntas frequentes', className = '' }: { items: FaqItem[]; title?: string; className?: string }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    })),
  };
  return (
    <section className={className} aria-labelledby="faq-heading">
      <JsonLd data={ld} />
      <h2 id="faq-heading" className="text-3xl font-bold mb-8">
        {title}
      </h2>
      <div className="space-y-4">
        {items.map((i, idx) => (
          <details key={idx} open className="group rounded-xl border border-slate-200 bg-white p-5">
            <summary className="cursor-pointer text-lg font-semibold text-slate-900 list-none flex justify-between items-center">
              <span>{i.question}</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform" aria-hidden="true">
                ▾
              </span>
            </summary>
            <div className="mt-3 text-slate-600 leading-relaxed space-y-2">
              {i.answerNode ?? i.answer.split('\n').map((p, k) => <p key={k}>{p}</p>)}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
