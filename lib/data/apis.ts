export type ApiStatus = 'live' | 'soon' | 'future';

export interface ApiCatalogItem {
  name: string;
  status: ApiStatus;
  desc: string;
  icon: string;
}

export const apiCatalog: ApiCatalogItem[] = [
  { name: 'Consulta de CEP', status: 'live', desc: '3 fontes + fallback automático', icon: '📮' },
  { name: 'Busca Reversa de CEP', status: 'live', desc: 'Endereço → CEP direto', icon: '🔍' },
  { name: 'Validação de CNPJ', status: 'live', desc: 'Receita Federal + QSA + CNAEs', icon: '🏢' },
  { name: 'Artigos Penais', status: 'live', desc: 'CP + LCP — 122 artigos', icon: '⚖️' },
  { name: 'Estados e Municípios', status: 'live', desc: 'IBGE — UFs e cidades', icon: '🗺️' },
  { name: 'Validação de Telefone', status: 'soon', desc: 'Operadora + tipo de linha', icon: '📞' },
  { name: 'Cotação de Moedas', status: 'soon', desc: 'Dólar, Euro, Bitcoin', icon: '💵' },
  { name: 'Tabela FIPE', status: 'soon', desc: 'Preços de veículos', icon: '🚗' },
  { name: 'Bancos Brasileiros', status: 'soon', desc: 'Códigos COMPE / ISPB', icon: '🏦' },
  { name: 'Feriados Nacionais', status: 'soon', desc: 'Calendário + estaduais', icon: '📅' },
  { name: 'Validação de CPF', status: 'soon', desc: 'Situação na Receita Federal', icon: '🪪' },
  { name: 'SELIC / CDI / IPCA', status: 'future', desc: 'Taxas Banco Central', icon: '📈' },
  { name: 'Rastreamento Correios', status: 'future', desc: 'Objetos por código', icon: '📦' },
  { name: 'Dados Judiciais', status: 'future', desc: 'Processos PJe + TJs', icon: '🏛️' },
  { name: 'Portal Transparência', status: 'future', desc: 'Licitações e convênios', icon: '📋' },
  { name: 'Pix QR Code', status: 'future', desc: 'Geração de QR Code estático', icon: '📱' },
];

export const totalApis = apiCatalog.length;
export const liveApis = apiCatalog.filter((a) => a.status === 'live').length;
export const apiProgressPct = Math.round((liveApis / totalApis) * 100);
