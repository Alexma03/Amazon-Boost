# Correcciones previas a Google Ads

Estado: preparadas y verificadas en local; no publicadas.

## Aplicado

- El formulario usa POST como defensa adicional y sus campos/botón están deshabilitados hasta que el manejador seguro de envío queda instalado. Sin JavaScript ofrece correo y teléfono; no intenta entregar una solicitud ni introducir datos personales en la URL.
- Se conserva el guardado existente en Firestore y el mismo contrato de campos. No se han cambiado el panel de mensajes ni sus permisos.
- El formulario no depende de que cargue GSAP: la animación se importa por separado y un fallo de esa descarga no desactiva la recepción de solicitudes.
- Los CTA de auditoría de la portada llegan directamente al teléfono/formulario, estable a 84 px del borde superior. También se atienden las entradas directas con `#auditoria`. El cambio de ancla conserva la query string de la portada.
- Los campos móviles usan 16 px y altura mínima de 44 px; consentimiento y notas son más legibles. El teléfono puede distribuirse en dos líneas sin desbordar.
- WhatsApp mantiene su formato original flotante en la esquina inferior derecha, tanto en móvil como en escritorio. Se retiró el traslado al header a petición del usuario; el enlace y el aspecto original no cambian.
- WhatsApp es ahora la primera opción de contacto de la portada y tiene otro CTA destacado junto al formulario. El flotante invita a hablar sobre la marca con Amazon Boost. La auditoría, el formulario y los enlaces a casos siguen disponibles; no se cambian el número ni el envío de solicitudes.
- El marco del portátil y la imagen del producto utilizan WebP sin pérdida a la resolución original. Se conservan los PNG originales y se comprobó igualdad de cada píxel visible y del canal alfa. La codificación puede normalizar RGB oculto en píxeles completamente transparentes: no cambia su representación.
- Marco del portátil: 531.371 a 339.068 bytes. Producto: 1.229.189 a 873.708 bytes. Ahorro combinado de 547.784 bytes, sin cambiar imágenes, recortes ni cifras de los casos.
- La librería de gráficas se importa cuando la sección está a menos de 400 px del viewport. Los controles del carrusel se inicializan desde el principio.
- Se precarga la fuente local de negrita y se eliminan conexiones preventivas a servidores de fuentes de Google que no se usan.

## Verificación

- Compilación completada.
- 153 pruebas automáticas correctas, incluidos controles de regresión del formulario, las gráficas y la prioridad de WhatsApp.
- Navegador en 320, 390 y 1440 px: sin errores de ejecución, imágenes rotas ni scroll horizontal; destino del formulario estable bajo el header.
- Apertura del portátil comprobada comparando su transformación antes/después de desplazarse.
- Cambio de casos comprobado y canvas con píxeles dibujados, no solo dimensiones no nulas.
- Sin JavaScript: campos y envío deshabilitados, método POST, alternativas de contacto disponibles.
- Envío aislado: éxito, limpieza del formulario y error recuperable conservando los campos. Se bloqueó todo acceso real a Firestore y la descarga de ScrollTrigger durante esa prueba.
- No se envió ninguna solicitud real ni se leyó la bandeja de clientes. Sigue pendiente la comprobación controlada de entrega a producción antes de anunciarse.

## Rendimiento

Las primeras versiones locales optimizadas dieron 80–81/100 en móvil, LCP de aproximadamente 5 segundos y TBT de 9–13 ms; escritorio dio 99/100 y LCP de aproximadamente 0,97 segundos.

La producción anterior dio 69/100 móvil y LCP de unos 7,4 segundos; escritorio dio 95/100. **No es una comparación controlada del mismo hosting**: las nuevas pruebas son locales, sin el tráfico, capa de entrega e instrumentación observados en producción. No se garantiza el mismo resultado al publicar ni se considera bueno un LCP móvil de 5 segundos.

Se ensayó incluir todas las hojas de estilo en el HTML. No aportó una mejora suficiente en esta prueba y se descartó, conservando la configuración original y su caché de estilos.

La reducción de archivos y descarga diferida son cambios reales; los resultados de velocidad deben volver a comprobarse después de la publicación. No se han eliminado animaciones, contenido, servicios, testimonios ni pruebas de resultados.

## Google Ads: puntos 1 y 2

Se aplaza su configuración completa hasta disponer de la cuenta esta tarde. No hay etiquetas Google Ads ni almacenamiento nuevo de click IDs/cookies publicitarias en estos cambios.

- La cuenta y las acciones de conversión aportan los identificadores que necesita la instalación web.
- Debe medirse una solicitud confirmada, no un mero clic o un envío fallido.
- La atribución no aparece automáticamente por crear Ads: habrá que conservar su origen al navegar y asociarlo al contacto, revisando contrato/permisos de Firestore y configuración de privacidad.
- Los enlaces desde servicios a la portada siguen necesitando esa conservación de origen; el ajuste actual del ancla solo garantiza que el salto dentro de la portada no borra sus parámetros.
- Medición y atribución deben quedar verificadas antes de invertir, aunque no es necesario que estén activas antes de crear la cuenta.

## No modificado

Páginas legales, landing específica de anuncios, textos de reseñas, cifras de casos, identidad, URLs/canonical y trabajo previo de borradores de guías. No se ha hecho commit, push ni despliegue.

Vista compilada local: http://127.0.0.1:4334/.
Evidencias privadas: `artifacts/private/google-ads-audit-2026-10-11/`.
