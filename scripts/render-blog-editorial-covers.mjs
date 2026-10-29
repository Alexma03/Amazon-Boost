import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const output = new URL('../public/images/blog-editorial/', import.meta.url);
const fontfile = fileURLToPath(new URL('./assets/InterVariable.ttf', import.meta.url));
mkdirSync(output, { recursive: true });
const ink = '#080808';
const orange = '#ff9900';
const blue = '#78a8ff';
const lime = '#c9ff4a';
const definitions = [
  { slug: 'formar-equipo-o-delegar-amazon', title: '¿Quién se ocupa del trabajo?', label: 'FORMACIÓN O GESTIÓN AMAZON', type: 'compare', columns: ['Formar a tu equipo', 'Delegar en la agencia'], rows: [['Aprende con acompañamiento', 'Asume las tareas acordadas'], ['Aplica en vuestra cuenta', 'Realiza su seguimiento'], ['Conserva el conocimiento', 'Coordina contigo las decisiones']], note: 'También puedes combinar. Primero, define qué necesita tu empresa.' },
  { slug: 'crecer-amazon-facturacion-solidez', title: 'Crecer no es solo facturar.', label: 'ESTRATEGIA DE MARCA', type: 'flow', nodes: ['Ventas', 'Contribución', 'Caja', 'Continuidad'], note: 'La siguiente venta también necesita recursos.' },
  { slug: 'catalogo-corto-ventaja-marca-amazon', title: 'Cada referencia, una función.', label: 'CATÁLOGO', type: 'compare', columns: ['Más referencias', 'Una gama con sentido'], rows: [['Más tareas y stock', 'Necesidades distintas'], ['Atención repartida', 'Prioridades claras'], ['Complejidad adicional', 'Recursos para servirla']], note: 'El tamaño de la gama no sustituye su propósito.' },
  { slug: 'marca-premium-amazon-valor-precio', title: 'El valor necesita una razón.', label: 'MARCA Y CONTENIDO', type: 'flow', nodes: ['Diferencia', 'Evidencia', 'Claridad', 'Elección'], note: 'Premium se explica en el producto, no en el adjetivo.' },
  { slug: 'promociones-amazon-dependencia-descuentos', title: 'Más allá del pico de ventas.', label: 'PROMOCIONES', type: 'compare', columns: ['Durante la promoción', 'Después de la promoción'], rows: [['Pedidos y precio efectivo', 'Respuesta al precio habitual'], ['Contribución y gasto', 'Devoluciones y disponibilidad'], ['Objetivo de la acción', 'Decisión de repetir o ajustar']], note: 'Leer el periodo completo antes de sacar conclusiones.' },
  { slug: 'automatizar-amazon-control-decisiones', title: 'Automatizar con criterio.', label: 'GESTIÓN DE CUENTA', type: 'flow', nodes: ['Dato', 'Regla', 'Límite', 'Revisión'], note: 'La ejecución se delega; la responsabilidad se conserva.' },
  { slug: 'dejar-productos-amazon-coste-oportunidad', title: 'Dónde invertir lo siguiente.', label: 'RECURSOS Y CATÁLOGO', type: 'compare', columns: ['Lo que ya invertiste', 'Lo que puedes decidir'], rows: [['Diseño y lanzamiento', 'Siguiente compra'], ['Compras anteriores', 'Costes que cambiarían'], ['Historia del producto', 'Alternativas y caja']], note: 'El gasto pasado no decide por la próxima inversión.' },
  { slug: 'promedios-amazon-ocultan-problemas', title: 'El promedio no lo cuenta todo.', label: 'LECTURA DE DATOS', type: 'flow', nodes: ['Cuenta', 'Mezcla', 'Referencia', 'Decisión'], note: 'Abrir el agregado cuando puede cambiar una prioridad.' },
  { slug: 'promesa-marca-ficha-producto-entrega', title: 'Una promesa coherente.', label: 'EXPERIENCIA DE MARCA', type: 'flow', nodes: ['Ficha', 'Expectativa', 'Producto', 'Entrega'], note: 'Lo que llega debe corresponder con lo que se entendió.' },
  { slug: 'cuenta-saludable-amazon-no-negocio-rentable', title: 'Dos revisiones necesarias.', label: 'SALUD DE CUENTA Y NEGOCIO', type: 'compare', columns: ['Cumplimiento', 'Economía'], rows: [['Avisos y documentación', 'Contribución y costes'], ['Políticas aplicables', 'Caja y compromisos'], ['Continuidad operativa', 'Viabilidad de la inversión']], note: 'Un panel sin alertas no equivale a beneficio.' },
  { slug: 'agencia-boutique-amazon-responsabilidad', title: 'Cercanía con responsabilidad.', label: 'AGENCIA BOUTIQUE', type: 'flow', nodes: ['Contexto', 'Alcance', 'Prioridades', 'Seguimiento'], note: 'Una marca, un contexto y decisiones que se entienden.' },
];

const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
async function text(value, x, y, size, color, width, align = 'left') {
  const input = await sharp({ text: { text: `<span foreground="${color}">${escape(value)}</span>`, font: `Inter Variable Bold ${size}`, fontfile, rgba: true, width, align } }).png().toBuffer();
  return { input, left: x, top: y };
}

const requestedSlug = process.argv.find((value) => value.startsWith('--only='))?.slice('--only='.length);
if (requestedSlug && !definitions.some((definition) => definition.slug === requestedSlug)) throw new Error('Unknown editorial cover: ' + requestedSlug);
for (const definition of definitions.filter((definition) => !requestedSlug || definition.slug === requestedSlug)) {
  const layers = [];
  let geometry = `<rect width="1200" height="630" fill="${ink}"/><path d="M64 105H1136M64 550H1136" stroke="#363636" stroke-width="2"/>`;
  layers.push(await text('Amazon Boost.', 64, 40, 26, '#ffffff', 360));
  layers.push(await text(definition.label, 64, 136, 18, orange, 1072));
  layers.push(await text(definition.title, 64, 180, 49, '#ffffff', 1072));
  if (definition.type === 'flow') {
    for (let i = 0; i < 4; i++) {
      const x = 64 + i * 278;
      const fill = i === 0 ? orange : i === 3 ? lime : '#171717';
      const color = i === 0 || i === 3 ? ink : '#ffffff';
      geometry += `<rect x="${x}" y="337" width="238" height="108" rx="4" fill="${fill}" stroke="${i === 1 || i === 2 ? '#5c5c5c' : fill}" stroke-width="2"/>`;
      layers.push(await text(definition.nodes[i], x + 14, 375, 25, color, 210, 'center'));
      if (i < 3) geometry += `<path d="M${x + 248} 391h20m-8-7 8 7-8 7" fill="none" stroke="${blue}" stroke-width="3"/>`;
    }
  } else {
    const columns = [64, 626];
    for (let i = 0; i < 2; i++) {
      const x = columns[i];
      geometry += `<rect x="${x}" y="278" width="510" height="53" rx="4" fill="${i === 0 ? blue : orange}"/>`;
      layers.push(await text(definition.columns[i], x + 18, 292, 24, ink, 474));
      for (let row = 0; row < 3; row++) {
        const y = 353 + row * 58;
        geometry += `<path d="M${x} ${y + 40}h510" stroke="#363636" stroke-width="1"/>`;
        layers.push(await text(definition.rows[row][i], x + 2, y, 22, '#eeeeee', 506));
      }
    }
  }
  layers.push(await text(definition.note, 64, 578, 21, '#c7c7c7', 1072));
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">${geometry}</svg>`);
  const file = fileURLToPath(new URL(definition.slug + '.webp', output));
  await sharp(svg).composite(layers).webp({ quality: 92, effort: 6 }).toFile(file);
  console.log(definition.slug);
}
