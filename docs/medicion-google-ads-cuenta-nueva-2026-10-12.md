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

Pendiente de completar: comprobacion de la version publicada y prueba interactiva con la etiqueta nueva.
