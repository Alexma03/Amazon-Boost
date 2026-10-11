# Auditoría de preparación para Google Ads

Fecha: 11 de octubre de 2026.
Destino principal revisado: https://amznboost.es/.
Estado: auditoría terminada; no se han cambiado ni publicado funcionalidades de la web.

## Dictamen

La portada normal tiene una base comercial válida y puede utilizarse para campañas de búsqueda de agencia Amazon. No recomiendo sustituirla por la página de anuncios ni rehacer su diseño antes de empezar.

Sin embargo, **no la considero preparada para invertir con una medición fiable y un circuito de captación suficientemente comprobado**. Los principales pendientes son medición, atribución de campañas, recuperación del formulario ante fallos, experiencia móvil y cierre legal. La ausencia de medición no impide necesariamente que Google apruebe un anuncio: es un impedimento para evaluar y optimizar el gasto con criterio.

No hay una caída general de URLs en las comprobaciones actuales: las 90 páginas del sitemap responden con HTTP 200, tienen una canonical propia, un H1 y ninguna directiva noindex observada. Esto demuestra accesibilidad e indexabilidad técnica, no posicionamiento ni indexación real en Google.

## Alcance y método

- Comprobación de producción, no solo del entorno local.
- Rastreo de las 90 URLs del sitemap y sus metadatos principales.
- Revisión de los 23 destinos internos distintos enlazados desde la portada, incluyendo anclas.
- Pruebas visuales y de navegación en nueve configuraciones: escritorio, móvil tipo iPhone, móvil tipo Android, 360 px, 320 px, tableta, apaisado, movimiento reducido y JavaScript desactivado.
- Navegador Chrome/Chromium. La emulación de iPhone no equivale a probar Safari real.
- Tres mediciones Lighthouse: dos móviles y una de escritorio.
- Auditoría automática de accesibilidad y revisión visual de las capturas.
- Pruebas de diagnóstico, carrusel, lectura de reseñas, navegación a contacto y enlaces telefónicos/WhatsApp.
- Pruebas aisladas del formulario: validación, éxito simulado, error simulado, transporte bloqueado y fallo sin JavaScript. Se interceptó el envío antes de contactar con la base de datos.
- Revisión del código de formularios, administración, navegación, configuración legal y carga de recursos.

**No se ha escrito ninguna solicitud en producción, accedido a mensajes de clientes, modificado Firebase, creado una campaña ni gastado presupuesto.**

## Hallazgos priorizados

| Prioridad | Hallazgo | Ubicación | Efecto | Propuesta |
| --- | --- | --- | --- | --- |
| ALTA · Antes de invertir | No se observa seguimiento web de conversiones de Google Ads | Páginas públicas y formulario | No podemos asociar de forma fiable inversión y solicitudes; las pujas automáticas carecen de esa señal web | Configurar etiqueta y conversión de solicitud confirmada; comprobarla en la cuenta |
| ALTA · Antes de invertir | No se conserva el origen publicitario en las solicitudes | `src/components/HomeRedesign.astro:161`, `src/components/ServiceContact.astro:17` | Se desconoce anuncio/campaña de cada contacto; pasar desde servicios a la portada elimina los parámetros de la URL | Atribución limitada y compatible con consentimiento; mantenerla al navegar y en el contrato de guardado |
| ALTA · Error reproducido | El formulario sin JavaScript usa GET y coloca los campos en la URL | `src/components/HomeRedesign.astro:342` | No entrega la solicitud y puede exponer datos en historial y registros | Endpoint POST validado o, como mínimo, impedir ese envío y ofrecer una alternativa sin JavaScript |
| ALTA · Rendimiento | Carga principal móvil lenta en dos mediciones | Portada, recursos y animaciones | Mayor espera para tráfico móvil de pago; riesgo de abandono, no cuantificado con estos datos | Optimizar recursos, fuentes, prioridad de carga y trabajo de animación; medir antes/después |
| ALTA · Pendiente legal | Información identificativa incompleta y validación legal pendiente | `src/data/legal-status.ts:7` y aviso legal | No es correcto declarar la web legalmente cerrada | Resolver con asesor qué información profesional debe figurar; no inventar ni publicar datos personales por iniciativa propia |
| ALTA · Si se elige ese destino | La landing específica de anuncios devuelve 404 en producción | `/ads/agencia-amazon/` | No es un destino utilizable para una campaña actual | Utilizar la portada o una página comercial publicada; publicar y verificar la landing aparte solo si se decide usarla |
| MEDIA · Captación móvil | Clic en auditoría aterriza antes del formulario y el header tapa el inicio de sección | `#auditoria` | Obliga a seguir desplazándose después de pulsar el CTA | Ajustar ancla, margen de scroll y disposición móvil sin rehacer la portada |
| MEDIA · Formulario móvil | Campos pequeños y texto de 11,52 px | `.audit-form`, `src/styles/home-redesign.css` | Lectura y entrada menos cómodas; posible zoom en Safari, aún no comprobado | Texto de entrada de 16 px, controles cómodos y consentimiento legible |
| MEDIA · Solapamiento | WhatsApp cubre parte de los CTA en una altura móvil y del teléfono en una captura | `src/components/WhatsAppFloat.astro:20` | Interfiere con otros caminos de contacto | Posición sensible al viewport y al formulario; comprobar zonas seguras y teclado |
| MEDIA · Resiliencia | No hay tiempo máximo ni alternativa específica si el guardado permanece pendiente | `src/components/HomeRedesign.astro:154` | Botón bloqueado mientras la promesa no se resuelva | Recuperación controlada sin duplicar solicitudes cuando el backend termine tarde |
| MEDIA · Evidencia de consentimiento | La casilla se exige pero no forma parte del registro guardado | `src/components/HomeRedesign.astro:161` | No queda esa prueba en la propia solicitud | Registrar versión de aviso y fecha del permiso pertinente; revisar base jurídica y acceso |
| MEDIA · Accesibilidad | Contraste insuficiente en seis rótulos de servicios y textos pequeños del mockup | Portada | Lectura más difícil para parte de los usuarios | Ajustar contrastes sin cambiar el branding ni datos de casos/reseñas |
| BAJA · Navegación | Escape no cierra el menú móvil | `src/components/Header.astro:87` | Inconsistencia de teclado/foco | Cerrar, devolver foco y revisar navegación de teclado |
| BAJA · Consistencia | HTTPS con www sirve contenido en 200 en vez de redirigir | `https://www.amznboost.es/` | Variantes de host; canonical reduce el problema, pero no unifica la navegación | Evaluar 301 a host principal conservando parámetros y sin afectar POST/admin/API |

## 1. Medición: el pendiente más importante para rentabilizar Ads

No hay solicitudes observadas hacia Google Tag Manager, Google Analytics, Google Ads o DoubleClick durante la carga y navegación probadas. Tampoco se encuentran llamadas a `gtag`, `dataLayer` ni manejo de click IDs/UTM en el circuito público revisado. Sí aparece Cloudflare Analytics: no sustituye la medición de conversiones de Google Ads.

Esta conclusión se refiere a la web observada. No tengo acceso a la cuenta de Ads y no puedo descartar importaciones offline o configuraciones externas que no sean visibles aquí.

Configuración propuesta:

1. Conversión principal: solicitud guardada y confirmada, no clic en el botón ni intento de envío.
2. Contar un contacto una vez y evitar duplicados por recarga, reintento o respuesta tardía.
3. Clic de WhatsApp y clic de teléfono: acciones secundarias. Un clic no demuestra conversación ni llamada atendida.
4. Conservar, de forma proporcionada y acorde con la configuración de privacidad, el origen de la solicitud y su página de entrada.
5. Más adelante, incorporar cliente cualificado y venta cerrada como resultados offline, si el proceso y los permisos lo permiten.
6. Verificar en la cuenta de Ads la recepción de la conversión y qué objetivos utiliza cada campaña.

Se necesitan identificadores de la cuenta/etiqueta y de la acción de conversión o acceso al contenedor existente. No conviene crear identificadores ficticios ni duplicar una instalación externa sin revisarla.

La [documentación de Google sobre conversiones web](https://support.google.com/google-ads/answer/7548399) explica la etiqueta y la acción de conversión. El plan debe adaptarse a la cuenta real, no limitarse a insertar código.

## 2. Consentimiento y políticas al incorporar medición

En las sesiones públicas probadas antes de enviar el formulario no se observaron cookies de seguimiento. No concluyo que el sitio actual necesite un banner publicitario únicamente por existir: no se detectaron esas etiquetas.

La situación cambia si se instalan Google Ads, Analytics o remarketing. Propongo revisar las bases jurídicas, actualizar las políticas y configurar elecciones de consentimiento y sus señales. Como punto de partida conservador, el modo básico impide cargar la etiqueta de Google hasta obtener la elección que lo permite. Consent Mode no sustituye por sí solo el consentimiento ni una revisión legal.

La casilla del formulario permite atender esa solicitud; no debe reutilizarse automáticamente como autorización para remarketing o seguimiento publicitario. No se deben enviar nombres, teléfonos ni correos sin procesar en URLs o eventos de analítica.

Fuentes: [implementación de Consent Mode](https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic) y [requisitos de Google para tráfico del EEE](https://support.google.com/google-ads/answer/13695607?hl=es).

## 3. Formulario: qué funciona y qué no está demostrado

Resultados de pruebas aisladas, sin escribir en Firebase:

| Prueba | Resultado |
| --- | --- |
| Consentimiento sin marcar | Impide enviar |
| Email inválido | Impide enviar |
| Guardado simulado correcto | Una operación; muestra éxito y limpia el formulario |
| Error simulado de transporte | Muestra alternativa de correo, conserva los campos y permite reintentar |
| Operación simulada sin respuesta | Tras cinco segundos continúa enviando y mantiene el botón bloqueado; el código no fija un límite |
| JavaScript desactivado | Intenta navegar con nombre, email, teléfono, ventas, mensaje y consentimiento en query string; se interceptó y abortó |

El último fallo también es relevante si el script que instala el manejador no termina de cargar. No basta con añadir `method="post"` sin una ruta que procese ese POST: eso podría sustituir un fallo por otro.

La solicitud actualmente incluye nombre, email, teléfono opcional, tramo de ventas, asunto, mensaje, fuente genérica, estado y fecha del navegador. No incluye campaña ni constancia de la casilla marcada. El circuito desde una página de servicios a `/#auditoria` conserva el acceso al formulario, pero no los parámetros publicitarios de la página anterior.

Antes del lanzamiento falta **un envío real controlado que se abra correctamente en la bandeja privada**, y la comprobación de que ese éxito genera una sola conversión. Los éxitos simulados de esta auditoría no prueban entrega real.

### Seguridad del circuito de mensajes

El navegador escribe directamente en Firestore. La interfaz de administración espera autenticación antes de consultar los mensajes; eso no prueba por sí solo autorización suficiente en la base de datos.

No hay reglas de Firestore disponibles en este checkout para auditarlas. Quedan por verificar en el proyecto real:

- Que solo los administradores autorizados pueden leer/modificar solicitudes, no cualquier usuario autenticado.
- Que las creaciones públicas aceptadas validan tipos, tamaños y campos permitidos.
- Que existe una protección proporcionada frente a spam y abuso de envíos.
- Que las solicitudes no se exponen en HTML público, cachés ni respuestas de error.
- Que las claves privadas de servidor no llegan al navegador. La configuración pública de Firebase no equivale por sí sola a una clave privada.

Esto es una **verificación pendiente**, no evidencia de que los mensajes estén expuestos. La auditoría no hizo lecturas anónimas de datos de clientes ni intentos de evasión de acceso.

## 4. Rendimiento: resultados medidos

Lighthouse 13.5.0 sobre la portada HTTPS publicada, en Chrome local:

| Métrica | Móvil 1 | Móvil 2 | Escritorio |
| --- | --- | --- | --- |
| Rendimiento | 69/100 | 69/100 | 95/100 |
| Primera aparición de contenido | 2,85 s | 2,91 s | 0,75 s |
| LCP: aparición del elemento principal | 7,40 s | 7,35 s | 1,46 s |
| Bloqueo total de ejecución, TBT | 140 ms | 103 ms | 0 ms |
| Cambios de disposición, CLS | 0,00012 | 0,00012 | 0,00037 |
| Transferencia observada | Aproximadamente 2,06 MB | Aproximadamente 2,06 MB | Aproximadamente 2,06 MB |

La prueba completa dio 97/100 en accesibilidad, 100 en buenas prácticas y 100 en el chequeo SEO de Lighthouse. Esas puntuaciones no certifican cumplimiento legal, seguridad, ranking ni conversión.

Son **mediciones de laboratorio**, no datos de todos los usuarios. La consulta pública a PageSpeed Insights no se pudo completar por cuota; no se dispone aquí de CrUX ni del INP real. TBT no es INP. El entorno de inspección presenta además un script de instrumentación cuyo origen no se ha atribuido al código del proyecto; conviene repetir una medición independiente después de las mejoras.

Recursos con oportunidades claras:

- Marco del portátil PNG: 531.371 bytes, imagen de 1.635 × 962 frente a unos 380 × 224 de representación móvil.
- Imagen del producto del caso de éxito: 1.229.189 bytes, 1.672 × 941 frente a unos 364 × 205 de representación móvil. Su carga diferida no convierte automáticamente esa imagen en la causa del LCP inicial.
- JavaScript de gráficas y animación que se carga en la primera visita, aunque parte del contenido está más abajo.
- Trabajo de estilos/layout, fuentes y efectos de aparición que requiere análisis antes de atribuir una causa concreta.

Importante: Lighthouse identifica el marco del portátil como elemento LCP de escritorio, pero el texto de marca del header en las pruebas móviles. No sería correcto decir que el portátil explica por sí solo los 7,4 segundos móviles. Las dos instancias del marco usan la misma URL y no demuestran dos descargas distintas.

Propuesta: formatos modernos y tamaños responsivos conservando exactamente las imágenes; revisar carga y revelado de contenido prioritario; diferir recursos no necesarios arriba; mantener el efecto visual sin trabajo continuo innecesario. Después repetir varias pruebas con la misma configuración. Optimizar el archivo de una imagen no implica modificar el contenido del caso de éxito, pero su aprobación se mantiene separada.

Como referencia, el umbral de LCP considerado bueno es 2,5 segundos en el percentil 75 de usuarios reales. Fuente: [umbrales de Core Web Vitals](https://web.dev/articles/defining-core-web-vitals-thresholds). No prometo alcanzar una cifra de campo solo por cambiar un recurso.

## 5. Móvil y camino hacia la solicitud

No se detectó scroll horizontal, imágenes rotas ni errores JavaScript en las nueve configuraciones de portada. Los botones principales llevan al contacto.

Hay fricción verificable:

- En el móvil emulado de 390 × 664, al pulsar auditoría el formulario comienza alrededor de 593 px por debajo del borde superior. Apenas empieza a verse en esa pantalla; hay que seguir bajando.
- En 320 × 568, el formulario comienza alrededor de 653 px tras el clic: queda fuera de la vista inicial.
- La sección aterriza cerca de la coordenada vertical cero, pero el header fijo ocupa 64 px. Conviene aplicar un margen adecuado al destino.
- La portada alcanza aproximadamente 12.365 px de altura en la emulación iPhone. No obliga a recorrer todo porque existe ancla; aun así, hay que mejorar dónde termina el salto, no reducir todo indiscriminadamente.
- Campos de unos 39 px de alto y fuente de 11,52 px, incluido el texto del consentimiento. La lectura puede mejorar sin quitar el formato móvil del formulario.
- El botón flotante de WhatsApp se cruza con zonas de ambos CTA del hero a esa altura de pantalla. Una captura también muestra que puede cubrir parte del teléfono dentro del formulario, aunque el solapamiento no aparece en todas las posiciones probadas.
- El CTA principal está visible en las primeras pantallas verticales probadas; en 320 px queda parcialmente bajo el borde inferior. En apaisado queda fuera de la primera vista.

Propuesta acotada: mejorar la posición del ancla, legibilidad del formulario y convivencia con WhatsApp. Evaluar un acceso persistente a auditoría en móvil sin añadir otro flotante que tape contenido. Probarlo con teclado abierto y Safari real.

No hay datos actuales de abandono o conversión segmentados que permitan cuantificar cuántas ventas se pierden por estos detalles.

## 6. Persuasión y adecuación al anuncio

### Mantener

- Especialización en Amazon y marcas privadas visible desde arriba.
- Oferta de auditoría gratuita y sin compromiso en contacto.
- Servicios, pruebas de resultados, opiniones y presentación del responsable.
- Correo, teléfono y WhatsApp coherentes entre sí: info@amznboost.es y +34 650 606 400.
- Casos accesibles desde el primer bloque y posibilidad de contactar sin recorrer toda la página.
- La portada original, sus reseñas y los casos actuales. No necesitan reescribirse para resolver los errores anteriores.

### Mejoras comerciales recomendables, no fallos técnicos

- Explicar brevemente qué recibe el visitante de la auditoría y cuál es el siguiente paso, con un compromiso realista que pueda cumplirse. No inventar plazos ni entregables.
- Reforzar que es para empresas/marcas, no soporte al comprador de Amazon ni atención a pedidos.
- Para búsquedas generales de agencia, la portada es un destino razonable; para PPC o gestión de cuenta, valorar su servicio publicado si encaja mejor con el texto del anuncio. Es una hipótesis comercial, no una victoria demostrada por un test.
- Evitar que las cifras de la simulación del portátil se interpreten como resultados reales. Ya se identifican como simulación, pero el aviso es pequeño. Las cifras verificadas de experiencia de la agencia no se sustituyen por promesas.
- Añadir, si resulta útil y sin ampliar excesivamente el formulario, identificación opcional de marca o tienda para cualificar solicitudes.
- Mantener testimonios auténticos y sus fuentes. No crear nuevas valoraciones ni cambiar reseñas en esta fase.

No hay un experimento A/B que demuestre qué landing convierte más. Mi elección de conservar la normal se basa en coherencia, pruebas accesibles y evitar rehacer lo que ya está trabajado, no en una tasa de conversión inventada.

## 7. Destinos, SEO y rastreo

Comprobaciones actuales:

- Portada, servicios, guías y páginas comerciales del sitemap: 90 respuestas 200, canonical coincidente con la URL, un H1 y sin noindex observado.
- Sin títulos exactos duplicados entre esas 90 URLs. Esto no demuestra ausencia de todo contenido parecido.
- Todas esas páginas tienen al menos un camino de contacto/auditoría o WhatsApp en el HTML. No se ha realizado inspección visual exhaustiva de cada guía en cada navegador.
- Los 23 destinos internos de la portada resuelven y las anclas principales existen.
- Sitemap index y sitemap de contenido accesibles; el sitemap lista 90 URLs.
- HTTP redirige a HTTPS conservando los parámetros comprobados.
- WWW sirve en 200 pero la canonical apunta al dominio principal.
- Una URL inexistente devuelve 404 real; no se observó soft 404 en esa prueba.
- La página local `/ads/agencia-amazon/` no está publicada: producción devuelve 404.
- `/quienes-somos/` responde 200 pero tiene noindex. No aparece en el header público actual. No debe asumirse terminada ni indexada.
- Las tres páginas legales son accesibles y están enlazadas aunque mantienen noindex. Noindex no las convierte en inaccesibles ni impide por sí solo que se consulten como política.

Robots permite las páginas públicas y bloquea las rutas de administración/API para rastreo. Las pruebas con User-Agent de AdsBot-Google y AdsBot-Google-Mobile recibieron 200 y no mostraron challenge en la portada con parámetros de campaña.

Cambiar el User-Agent no equivale a ser un crawler real de Google: se usó nuestra IP y no se probaron todas las regiones. La configuración WAF/Cloudflare debe comprobarse si Ads comunica problemas de rastreo. `robots.txt` no es un mecanismo de privacidad del panel de mensajes.

Google exige destinos funcionales y accesibles al rastreador, incluidos dispositivos comunes. Referencia: [requisitos de destino de Google Ads](https://support.google.com/adspolicy/answer/6368661?hl=es). No hay motivo técnico aquí para rehacer URLs, sitemap o arquitectura SEO antes de anunciar la portada.

## 8. Legal: publicado no significa verificado

Las tres páginas legales están accesibles, el titular figura y el formulario enlaza privacidad. La configuración conserva `legalReady = false`: faltan NIF/dirección profesional y revisión legal/completa de cookies. Su omisión fue una decisión previa, no un error de renderizado.

La LSSI exige con carácter general identificación del prestador, domicilio o establecimiento y NIF, además de contacto, para servicios dentro de su ámbito. Debe revisarse cómo cumplirlo con datos profesionales adecuados sin inventar una dirección ni exponer datos por iniciativa del desarrollador. Fuente: [artículo 10 de la LSSI](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a10).

La política contempla doce meses desde el último contacto para solicitudes sin contratación y después supresión/anonimización salvo excepciones justificadas. No se ha comprobado un procedimiento operativo que aplique esa conservación; el texto no borra datos automáticamente.

Si se incorpora tracking, las políticas actuales que explican ausencia de píxeles/Google Analytics deben actualizarse. Esta auditoría técnica no sustituye una revisión jurídica y no garantiza aprobación de anuncios ni cumplimiento completo.

## 9. Lo que falta verificar fuera de la web

- Cuenta Google Ads: verificación del anunciante, facturación, país, objetivos, acceso e instalación existente.
- Acción de conversión y diagnóstico de etiqueta en la cuenta, con un envío real confirmado.
- Permisos reales de Firebase y protección frente a abuso.
- Safari/iPhone y Android reales con teclado; pruebas de red lenta y cambios de orientación.
- Políticas de privacidad/cookies ajustadas a la instrumentación finalmente elegida.
- Gestión real de consultas y respuesta comercial, sin inventar disponibilidad ni SLA.
- Consultas, negativas, concordancias y correspondencia anuncio/página para evitar pagar por soporte al consumidor o búsquedas ajenas al servicio. No aplicar negativas genéricas como “gratis” sin contexto, pues ofrecemos auditoría gratuita.
- Search Console y resultados reales de búsqueda: no se han usado como sustituto de datos de conversión ni existen accesos verificados en esta auditoría.

## 10. Orden propuesto para corregir y lanzar

1. Resolver fallo de envío sin JavaScript y fiabilidad ante errores, cuidando compatibilidad con el panel de mensajes.
2. Instalar medición y atribución con su configuración de privacidad; revisar permisos del backend.
3. Mejorar móvil: destino del CTA, texto/campos y WhatsApp.
4. Optimizar rendimiento manteniendo diseño y recursos visuales reconocibles.
5. Resolver los pendientes legales y operativos que correspondan.
6. Hacer un envío real identificado como prueba: guardar, abrir en admin y verificar una sola conversión y su origen.
7. Validar URL final HTTPS, sin 404, sin bloqueo de AdsBot y con parámetros correctos.
8. Arrancar una campaña controlada y evaluar solicitudes cualificadas, no únicamente visitas o clics; ampliar solo después de disponer de evidencia.

### Condiciones de salida

- El formulario no introduce datos personales en la URL y funciona en el circuito real hasta el panel.
- Una solicitud correcta equivale a una sola conversión principal; un envío inválido/fallido no cuenta.
- Se puede saber qué campaña originó la solicitud cuando procede medirlo.
- El consentimiento se aplica y las políticas describen la configuración real.
- No se tapa el botón principal ni el teléfono en los tamaños móviles probados.
- La velocidad se vuelve a medir y se comprueba mejora sin pérdida de animaciones, imágenes o contenido.
- No se han cambiado canonical, URLs estratégicas, casos ni reseñas de forma accidental.
- Los permisos de mensajes privados están comprobados y el proceso comercial recibe los contactos.

## Evidencias locales

Carpeta: `artifacts/private/google-ads-audit-2026-10-11/`.

- `evidence.json`: HTTP, nueve configuraciones, accesibilidad y pruebas aisladas de formulario.
- `interactions.json`: diagnóstico, casos, reseñas, enlaces, contacto y retorno del scroll.
- `crawl.json`: las 90 páginas públicas del sitemap.
- `lighthouse-mobile.json`, `lighthouse-mobile-repeat.json`, `lighthouse-desktop.json`: mediciones completas.
- Capturas de portada, menú y formulario.
- Scripts privados reproducibles; no forman parte de las funcionalidades ni del contenido publicado.

No se ha hecho commit ni push. Los cambios preexistentes de borradores de guías se han dejado intactos.
