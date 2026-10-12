# Medicion Google Ads: migracion a la cuenta nueva

Cuenta: `614-654-2052` (AmznBoost). Etiqueta: `AW-18508657011`.

Los identificadores se obtuvieron de los fragmentos reales de Google Ads, no del ID de cliente ni de valores provisionales.

| Accion | Destino | Optimizacion |
| --- | --- | --- |
| AB - Auditoria recibida | AW-18508657011/k3_bCNDqxpodEPPizvlE | Principal |
| AB - Clic en WhatsApp | AW-18508657011/Dol2CNPqxpodEPPizvlE | Secundaria |
| AB - Clic en telefono | AW-18508657011/bK2JCNbqxpodEPPizvlE | Secundaria |

Las tres acciones son eventos manuales web, con recuento Una, ventana post-clic de 30 dias, atribucion basada en datos y sin valor monetario. Las dos acciones genericas creadas por el asistente de alta se conservan como secundarias; no se borraron. Solo la auditoria recibida queda como accion principal.

## Alcance

- Se sustituyen solo los cuatro identificadores en `src/lib/google-ads.mjs` y se comprueban explicitamente en el test.
- No cambia el formulario: la conversion sigue ejecutandose despues de guardar correctamente en Firestore, con el ID del documento como transaction_id.
- No cambia el consentimiento: modo basico, denegado por defecto y biblioteca cargada solo tras permiso de medicion; contacto no equivale a consentimiento publicitario.
- No cambia el contenido, diseno, SEO, enlaces, admin ni los borradores de guias.
- Los eventos no incluyen nombre, correo, telefono ni texto de consulta.
- No se crea ni activa ninguna campana ni se modifica su presupuesto.

## Configuracion remota

La etiqueta nueva tenia habilitadas por defecto las funciones de datos proporcionados por usuarios y su deteccion automatica. Se desactivaron ambas y se guardaron. Conversiones mejoradas no se activaron.

Se desactivaron y guardaron: vistas por cambios de historial, desplazamientos, clics de salida, interacciones con formularios, videos y descargas. La vista inicial de pagina es un control obligatorio de Google, no una conversion de auditoria.

No se vincularon propiedades GA4 ni otras cuentas ajenas.

## Comprobaciones

- Compilacion de una exportacion aislada de la version publicada con solo los identificadores nuevos: correcta.
- Bateria completa sobre esa exportacion: 158/158 pruebas aprobadas.
- Pruebas de medicion: 11/11, incluidos consentimiento rechazado/aceptado, guardado correcto, validacion, error Firebase, fallo de etiqueta, enlaces y deduplicacion.
- Los fallos Firebase se simulan en tests; no se provoca una averia en produccion.
- Las pruebas de Tag Assistant documentadas en `medicion-google-ads-2026-10-12.md` corresponden a la cuenta anterior. No son evidencia de una prueba interactiva nueva.
- Google Ads puede mostrar Inactivo mientras no haya recibido eventos o mientras se actualiza el diagnostico. No equivale a una atribucion verificada de trafico publicitario real.

## Comprobacion en produccion

Publicacion de la migracion: commit `1978af4`, enviado a `main`. La homepage responde HTTP 200 y su modulo `google-ads.DXaM4t47.js` contiene la etiqueta y los tres destinos nuevos, sin el ID de la cuenta anterior.

Tag Assistant conectado a `amznboost.es` detecto un unico destino Google Ads: `AW-18508657011`. Se comprobaron las siguientes acciones reales en la web publicada:

| Prueba | Resultado |
| --- | --- |
| Rechazar y recargar | Ningun script gtag de Google Ads en el DOM; preferencias reabiertas sin permisos seleccionados |
| Aceptar solo medicion | ad_storage y ad_user_data concedidos; analytics_storage y ad_personalization denegados; todos denegados por defecto |
| Formulario vacio | Ningun evento de conversion |
| Envio correcto | Confirmacion Solicitud recibida; evento 31 con destino de auditoria y transaction_id del documento creado |
| WhatsApp flotante | Evento 32, destino de WhatsApp, sin enviar una conversacion |
| Enlace de telefono | Evento 33, destino de telefono, sin realizar una llamada |
| Duplicados | Tres llamadas personalizadas en total para tres acciones; una auditoria y un clic de cada canal |
| Datos personales | Payloads observados sin nombre, email, telefono ni consulta; page_location sin query y page_referrer vacio |

La solicitud real se identifica como PRUEBA MEDICION CUENTA NUEVA - NO CONTACTAR. No contiene un telefono de cliente. Se conserva en la base de datos; no se borro ningun mensaje.

La prueba de error Firebase sigue siendo una simulacion automatizada, no un fallo forzado en produccion. Tag Assistant puede insertar un script extra de depuracion: no representa una segunda instalacion normal. Se recargo la pagina durante la prueba de consentimiento, por lo que dos Config en el historial corresponden a dos cargas, no a duplicacion en una pagina.

Evidencias privadas: `artifacts/private/ads-new-account-conversions.png` y `artifacts/private/ads-new-account-tag-assistant.png`. No se incluyen en el repositorio publico. Pendiente solo la atribucion y calidad de oportunidades con una campana real; no se han activado anuncios ni realizado clics sobre anuncios propios.
