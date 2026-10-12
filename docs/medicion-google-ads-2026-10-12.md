# Medicion Google Ads: primera captacion

## Cuenta y destinos verificados

Cuenta autorizada: `300-314-3097`. Etiqueta: `AW-11354063574`.

| Accion | send_to | Uso |
| --- | --- | --- |
| AB - Auditoria recibida | AW-11354063574/VQfCCI_TrZkdENaFhaYq | Principal: solicitud guardada |
| AB - Clic en WhatsApp | AW-11354063574/kiA2CJLTrZkdENaFhaYq | Secundaria: clic, no conversacion |
| AB - Clic en telefono | AW-11354063574/LRtaCJXTrZkdENaFhaYq | Secundaria: clic, no llamada atendida |

Las tres acciones usan recuento Una, ventana post-clic de 30 dias y sin valor monetario. No se incorporaron a los objetivos predeterminados de la cuenta para no modificar la campana antigua. Al crear la campana de Amazon Boost hay que seleccionar expresamente Auditoria recibida, no el objetivo antiguo Vista de una pagina. No se lanzaron anuncios ni se modifico facturacion.

## Consentimiento y datos

- Aviso pequeno no modal: navegar, contactar y enviar una solicitud no requieren aceptar publicidad.
- Consent Mode v2 basico: los cuatro permisos parten denegados. No se descarga la biblioteca de Google antes de aceptar medicion.
- Medicion concede ad_storage y ad_user_data; personalizacion tiene opcion propia. analytics_storage permanece denegado porque no se instalo Google Analytics.
- Aceptar contacto en el formulario no concede permisos publicitarios.
- Una etiqueta por pagina, instalada desde el layout compartido; excluye admin, borradores y respuestas de error.
- Preferencia local durante 180 dias, procedencia de campana en sesion durante 30 minutos y configuracion de cookies publicitarias hasta 90 dias. Storage bloqueado o datos corruptos no activan permisos por defecto.
- El visitante puede cambiar su eleccion desde el pie de pagina y la politica de cookies. Retirar el permiso detiene nuevas conversiones, vacia eventos pendientes y procedencia; no deshace transmisiones anteriores ni elimina cookies de terceros.
- UTM y gclid/gbraid/wbraid se recogen solo con permiso, mediante lista cerrada de campos y longitudes limitadas. Pueden guardarse como attribution junto a la solicitud en Firestore. No se copian parametros arbitrarios.
- Los eventos personalizados solo contienen destino, pagina sin query/hash, referencia vacia y, en la auditoria, transaction_id aleatorio de Firestore. No incluyen nombre, correo, telefono ni consulta. Google sigue recibiendo informacion tecnica de conexion al activar la medicion.

## Ajustes remotos importantes

Tag Assistant detecto que la etiqueta de Google tenia habilitada la deteccion automatica de datos proporcionados por usuarios. Se desactivaron y guardaron tanto la deteccion automatica como las funciones de datos proporcionados por usuarios. Conversiones mejoradas tambien quedan desactivadas en el codigo.

Se desactivo la deteccion automatica de scroll, clics externos, interacciones con formularios, videos, descargas y vistas por cambios de historial. Google mantiene su vista inicial de pagina, cuyo control aparece deshabilitado en la interfaz. No se vinculo la propiedad GA4 antigua ajena a Amazon Boost.

## Formulario y enlaces

Se modifico el handler original de .audit-form. Primero termina addDoc en email_submissions; luego muestra confirmacion y envia la conversion con submission.id. Validacion fallida, apertura o fallo de Firebase no convierten. Un fallo de medicion no impide guardar ni confirmar la solicitud.

El listener compartido reconoce enlaces HTTPS a wa.me, api.whatsapp.com, web.whatsapp.com, whatsapp: y tel:. Conserva destinos y navegacion. Un mismo evento de clic no se procesa dos veces. Auditoria tiene deduplicacion local por ID y transaction_id para la deduplicacion de Google.

## Pruebas y limites de la evidencia

| Prueba | Metodo | Resultado |
| --- | --- | --- |
| Envio correcto | Dos envios reales de prueba, marcados NO CONTACTAR | Confirmacion visible de Firebase; conversion de auditoria visible en Tag Assistant |
| transaction_id | Tag Assistant, evento 26 conversion | ID de documento presente y destino de auditoria correcto |
| WhatsApp | Boton flotante en navegador, evento 38 conversion | AB - Clic en WhatsApp detectado, destino correcto |
| Telefono | Enlace tel en navegador, evento 39 conversion | AB - Clic en telefono detectado |
| Consentimiento aceptado | Tag Assistant, tabla Consentimiento | Default denegado; Ads concedido segun eleccion, Analytics denegado |
| Sin decision y rechazado | Navegador local + pruebas automatizadas | Cero scripts de Google; aviso se oculta al rechazar |
| Movil | Navegador a 390 x 844 | Aviso compacto sin superponer el boton flotante WhatsApp |
| Validacion fallida | Navegador y handler original con mocks | No escritura ni conversion |
| Error Firebase | Handler original con importaciones Firebase simuladas | Estado de error, cero conversiones; no se provoco una averia en produccion |
| Fallo de etiqueta | Runtime y handler con simulacion | Guardado/confirmacion independientes de medicion |
| Duplicados | Tests del runtime y Tag Assistant | Una llamada personalizada por clic/documento; una biblioteca y config por pagina |
| PII | Payload observado + codigo + ajustes remotos guardados | Eventos personalizados sin contacto/consulta; automatismos de Google desactivados tras detectar su configuracion inicial |

Google puede generar mas de un hit de transporte por una llamada de conversion (ccm y pagead); no equivale a emitir dos eventos personalizados. No se interpreta una prueba local como conversion atribuida a un anuncio real. En Google Ads las tres acciones figuraban Esperando conversiones, no Configuracion erronea, tras las pruebas locales.

Evidencias privadas: artifacts/private/ads-cookie-mobile.png, ads-consent-tag-assistant.png y ads-conversion-actions.png. No se suben capturas de la cuenta ni leads de prueba al repositorio publico.

La bateria completa se valida sobre una exportacion limpia del commit de entrega, sin las modificaciones independientes de guias. El primer pase sobre el arbol de trabajo encontro una discrepancia de un test SEO relacionada con los borradores de guias/salida compilada; no se incluyo ni se altero ese trabajo en esta entrega.

## Fuentes oficiales de referencia

- https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic
- https://support.google.com/google-ads/answer/7548399?hl=es
- https://support.google.com/google-ads/answer/13262500?hl=en
- https://developers.google.com/tag-platform/security/guides/customize-cookies

## Antes de activar una campana

Resolver la facturacion de la cuenta, crear la campana y seleccionar sus objetivos correctos. Comprobar despues la atribucion con trafico publicitario real y consentimiento, sin clics de prueba sobre los propios anuncios. Los clics en WhatsApp/telefono no acreditan un cliente potencial cualificado ni una venta.
