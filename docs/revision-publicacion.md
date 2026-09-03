# Revision previa a publicacion

## Cerrado

- La portada, servicios, casos documentados, guias y blog tienen una sola URL canonica y un solo H1.
- La candidata publica contiene 69 URL canonicas; `Quienes somos` queda como borrador noindex fuera del header, footer y sitemap.
- Las rutas de administracion y el panel demo quedan bloqueados en produccion salvo activacion expresa.
- `npm run validate` comprueba compilacion, pruebas y salida; `npm run release:check` exige tambien las aprobaciones manuales.
- Los borradores de casos no aparecen en el directorio publico ni en el sitemap.
- El primer caso utiliza el pico documentado de 5.904,74 EUR y evita el porcentaje incorrecto de +1000%.
- La pantalla de Seller Central del portatil se identifica como simulacion visual.
- Los servicios de desbloqueo, publicidad e imagenes no prometen resultados garantizados.
- Las guias y el blog enlazan fuentes primarias y terminan con una llamada a la auditoria.
- Firebase Analytics no se carga mientras no exista una decision y un consentimiento de analitica.

## Datos que debe confirmar Amazon Boost

- Nombre y apellidos publicos del fundador.
- URL definitiva del perfil de LinkedIn.
- Nombres, cargos y autorizacion de publicacion de cada integrante del equipo.
- Fotografias reales aprobadas: una imagen de equipo u oficina y retratos individuales.
- Vigencia de las cifras `+20`, `+3 anos` y `+50k EUR/ano`.
- Fuente o calculo que respalda cada cifra anterior.
- Que testimonios internos tienen autorizacion expresa y quien puede aparecer identificado.
- Que testimonios ya se publicaron en Trustpilot para sustituir su version interna por la fuente externa.

## Informacion necesaria para textos legales

- Titular legal de la web o razon social.
- NIF o CIF.
- Domicilio o direccion profesional que deba constar en el aviso legal.
- Correo de contacto para privacidad.
- Plazo interno previsto para conservar solicitudes de auditoria.
- Confirmacion de los proveedores que se utilizaran en produccion: Cloudflare, Firebase y OpenRouter.

Los textos legales deben revisarse con el asesor correspondiente antes de publicar. La web no debe enlazar una politica incompleta ni inventar datos del titular.

## Revision final

- Sustituir la fotografia actual por material real aprobado.
- Revisar en escritorio y movil la pagina `Quienes somos` con las fotos definitivas.
- Comprobar formulario, telefono, WhatsApp, LinkedIn, Trustpilot y casos desde produccion.
- Validar aviso legal, privacidad y cookies con los datos del titular.
- Ejecutar compilacion, pruebas, enlaces internos y revision visual final.
- No desplegar mientras `npm run release:check` siga mostrando aprobaciones pendientes.
