# Boost, asistente de Amazon Boost

Versión generativa de previsualización, 28 de agosto de 2026. Activación solicitada por el propietario; no publicada en producción.

## Qué está activo

- Botón con la sonrisa naranja de la marca, independiente de WhatsApp.
- Conversación en escritorio y móvil, cuatro preguntas iniciales, reinicio y salida al equipo.
- Respuestas de IA basadas en las preguntas frecuentes de servicios y las guías. Cada respuesta enlaza su página de origen; si la IA falla, se devuelve la respuesta editorial, identificada como tal.
- Identidad propia de Amazon Boost, servicios, fundador, enfoque y mercados con respuestas editoriales que no dependen del cupo de IA. Reconoce variantes como «qué es Amazon Boost», «AmazonBoost», «quiénes sois» y «en qué me podéis ayudar».
- Incluye conceptos iniciales (Amazon, Seller Central, marca privada, listings y PPC), además de introducciones de todos los servicios y sus preguntas frecuentes. Distingue una definición de un problema operativo; no responde a «qué es un listing» como si el visitante tuviera un problema de conversión.
- Identificación visible de IA, posibilidad de error y consentimiento previo al envío a OpenRouter y al proveedor. No se presenta como una persona, un servicio oficial de Amazon ni una conexión a Seller Central.
- Si no encuentra una coincidencia suficiente, pide concretar o facilita hablar con el equipo. No inventa respuestas, precios o resultados.
- Contenido cargado al enviar la primera pregunta. No se descargan todas las guías con cada visita a la web.
- Sin consentimiento no sale ninguna consulta. Tras aceptarlo, se envía solo la pregunta actual, un identificador editorial y el estado de invitación a contacto al endpoint propio. No se reenvía un historial ni mensajes de sistema aportados por el cliente. Los filtros de privacidad actúan en navegador y servidor, pero no pueden reconocer todos los posibles datos personales: el aviso de no compartirlos sigue siendo imprescindible.
- No guardamos conversaciones ni preguntas. El control de uso guarda HMAC de la IP, fecha, identificador aleatorio y vencimiento de la petición. Elimina registros de más de 24 horas cuando recibe nuevas peticiones. Si no hay tráfico, pueden permanecer hasta la siguiente limpieza; revisar retención y copias de D1 antes de producción.
- El asistente solo aparece en páginas públicas indexables. Su archivo de conocimiento queda fuera del índice.
- Una única invitación de contacto cambia según el servicio de la respuesta. No se repite un bloque comercial dentro de cada mensaje. Quien prefiera solo información puede rechazar las propuestas; los accesos voluntarios al equipo siguen disponibles.
- WhatsApp recibe únicamente un tema editorial (publicidad, imágenes, incidencia...), no el texto del visitante, sus cifras ni la conversación. Aceptar la propuesta en el chat no envía un formulario: el visitante decide si abre el enlace.
- Las cuatro respuestas iniciales también se muestran en HTML en `/guias/#respuestas`, con sus enlaces de origen. Se reutiliza contenido revisado, sin publicar chats ni crear URLs para cada conversación.

## Mantenimiento

Las respuestas de las guías y las preguntas frecuentes se actualizan con sus páginas originales. Los temas, sinónimos y respuestas generales de la agencia se mantienen en `src/data/boost-assistant.ts`. No incorporar borradores de casos ni testimonios como si fueran evidencia verificada.

Esta búsqueda por palabras no sustituye la comprensión de un modelo generativo. Las pruebas cubren consultas frecuentes, pero no garantizan acertar cualquier frase. La interfaz siempre permite consultar el origen y pasar al equipo.

## Inferencia y seguridad

- Endpoint fijo `POST /api/boost`, JSON estricto, 600 caracteres y 4 KB como máximo. Origen permitido explícito, sin CORS abierto, sin caché y fuera de indexación. El origen protege frente a llamadas desde otras webs, no identifica a un bot: un cliente HTTP puede falsificarlo.
- Clave solo en el entorno del servidor. `.dev.vars`, registros de pruebas y estado local están ignorados por Git y bloqueados por Vite, incluida la ruta `/@fs/`. El build no contiene la clave.
- Modelo fijo `openrouter/free`, precio máximo cero, sin modelos de pago ni reintentos automáticos. Proveedor restringido a Novita, con `data_collection: deny` y `zdr: true`. No cambiar estas restricciones silenciosamente para resolver un fallo de disponibilidad. Revisar también los ajustes de logging de la cuenta de OpenRouter.
- La ruta gratuita compatible no anuncia salida estructurada nativa. El prompt exige JSON y Zod valida el resultado en nuestro servidor. No extraemos JSON de texto adicional ni reparamos respuestas inválidas: se descartan completas.
- Fuentes editoriales elegidas en servidor. No navega, no ejecuta herramientas, no recibe documentos, no consulta Seller Central y no modifica cuentas. Identidad, tarifas, garantías, contacto, privacidad y temas sin fuente suficiente siguen siendo deterministas.
- Cada consulta generativa recibe también la presentación aprobada de la agencia, para poder relacionar la orientación con nuestros servicios sin inventar credenciales, cifras ni promesas. Una pregunta vaga pide concreción de forma útil, en lugar de afirmar que la web no contiene información.
- Rechazo de entradas de riesgo y validación de salida: esquema, longitud, fuentes conocidas, cifras presentes en fuentes, enlaces, HTML, secretos y patrones de promesas. Renderizado con `textContent`, nunca HTML ni Markdown del modelo. Los enlaces los elige la aplicación, no el modelo.
- Tiempo máximo de inferencia: 25 segundos. Máximo de salida solicitado: 800 tokens; respuesta HTTP del proveedor limitada a 24 KB. Los errores del proveedor y su contenido bruto no se exponen al visitante.
- Reiniciar o retirar el consentimiento cancela la petición y descarta respuestas tardías. No se persiste el consentimiento entre cargas.

## Límites persistentes

`BOOST_GUARD` es un binding D1 obligatorio para generar respuestas. No hay sustituto en memoria en producción. Sin binding, secreto, clave u origen configurado, se mantiene la respuesta editorial.

- Una inferencia simultánea por IP y tres globales.
- Cuatro inferencias por minuto y diez por 24 horas por IP.
- Doce por minuto y cuarenta por 24 horas para toda la web.
- Admisión atómica mediante un único `INSERT ... SELECT ... WHERE ... RETURNING` en D1. Los procesos distintos comparten el mismo presupuesto.
- Los fallos del proveedor también consumen admisión. La reserva concurrente vence a los 60 segundos si no se libera. Rechazo HTTP 429 con `Retry-After`, sin llamada al modelo.

Los límites son por ventanas móviles. Usuarios detrás de una misma red comparten límite. Rotar IPs puede eludir el límite individual, pero no el global. Un atacante todavía puede agotar el cupo gratuito o hacer peticiones a la infraestructura: desplegar reglas WAF/Turnstile según el tráfico. No es una garantía de ausencia de abuso o errores del modelo.

## Configuración y publicación

1. Revocar la clave compartida en el chat y crear una exclusiva para producción, con límite de gasto cero. No pegarla en código ni enviarla al navegador.
2. Configurar `OPENROUTER_API_KEY`, un `BOOST_RATE_SECRET` aleatorio de al menos 32 caracteres y `BOOST_ALLOWED_ORIGINS` con los dominios exactos. La previsualización y producción deben usar claves y bases separadas.
3. Crear/enlazar D1 como `BOOST_GUARD` y aplicar `migrations/boost-guard/0001_admissions.sql`. `wrangler.local.jsonc` y su UUID son solo locales; no desplegar esa configuración como si fuera la base de producción.
4. Revisar el aviso de privacidad, consentimiento, retención y proveedores, así como la protección perimetral. Mantener `BOOST_AI_ENABLED=false` hasta terminarlo.
5. Probar el despliegue con esa configuración y después activar `BOOST_AI_ENABLED=true`. Para desactivar, cambiar a `false`: no se pierde el acceso a las guías o al equipo.

## Pruebas del 28 de agosto de 2026

- Suite automatizada: validación de solicitudes y respuestas, origen, secretos, inyección, enlaces, tarifas, falsas promesas, cancelación, consentimiento y recuperación ante errores. Las pruebas de límites ejecutan el SQL real sobre SQLite, incluidas admisiones simultáneas y ventanas de tiempo.
- Llamadas reales mediante `scripts/test-boost-live.mjs`: publicidad y conversión devolvieron respuestas válidas; una petición de cocina se rechazó por estar fuera de ámbito; una petición de reseñas falsas también se rechazó, aun saltando el filtro de entrada deliberadamente en el test.
- Hubo llamadas 404 sin endpoint compatible y 429 de saturación. No cuentan como pruebas satisfactorias de comportamiento del modelo. Una salida con texto extra fuera del JSON se rechazó. Los informes de estas pruebas sintéticas están en `artifacts/private/`, no en la web.
- En el navegador: respuesta generativa real, rechazo local de intento de revelar el prompt, respeto a la negativa de contacto y revisión móvil. Sin errores de consola en el flujo comprobado.
- Prueba HTTP de seis consultas simultáneas: una respuesta generativa y cinco 429, sin seis llamadas al proveedor.
- Regresión de identidad y cobertura: distintas formulaciones de presentación de la agencia, servicios, equipo, enfoque, países y conceptos de Amazon; consultas técnicas que mencionan Amazon Boost no pierden su tema. Se comprueba además que la información corporativa funcione sin configurar el proveedor.
- Comprobación de secreto ausente del build y acceso 403 a `.dev.vars` y `/@fs/.../.dev.vars`. La preview sigue exigiendo su enlace de acceso y solo permite el POST concreto del asistente; administración y otras mutaciones permanecen cerradas.

Las pruebas son una muestra, no una certificación. El router puede cambiar de modelo y su disponibilidad no está garantizada. No afirmar que cualquier respuesta futura será correcta o que los filtros detectan todas las formas de manipulación.

Referencias del proveedor:
- https://openrouter.ai/openrouter/free
- https://openrouter.ai/docs/api_reference/limits
- https://openrouter.ai/docs/guides/routing/provider-selection
- https://openrouter.ai/docs/guides/features/zdr
- https://developers.cloudflare.com/d1/worker-api/d1-database/

Referencias de conceptos básicos de Amazon (revisadas el 28 de agosto de 2026):
- https://sell.amazon.es/vender-online
- https://advertising.amazon.com/es-es/resources/faq
- https://advertising.amazon.com/es-es/library/guides/cost-per-click

## SEO y conversaciones

El chat no garantiza indexación ni posiciones. Google no interactúa con la web como un visitante: las respuestas que solo aparecen después de escribir no deben ser la única vía para descubrir contenido. La biblioteca de guías y sus respuestas HTML aportan una ruta visible sin JavaScript ni interacción.

No se recopilan preguntas para crear artículos automáticamente. Una futura ampliación editorial requiere revisar utilidad, exactitud y privacidad. Tampoco se añade marcado de reseñas ni promesas de resultados enriquecidos a este asistente.

Referencias de Google:
- https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading
- https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
