# Amazon Boost

Web comercial y biblioteca SEO de Amazon Boost, construida con Astro y preparada para Cloudflare Pages.

## Estado de publicación

El proyecto está en fase de candidata de publicación. No debe desplegarse hasta que `npm run release:check` finalice correctamente y Amazon Boost confirme la revisión visual.

- 69 URL canónicas preparadas para indexación.
- Portada, servicios, guías, blog y casos documentados incluidos.
- `/quienes-somos/` se conserva como borrador completo, con `noindex`, fuera del header y del sitemap.
- Las herramientas internas se bloquean en producción salvo activación expresa.
- La IA permanece condicionada por su configuración de entorno.

El detalle operativo está en [docs/candidata-publicacion.md](docs/candidata-publicacion.md).

## Desarrollo local

```bash
npm install
npm run dev
```

La web queda disponible en `http://localhost:4321/`.

## Validación

```bash
npm run validate
npm run release:check
```

`validate` compila, ejecuta la suite de pruebas y revisa la salida técnica. `release:check` añade las aprobaciones manuales de datos legales, pruebas comerciales, servicios de producción y revisión visual.

## Variables de entorno

Usa `.env.example` para la configuración pública de Firebase y herramientas internas. Usa `.dev.vars.example` para secretos y configuración del asistente de IA. Los archivos reales `.env` y `.dev.vars` no se versionan.

Nunca expongas en el cliente claves privadas, credenciales de OpenRouter ni secretos administrativos.

## Estructura principal

```text
src/
  components/     Componentes globales y secciones de la portada
  data/           Contenido, catálogo SEO y estado de publicación
  layouts/        Plantillas comerciales, editoriales y de guías
  lib/            Lógica de formularios, gráficas, IA y utilidades
  pages/          Rutas Astro y endpoints
  styles/         Estilos globales y específicos
scripts/          Pruebas y comprobaciones de publicación
tests/            Suite automatizada
docs/             Revisión editorial, SEO y salida a producción
```

## Publicación

La configuración de Hosting está en `.openai/hosting.json` y el adaptador de Cloudflare en `astro.config.mjs`. El despliegue solo se ejecuta después de la aprobación expresa de la candidata.
