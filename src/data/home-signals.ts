export const diagnosticSignals = {
  ads: {
    label: "Amazon Ads", title: "El gasto sube, pero el margen no.",
    text: "Revisamos campañas, términos de búsqueda y ASINs para reducir gasto improductivo y concentrar la inversión donde genera ventas rentables.",
    metric: "PPC", detail: "Inversión controlada. Ventas que crecen.", tone: "orange",
    checks: [
      { label: "Búsquedas", detail: "Intención de compra" },
      { label: "Campañas", detail: "Estructura e inversión" },
      { label: "Rentabilidad", detail: "Coste y margen por producto" },
    ],
  },
  listing: {
    label: "Conversión", title: "Hay visitas. Falta una razón para comprar.",
    text: "Trabajamos imagen principal, infografías, copy, precio, reseñas y A+ como un único sistema de conversión.",
    metric: "CVR", detail: "Más conversiones. Más pedidos.", tone: "lime",
    checks: [
      { label: "Imagen principal", detail: "Captar el clic adecuado" },
      { label: "Ficha de producto", detail: "Imágenes, argumentos y contenido A+" },
      { label: "Decisión de compra", detail: "Precio, confianza y conversión" },
    ],
  },
  catalog: {
    label: "Catálogo", title: "Un catálogo desordenado frena las ventas.",
    text: "Variantes rotas, incidencias, supresiones y errores de catálogo dejan de ser ruido y pasan a tener prioridad.",
    metric: "ASIN", detail: "Un catálogo que crece y rota", tone: "blue",
    checks: [
      { label: "Variantes", detail: "Relaciones entre productos" },
      { label: "Contenido", detail: "Atributos y fichas completas" },
      { label: "Disponibilidad", detail: "Incidencias y supresiones" },
    ],
  },
  stock: {
    label: "FBA / FBM", title: "El ranking se pierde cuando falta stock.",
    text: "Planificamos demanda, reposición y envíos para que el stock llegue a FBA a tiempo, y coordinamos FBM cuando la estrategia lo necesita.",
    metric: "FBA", detail: "Reposición y stock estable", tone: "red",
    checks: [
      { label: "Previsión", detail: "Demanda y reposición" },
      { label: "Inventario", detail: "Cobertura y disponibilidad" },
      { label: "Logística", detail: "FBA, FBM y Buy Box" },
    ],
  },
} as const;
