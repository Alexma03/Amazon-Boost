# Guías SEO/GEO y recorrido hacia la auditoría

Preparado el 10 de octubre de 2026 en `codex/seo-guides-conversion`, a partir de la versión publicada `3cbc258`. El propietario autorizó publicar las ocho guías revisadas, las mejoras de conversión y el nuevo titular del directorio. No se envían solicitudes manuales de indexación.

## Contenido preparado

Ocho nuevas guías, con respuestas iniciales, cuatro apartados, tabla de decisiones, lista de comprobación, preguntas frecuentes y fuentes primarias:

- `/guias/amazon-ads-clics-sin-ventas/`
- `/guias/informe-terminos-busqueda-amazon-ads/`
- `/guias/campanas-automaticas-manuales-amazon/`
- `/guias/presupuesto-amazon-ads/`
- `/guias/exencion-gtin-amazon/`
- `/guias/asin-duplicados-amazon/`
- `/guias/ventas-beneficio-amazon/`
- `/guias/inventario-fba-baja-rotacion/`

Cuatro actualizadas: ACOS/TACOS, imágenes de cosmética, redacción de listings y cálculo de rentabilidad FBA. Sus fechas de revisión cambian; las de las guías no revisadas se conservan.

El directorio, el sitemap y el HTML se generan desde los registros existentes. Las ocho nuevas tienen enlaces entrantes desde servicios y otras guías. No se cambian direcciones existentes ni se crean aliases nuevos.

## Recorrido comercial

1. Respuesta útil y directa para la consulta, sin obligar a contactar.
2. Invitación temprana a una auditoría gratuita y sin compromiso, con el contexto del servicio correspondiente. El texto del botón se ve también en móvil.
3. Enlaces explícitos al servicio relevante y a la portada para conocer Amazon Boost.
4. Invitación final contextual a la auditoría, WhatsApp y teléfono. No se obliga a pasar por la portada para pedir ayuda.

Se utiliza el formulario existente `/#auditoria`; no se duplican formularios, no se modifica el receptor de mensajes y no se envían solicitudes de prueba a clientes. Las reseñas y los casos mantienen su salida anterior: las variantes del componente de contacto se activan únicamente desde las guías.

No hay garantía de tráfico, posiciones ni conversiones. Las capturas de Cloudflare mezclan visitas humanas y automatizadas; para priorizar por rendimiento real faltan consultas, impresiones, clics y solicitudes por página. No se instala analítica adicional ni se recopilan datos nuevos en esta tanda.

## Pendiente externo: redirección de www

La auditoría previa detectó que `www.amznboost.es` sirve contenido con canonical hacia `amznboost.es`, pero no redirige. No se ha cambiado la configuración de Cloudflare.

Cloudflare Pages no admite redirecciones de dominio en `_redirects`, y sus reglas no se aplican a las rutas de Functions. No se añade una regla de archivo que parezca solucionar el problema sin hacerlo.

Preparar una regla en Cloudflare, limitada al host exacto `www.amznboost.es` y a GET/HEAD de contenido público:

- Destino HTTPS en `amznboost.es`.
- Conservar ruta y parámetros de consulta.
- Respuesta 301.
- Excluir `/api`, `/admin`, `/control` y sus subrutas para no cambiar flujos privados ni peticiones de aplicación.
- No aplicar a otros subdominios, preview o dominios de administración.
- Verificar el DNS existente; no reemplazarlo a ciegas por el ejemplo de la documentación.

Después de activar: comprobar portada, servicio y guía con y sin parámetros, aliases, un 404 real y que POST y rutas privadas no se intercepten. El host canónico no debe redirigir a sí mismo.

Referencias: [limitaciones de _redirects](https://developers.cloudflare.com/pages/configuration/redirects/) y [www hacia el dominio principal](https://developers.cloudflare.com/pages/how-to/www-redirect/).

## Antes de publicar

Verificación local completada: compilación correcta, 140 pruebas superadas y comprobación técnica de 80 URLs públicas. Revisión en Chrome a 1440, 390 y 360 px del directorio y las doce guías nuevas o actualizadas, sin imágenes rotas ni desbordamiento de página. Se comprobó la navegación al formulario sin enviar solicitudes. La comparación de texto, enlaces e imágenes con producción conserva las reseñas y los casos excluidos. Estas pruebas no miden resultados SEO ni conversiones reales.

- Revisar editorialmente las ocho guías y las cuatro actualizaciones.
- Compilar y pasar pruebas de contenido, enlaces, sitemap y canonicals.
- Comprobar visualmente escritorio y móvil y los enlaces al formulario, sin enviar datos.
- Comparar los casos y las reseñas con producción para asegurar que siguen intactos.
- Publicar solo esta rama, sin incorporar los cambios pendientes de Quiénes somos o de la landing Ads.
- Revalidar respuestas públicas tras el despliegue. Que una guía sea indexable no demuestra que Google o una IA ya la hayan indexado o citado.
