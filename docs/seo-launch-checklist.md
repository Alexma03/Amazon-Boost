# Preparación técnica para indexación

Revisión del 28 de agosto de 2026. Cambios aplicados en la copia de trabajo y la preview privada, no en el dominio de producción. No se ha enviado ninguna solicitud de indexación.

## Base preparada

- 69 destinos de contenido previstos para indexación en esta candidata: portada, cuatro directorios, páginas comerciales, guías, nueve artículos y dos casos principales.
- La página `Quiénes somos` se conserva como borrador con `noindex` y fuera de navegación y sitemap hasta aprobar fotografías y texto.
- El sitemap se deriva de esa colección. No incluye aliases, borradores, archivo de casos, formularios de reseñas, administración, demos ni errores.
- Sus archivos se sirven directamente en Cloudflare: la ruta general de páginas ya no intercepta el sitemap con un error 404.
- Se conservan las URLs existentes de artículos y casos. Las cuatro antiguas direcciones de servicios redirigen al destino canónico con 301.
- Enlaces HTML rastreables desde la portada. Los enlaces de servicios de la main van al destino definitivo y el pie incluye el directorio de casos. No se cambia el diseño aprobado.
- Títulos, descripciones, canonical y vistas sociales coherentes. Las URLs canónicas no incluyen parámetros de campaña, fragmentos o tokens de preview.
- Portada prerenderizada: contenido principal disponible en HTML, sin depender de ejecutar JavaScript ni de renderizar la portada en cada petición.
- Un solo marcado de organización en la portada, con teléfono y correo reales. Eliminado del diseño activo el segundo marcado heredado con coordenadas, horarios, perfiles y buscador no confirmados. Los módulos históricos se conservan sin utilizarlos en Layout.
- Datos Article, Service y BreadcrumbList de las páginas de contenido conservados y contrastados con lo que se muestra. No se añaden valoraciones ni credenciales inventadas.
- Las fechas `lastmod` del blog provienen de la última actualización editorial de cada artículo. No se fecha toda la web automáticamente cada vez que se compila.
- Página 404 propia para destinos inexistentes, sin redirección engañosa a la portada. Los errores devuelven 404 y noindex.
- `noindex` explícito para páginas internas y utilitarias; cabecera adicional en respuestas dinámicas y caché privada en las rutas operativas.

## Rastreo y privacidad

`robots.txt` permite rastrear el contenido y apunta al sitemap de producción. Mantiene las exclusiones de administración y API. Las páginas públicas con noindex, como la invitación a dejar reseñas y los borradores, no se bloquean además en robots: el rastreador necesita acceder para leer la directiva.

Ni robots ni noindex son controles de acceso. La administración y sus datos necesitan autorización del servidor o del proveedor de datos; revisar esa protección antes de lanzar. Esta tanda de SEO no sustituye una auditoría de seguridad.

La preview continúa protegida por acceso y con `X-Robots-Tag: noindex, nofollow, noarchive`. No enviar su enlace a Search Console, herramientas públicas de análisis ni servicios de indexación. Tampoco copiar su cabecera noindex a la configuración del dominio de producción.

## Normalización de direcciones

La referencia canónica utiliza HTTPS, `amznboost.es` y barra final en las páginas. Los aliases y las rutas dinámicas conocidas conservan sus parámetros al redirigir. No se redirigen POST ni direcciones desconocidas como si fueran páginas válidas.

Para páginas prerenderizadas, la normalización HTTP corresponde al hosting estático. Comprobar en el hosting definitivo las variantes con y sin barra, las URLs `.html` y la conservación de parámetros. El middleware no usa la URL de compilación para transformar peticiones estáticas, porque no contiene esos parámetros.

## Antes de abrir producción

1. Aprobar contenido, fotografías, permisos de testimonios, cifras y alcance de los servicios. Los borradores de casos no pasan a publicables por cambiar una etiqueta técnica.
2. Confirmar el dominio de lanzamiento y acceso al hosting. Configurar una redirección de `www` y de HTTP hacia la versión HTTPS elegida, sin cadenas ni bucles.
3. Revisar robots, canonical y noindex en el dominio definitivo; comparar las direcciones publicadas con el sitemap y comprobar respuestas HTTP reales.
4. Comprobar formularios y recepción de solicitudes en un entorno autorizado. La preview compartida actual permite navegación, no envíos de formularios.
5. Verificar la propiedad de Search Console con la cuenta del propietario. Utilizar un token de verificación real cuando se facilite; no inventar etiquetas ni credenciales.
6. Enviar `https://amznboost.es/sitemap-index.xml` tras publicar. Inspeccionar portada, un servicio, una guía, un artículo y un caso con la herramienta de inspección de URLs.
7. Revisar las herramientas de resultados enriquecidos y experiencia de página en producción. La validación local no equivale a un informe de Google ni a una medición de Core Web Vitals.
8. Revisar las exclusiones, duplicados y errores que reporte Search Console. Priorizar contenidos usando consultas e impresiones reales, no volúmenes inventados.
9. Definir la medición de solicitudes, llamadas y WhatsApp, incluyendo consentimiento cuando corresponda. No se ha instalado analítica en esta tanda.

## Buscadores con IA

El contenido útil, accesible, enlazado y coherente sigue siendo la base. Para las funciones de IA de Google no se requiere un marcado específico de IA ni un archivo especial. No se promete aparecer, ser citado ni obtener una posición determinada. La configuración de otros rastreadores se decidirá con su documentación y las preferencias de publicación del propietario.

## Verificación y mantenimiento

- Registro: `src/data/site-index.ts`; no añadir una ruta al sitemap si todavía no tiene contenido publicable y una página funcional.
- Pruebas: `tests/site-indexing.test.mjs` contrasta sitemap, canonical, metadatos, enlaces, descubrimiento desde portada, exclusiones y redirecciones. El resto de pruebas comprueba contenido, gráficas, carrusel y llamadas a la acción.
- Verificación HTTP adicional de páginas públicas, aliases, errores y exclusiones en el servidor local de la preview. No se ha realizado inspección visual de navegador ni enviado formularios.
- Conectar la propiedad de Search Console y publicar son pasos pendientes de autorización, no acciones realizadas por preparar el código.

## Referencias

- [Google: guía de SEO para principiantes](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).
- [Google: bloquear indexación con noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing).
- [Google: crear y enviar un sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
- [Google: políticas de datos estructurados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).
- [Google: funciones de IA y tu sitio web](https://developers.google.com/search/docs/appearance/ai-features).
- [Astro: middleware](https://docs.astro.build/en/guides/middleware/).
