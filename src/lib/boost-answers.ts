import { boostCompanyEntryIds, boostEssentials, type BoostEntry } from '../data/boost-assistant.ts';

export type BoostAnswer = { kind: 'answer' | 'clarify' | 'privacy' | 'decline'; text: string; entry?: BoostEntry; alternatives: BoostEntry[] };

const normalize = (value: string) => value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/a\s*\+/g, 'aplus').replace(/\b(?:amazon|amzn)\s*bo+st\b/g, 'amazon boost').replace(/\bq\b/g, 'que');
const stop = new Set('a al algo alguna algunas alguno algunos amazon boost ante antes asi como con cual cuando de del desde donde el ella ellos en entre era es esa ese eso esta estan estar este esto estos fue ha hace hacia han hasta hay la las le les lo los me mi mis muy nada necesito no nos nosotros o os para pero por porque puedo puedes que quien quiero se ser si sin sobre solo son soy su sus tal te tengo tener ti tiene tienen todo tu tus un una uno unas unos usted ustedes y ya'.split(' '));
const aliases: Record<string, string> = {
  anuncios: 'publicidad', anuncio: 'publicidad', advertising: 'publicidad', ads: 'publicidad', ppc: 'publicidad',
  imagen: 'imagenes', foto: 'imagenes', fotos: 'imagenes', fotografia: 'imagenes',
  listings: 'listing', campana: 'campanas', ventas: 'venta', pedidos: 'pedido',
  bloqueada: 'bloqueo', bloqueado: 'bloqueo', suspendida: 'bloqueo', suspendido: 'bloqueo', suspension: 'bloqueo',
  contrasenas: 'contrasena', costes: 'coste', costos: 'coste', precios: 'precio',
  variantes: 'variante', variaciones: 'variante', roturas: 'rotura', retenido: 'retenidos',
};
const tokens = (value: string) => [...new Set((normalize(value).match(/[a-z0-9]+/g) ?? []).filter((word) => !stop.has(word) && word.length > 1).map((word) => aliases[word] ?? word))];
const sameQuestion = (value: string) => normalize(value).replace(/[^a-z0-9]+/g, ' ').trim();
const fundamentals: [RegExp, string][] = [
  [/\bseller central\b/, 'seller-central'],
  [/\b(marca privada|marca propia|private label)\b/, 'marca-privada'],
  [/\b(listings?|ficha de producto|listados?)\b/, 'listing-basico'],
  [/\b(amazon ads|ppc|publicidad|anuncios?)\b/, 'amazon-ads-basico'],
  [/^(?:(?:que es|como funciona|explicame|hablame de) (?:el |la )?)?amazon(?: marketplace)?$|\bque es (?:un |el )?marketplace\b/, 'amazon-general'],
];
const topics: [RegExp, string][] = [
  [/\b(fondos|retenid\w*|retiene|retencion|saldo)\b/, 'fondos-retenidos-amazon'],
  [/\b(bloque\w*|suspendid\w*|suspension|desactivad\w*|reactivar|apelacion)\b/, 'cuenta-amazon-suspendida'],
  [/\b(suprimid\w*|listing inactivo)\b/, 'listing-suprimido-amazon'],
  [/\b(varad\w*)\b/, 'inventario-varado-amazon'],
  [/\b(variantes?|variaciones|parent|child)\b/, 'variantes-amazon-parent-child'],
  [/\b(buy ?box|oferta destacada)\b/, 'buy-box-amazon-oferta-destacada'],
  [/\bimpresiones\b/, 'amazon-ads-sin-impresiones'],
  [/\b(negativas?|concordancia)\b/, 'palabras-clave-negativas-amazon'],
  [/\b(acos|tacos|roas)\b/, 'acos-tacos-amazon'],
  [/\b(imagen\w*|fotos?|fotografia|infografias?)\b/, 'imagenes-amazon-requisitos'],
  [/\b(aplus|a plus)\b/, 'contenido-a-plus-amazon'],
  [/\b(paneuropeo|efn)\b/, 'amazon-paneuropeo-o-efn'],
  [/\b(europa|francia|alemania|italia|expansion|internacional\w*|otros paises)\b/, 'preparar-catalogo-amazon-europa'],
  [/\b(stock|reposicion|reponer|agotad\w*|inventario)\b/, 'evitar-roturas-stock-amazon'],
  [/\b(fba|fbm|logistica)\b/, 'amazon-fba-fbm'],
  [/\b(cosmetica|cosmeticos|belleza|cremas|maquillaje)\b/, 'vender-cosmetica-amazon'],
  [/\b(mascotas|perros|gatos|animales|nutricion animal)\b/, 'vender-productos-mascotas-amazon'],
  [/\b(suplement\w*|complementos alimenticios|vitaminas)\b/, 'vender-complementos-alimenticios-amazon'],
  [/\b(brand registry|registr\w* marca|inscribir)\b/, 'brand-registry-amazon-requisitos'],
  [/\b(store|tienda de marca)\b/, 'amazon-store-marca'],
  [/\b(analytics|analitica)\b/, 'brand-analytics-amazon'],
  [/\b(business|b2b|mayorista)\b/, 'amazon-business-vender-empresas'],
  [/\b(suscrib\w*|suscripcion|recurren\w*)\b/, 'suscribete-y-ahorra-amazon-vendedores'],
  [/\b(devoluci\w*|devuelven)\b/, 'reducir-devoluciones-amazon'],
  [/\b(cambiar de agencia|cambiar agencia|relevo|traspaso)\b/, 'cambiar-agencia-amazon'],
  [/\b(tests?|pruebas|experimentos)\b.*\b(ab|a b|versiones)\b/, 'tests-ab-listings-amazon'],
  [/\b(seo|redactar|escribir|bullets|titulos?)\b/, 'como-redactar-listings-amazon'],
  [/\b(empezar|comenzar|lanzar|lanzamiento|desde cero)\b/, 'lanzar-producto-amazon-checklist'],
  [/\b(ppc|ads|publicidad|anuncios?|rentabilidad|margen)\b/, 'acos-tacos-amazon'],
  [/\b(visitas|conversion|ventas|pedidos)\b/, 'listing-amazon-visitas-sin-ventas'],
];
const fallback = (entries: BoostEntry[]): BoostAnswer => ({
  kind: 'clarify', text: 'Puedo ayudarte a conocer Amazon Boost y a resolver dudas sobre vender en Amazon: lanzamiento, publicidad, SEO, imágenes, catálogo, logística e incidencias. Para orientarte bien, ¿qué quieres saber o mejorar?',
  alternatives: entries.filter((entry) => ['acos-tacos-amazon', 'listing-amazon-visitas-sin-ventas', 'cuenta-amazon-suspendida'].includes(entry.id)),
});

export function answerBoostQuestion(question: string, entries: BoostEntry[], previousId?: string, contactOffered = false): BoostAnswer {
  const normalized = normalize(question).trim();
  const plain = sameQuestion(question);
  if (!normalized) return fallback(entries);
  const respond = (entry: BoostEntry): BoostAnswer => ({ kind: 'answer', text: entry.answer, entry, alternatives: [] });
  const essential = (id: string) => boostEssentials.find((entry) => entry.id === id)!;
  if (/\b(contrasena|password|otp|credenciales|codigo de acceso)\b/.test(normalized) || /\bsk-[a-z0-9_-]{12,}/i.test(question)) {
    return { kind: 'privacy', text: 'No compartas contraseñas, códigos de acceso ni claves privadas. Para revisar una cuenta, el equipo acuerda permisos delegados y un canal adecuado. Este asistente no necesita tus credenciales.', alternatives: [] };
  }
  const exactEntry = entries.find(entry => sameQuestion(entry.question) === sameQuestion(question));
  if (exactEntry) return respond(exactEntry);
  if (/\bno (quiero|me interesa|necesito)\b.*\b(contactar|hablar|auditoria|contacto)\b|\bsolo (quiero )?(informacion|leer|informarme)\b/.test(normalized)) return { kind: 'decline', text: 'Perfecto. Seguimos con la información, sin más propuestas de contacto en esta conversación. ¿Qué te gustaría aclarar?', alternatives: [] };
  if (contactOffered && /^(si|si gracias|me interesa|adelante|quiero solicitarla|de acuerdo)$/.test(sameQuestion(question))) return respond(essential('auditoria'));
  if (/^(hola|buenas|buenos dias|buenas tardes|buenas noches|hey)[!.,\s]*$/.test(normalized)) return { kind: 'clarify', text: 'Hola. ¿Qué te gustaría mejorar de tu cuenta de Amazon: publicidad, ventas, catálogo o stock?', alternatives: [] };
  if (/^(gracias|muchas gracias|perfecto|genial|vale)[!.,\s]*$/.test(normalized)) return { kind: 'clarify', text: 'Encantado. Puedes seguir con otra duda o explorar las guías.', alternatives: [] };
  if (/\b(eres|sois)\b.*\b(ia|bot|persona|humano|oficial|asistente)\b|\b(chatgpt|inteligencia artificial)\b|\b(?:eres|sois) (?:de )?amazon$/.test(plain)) return respond(essential('asistente'));
  if (/\b(que hace amazon boost|que haceis|que ofreceis|vuestros servicios|servicios de amazon boost)\b/.test(normalized)) return respond(essential('servicios'));
  if (/\b(garantiz|garantia|garantizado|asegura|promete)/.test(normalized)) return respond(essential('resultados'));
  if (/\b(hablar|contactar|contacto|llamar|telefono|whatsapp)\b/.test(normalized)) return respond(essential('contacto'));
  if (/\b(cobrais|honorarios|tarifas?|presupuesto agencia)\b|\bcuanto (cuesta|vale|costaria)\b/.test(normalized) && !/\b(fba|envio|logistica|vender en amazon)\b/.test(normalized)) return respond(essential('honorarios'));
  if (/\b(auditoria|diagnostico)\b/.test(normalized)) return respond(essential('auditoria'));
  if (/\b(consulta|consultar|muestra|muestrame|dime|ver|acceso)\b.*\b(mi cuenta|mis ventas|mi saldo|mis pedidos)\b/.test(normalized)) return { kind: 'clarify', text: 'No tengo acceso a tu cuenta, tus pedidos ni tus cifras. Puedo orientarte con las guías publicadas; para un diagnóstico con tus datos, solicita una auditoría al equipo.', alternatives: [] };
  // Recognize agency identity before keyword scoring removes generic brand words.
  if (/\b(sergio|vuestro equipo)\b/.test(plain)
    || /\b(fundador|fundo|quien creo|quien dirige|quien esta detras)\b/.test(plain) && (!/\bamazon\b/.test(plain) || /\bamazon boost\b/.test(plain))) return respond(essential('equipo'));
  if (/\b(como (?:lo )?(?:trabajais|haceis)|forma de trabajar|vuestro metodo|vuestro enfoque|como os organizais|por que (?:deberia )?elegiros|que os diferencia|que os hace diferentes)\b/.test(plain)) return respond(essential('enfoque'));
  if (/\b(que|cuales|con que|en que)\b.*\b(paises|mercados|marcas|clientes|sectores)\b.*\b(trabajais|operais|ayudais|especializais)\b/.test(plain)) return respond(essential('mercados'));
  if (/^amazon boost$|\b(?:que es|quien es|quienes son|conoces|conoceis|hablame de|cuentame (?:sobre|que es)|informacion (?:sobre|de)|presentame a) amazon boost\b|\b(?:quienes sois|quien sois|quienes son ustedes|a que os dedicais|que agencia sois|sois una agencia|sobre vosotros|vuestra agencia)\b/.test(plain)) return respond(essential('agencia'));
  if (/\b(que haceis|que ofreceis|que servicios|que podeis hacer|como (?:me )?(?:podeis|puede amazon boost) ayudar|en que (?:me )?(?:ayudais|podeis ayudar|puede ayudar amazon boost))\b/.test(plain)
    && !/\b(ppc|ads|imagenes|fotos|listing|fba|fbm|bloqueo|suspendida)\b/.test(plain)) return respond(essential('servicios'));
  if (/\b(gestion integral|gestionar (?:toda )?mi cuenta|delegar (?:toda )?(?:la|mi) cuenta)\b/.test(plain)) {
    const service = entries.find(entry => entry.id === '/servicios/gestion-de-cuenta/');
    if (service) return respond(service);
  }
  // Definitions need an explanation of the concept, not a troubleshooting article.
  const definition = /\b(que (?:es|son|significa)|en que consiste|como funciona|explicame|hablame de)\b/.test(plain)
    && !/\b(problema|falla|baj[oa]|alt[oa]|mucho|sin|no)\b/.test(plain);
  if (definition || /^(amazon(?: marketplace)?|seller central|marca privada|private label|listing|amazon ads|ppc)$/.test(plain)) {
    for (const [pattern, id] of fundamentals) {
      const entry = entries.find(item => item.id === id);
      if (entry && pattern.test(plain)) return respond(entry);
    }
  }
  for (const [pattern, id] of topics) {
    const entry = entries.find(item => item.id === id);
    if (entry && pattern.test(normalized)) return respond(entry);
  }

  const query = tokens(question);
  if (!query.length) return fallback(entries);
  const documents = entries.filter(entry => !boostCompanyEntryIds.has(entry.id)).map((entry) => ({ entry, words: tokens(`${entry.question} ${entry.keywords}`), title: tokens(entry.question) }));
  const frequency = new Map(query.map((word) => [word, documents.filter((doc) => doc.words.includes(word)).length]));
  const ranked = documents.map((doc) => {
    const hits = query.filter((word) => doc.words.includes(word));
    const score = hits.reduce((sum, word) => sum + Math.log(1 + documents.length / (1 + frequency.get(word)!)) * (doc.title.includes(word) ? 1.3 : 1), 0);
    const exact = normalize(doc.entry.question) === normalized ? 30 : 0;
    const contextual = previousId && doc.entry.id.startsWith(previousId.split(':faq:')[0]) ? .3 : 0;
    const partialFaq = doc.entry.id.includes(':faq:') && hits.length / Math.max(doc.title.length, 1) < .55;
    return { ...doc, hits, score: score * (partialFaq ? .25 : 1) + exact + (hits.length ? contextual : 0) };
  }).filter((doc) => doc.hits.length > 0).sort((a, b) => b.score - a.score);
  const top = ranked[0];
  // A shared generic word is not enough to claim that a different question was answered.
  if (!top || (top.hits.length < 2 && query.length > 1)) return fallback(entries);
  if (top.entry.id.includes(':faq:') && top.hits.length / Math.max(top.title.length, 1) < .55) {
    const general = entries.find((entry) => entry.id === top.entry.id.split(':faq:')[0]);
    if (general) return respond(general);
    return { kind: 'clarify', text: 'He encontrado una pregunta relacionada. Puedes elegirla para consultar la respuesta exacta o concretar un poco más tu duda.', alternatives: ranked.slice(0, 2).map((doc) => doc.entry) };
  }
  return respond(top.entry);
}

export function validBoostEntries(payload: unknown): BoostEntry[] {
  const safeLink = (value: any) => value && typeof value.label === 'string' && typeof value.href === 'string' && /^\/(?!\/)[a-z0-9/#-]*$/.test(value.href);
  if (!payload || typeof payload !== 'object' || (payload as any).version !== 1 || !Array.isArray((payload as any).entries)) throw new Error('Invalid knowledge');
  const entries = (payload as any).entries;
  if (!entries.length || entries.length > 300 || !entries.every((entry: any) => entry && ['id', 'question', 'answer', 'keywords'].every(key => typeof entry[key] === 'string' && entry[key].length < 3000) && safeLink(entry.source) && (!entry.related || safeLink(entry.related)))) throw new Error('Invalid entries');
  return entries;
}
