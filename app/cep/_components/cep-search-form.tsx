// Formulário HTML puro (sem JS): GET /cep/consulta?cep=… funciona para crawlers e sem hidratação.
export default function CepSearchForm({
  defaultValue = '',
  label = 'Digite um CEP',
  compact = false,
}: {
  defaultValue?: string;
  label?: string;
  compact?: boolean;
}) {
  return (
    <form action="/cep/consulta" method="get" className={compact ? 'flex gap-2' : 'flex flex-col sm:flex-row gap-3'} role="search">
      <label htmlFor="cep-input" className="sr-only">
        {label}
      </label>
      <input
        id="cep-input"
        name="cep"
        type="text"
        inputMode="numeric"
        autoComplete="postal-code"
        pattern="[0-9]{5}-?[0-9]{3}"
        title="Informe um CEP com 8 dígitos, ex.: 01001-000"
        placeholder="Ex.: 01001-000"
        defaultValue={defaultValue}
        required
        maxLength={9}
        className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <button
        type="submit"
        className="rounded-lg bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-900 hover:bg-emerald-400 transition-colors"
      >
        Consultar CEP
      </button>
    </form>
  );
}
