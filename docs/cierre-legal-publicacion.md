# Cierre legal antes de publicar

Las rutas `/aviso-legal/`, `/politica-de-privacidad/` y `/politica-de-cookies/` son borradores enlazados desde el pie de página. Mientras `legalReady` sea falso llevan `noindex` y no entran en el sitemap. El control de publicación sigue bloqueado. No se debe cambiar el indicador a `true` para ocultar datos sin verificar.

## Datos que debe confirmar Amazon Boost

1. Titular real del sitio: nombre completo o razón social, NIF/CIF, dirección profesional y datos registrales si corresponden. No asumir que el nombre del fundador publicado en la web coincide con el titular fiscal.
2. Plazo o criterio de conservación de solicitudes que no terminan en contrato, y plazo aplicable a expedientes de clientes. Confirmar el procedimiento real de eliminación en Firebase.
3. Tratamiento de proveedores: configuración y acuerdos de Cloudflare y Firebase/Google, ubicación y posibles transferencias internacionales, además del proveedor de correo y del uso voluntario de WhatsApp.
4. Auditoría de cookies en el dominio definitivo: revisar navegación pública, formulario y área privada antes y después de cada interacción; registrar nombre, proveedor, finalidad y duración de cada cookie o almacenamiento. Una petición simple a la portada pública el 1 de octubre de 2026 no mostró cabecera `Set-Cookie` ni etiquetas habituales de analítica, pero no sustituye esta revisión.
5. Revisión y aprobación jurídica de los tres textos y de la información resumida junto a los formularios.

## Comprobación técnica posterior

Completar `src/data/legal-status.ts` **solo con datos confirmados**. Después comprobar que las tres rutas dejan de ser `noindex`, aparecen una sola vez en el sitemap, tienen canónica propia y mantienen los enlaces del formulario y del pie. Ejecutar compilación, pruebas y `release:check`, y repetir la revisión en `amznboost.es` después del despliegue.

Fuentes oficiales de referencia: [derecho de información de la AEPD](https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos/derecho-de-informacion), [guía de cookies de la AEPD](https://www.aepd.es/guias/guia-cookies.pdf) y [artículo 10 de la LSSI](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758).
