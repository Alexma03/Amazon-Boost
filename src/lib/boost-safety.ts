import type { BoostAnswer } from './boost-answers.ts';

export const normalizeBoostText = (text: string) => text.normalize('NFKC').replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u2069\uFEFF]/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export function checkBoostQuestion(question: string): BoostAnswer | undefined {
  const text = normalizeBoostText(question);
  const reject = (message: string, kind: 'privacy' | 'clarify' = 'clarify'): BoostAnswer => ({ kind, text: message, alternatives: [] });
  if (/\b(?:sk-[\w-]{8,}|password|contrasena|credenciales|otp|api.?key|clave privada|iban|dni|tarjeta de credito)\b/.test(text)
    || /[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(text)
    || /\b(?:\+?\d[\s().-]?){9,}\b/.test(text)) {
    return reject('No envíes datos personales, contraseñas, claves ni documentos de la cuenta. Describe el problema sin esos datos; el equipo acordará contigo un canal adecuado si necesita revisar tu caso.', 'privacy');
  }
  if (/https?:\/\/|www\.|javascript:|data:|<[^>]+>|```/i.test(text)) {
    return reject('Describe tu duda sobre Amazon con palabras, sin enlaces, código ni documentos. No puedo abrir páginas o ejecutar instrucciones.');
  }
  if (/ignora.{0,45}(instrucc|regla|anterior)|ignore.{0,45}(instruction|previous|rule)|system.?prompt|prompt.{0,25}(sistema|interno)|instrucciones internas|revela.{0,25}(prompt|secreto)|developer message|\[inst\]|<\|im_|base64|rot13|jailbreak|actua como|act as|olvida.{0,30}(regla|instrucc)/.test(text)
    || /[a-z0-9+/=_-]{90,}/i.test(text)) {
    return reject('Puedo orientarte sobre los servicios de Amazon Boost y nuestras guías para vender en Amazon. No puedo cambiar mis reglas ni revelar instrucciones internas. ¿Qué necesitas mejorar en tu cuenta?');
  }
  if (/(resenas?|reviews?).{0,50}(fals|invent|comprad|fabricad)|(?:invent|compr|fabric).{0,50}(resenas?|reviews?)|(?:evadir|eludir|saltarse|burlar).{0,40}(control|suspension|norma|verificacion)|(?:falsificar|falsifica|documentos falsos)|hackear|robar|phishing|malware/.test(text)) {
    return reject('No ayudo a fabricar reseñas, falsificar documentos ni eludir controles de Amazon. Sí puedo orientarte para corregir incidencias con información veraz y solicitar opiniones auténticas.');
  }
  if (/\b(dosis|dosificacion|receta medica|diagnostico medico|curar|tratamiento medico|evadir impuestos|asesoramiento juridico)\b/.test(text)) {
    return reject('Mi ámbito es la gestión comercial de Amazon. Las decisiones médicas, jurídicas o fiscales necesitan un profesional cualificado; puedo ayudarte a identificar qué información preparar para revisar el canal.');
  }
  if (/(.)\1{24,}/u.test(text)) return reject('Resume tu duda en una pregunta breve sobre tu cuenta de Amazon.');
}
