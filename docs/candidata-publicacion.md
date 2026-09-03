# Candidata de publicación

Estado preparado para revisión visual. Esta fase no publica ni modifica el dominio de producción.

## Superficie pública preparada

- Portada y header global.
- Directorio de servicios y sus páginas comerciales aprobadas.
- Directorio de guías y todas las guías canónicas.
- Blog y artículos publicados.
- Directorio de casos y los dos casos documentados.
- Sitemap, robots, canonical, metadatos sociales, datos estructurados, redirecciones y página 404.
- Formulario de auditoría, teléfono y WhatsApp.
- Asistente de IA conservado en el código, pero desactivado para el lanzamiento.

La colección pública contiene 69 URL canónicas. Las direcciones antiguas de servicios conservan redirecciones 301 y no entran en el sitemap.

## En espera

`/quienes-somos/` conserva su diseño, textos e imágenes para continuar el trabajo. Mientras no esté aprobada:

- no aparece en header ni footer;
- no aparece en el sitemap;
- declara `noindex, nofollow`;
- sigue disponible en local para revisión directa.

Los borradores y el archivo editorial de casos mantienen el mismo tratamiento. Las rutas de administración y el panel demo permanecen disponibles en desarrollo, pero la compilación de producción las bloquea salvo activación expresa.

## Comprobaciones

- `npm run validate`: compila, ejecuta las pruebas y verifica la salida técnica.
- `npm run release:check`: repite lo anterior y bloquea la publicación si falta una aprobación manual.

El segundo comando debe seguir bloqueado hasta resolver los elementos de `src/data/release-status.ts`. No se debe cambiar un estado a aprobado sin confirmación de Amazon Boost.

## Confirmaciones necesarias

1. Datos y revisión de aviso legal, privacidad y cookies.
2. Vigencia, fuente y autorización de cifras y testimonios.
3. Configuración definitiva de Cloudflare y acceso administrativo. Firebase está verificado y la IA se publicará desactivada.
4. Aprobación visual expresa de la candidata.

## Secuencia de publicación

1. Revisar la preview en escritorio y móvil.
2. Corregir únicamente incidencias encontradas en esa revisión.
3. Completar datos legales, verificaciones y servicios de producción.
4. Cambiar a aprobados los controles correspondientes.
5. Ejecutar `npm run release:check` hasta obtener salida correcta.
6. Crear la versión de publicación y desplegar solo con autorización expresa.
7. Comprobar dominio, formularios, redirecciones, sitemap y Search Console en producción.
