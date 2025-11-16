type Pedido = {
  id: string;
  fecha: string;
  estado: "CREADO" | "ACEPTADO" | "ENTREGADO";
  destino?: string;
  tienda?: string;
  total: number;
};

const s = (n: number) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(n);

function loadPedidos(): Pedido[] {
  try {
    return JSON.parse(localStorage.getItem("historial") || "[]");
  } catch {
    return [];
  }
}

function loadAsignadosIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem("repartidor_asignados") || "[]");
  } catch {
    return [];
  }
}

export default function RepartidorDashboard() {
  const pedidos = loadPedidos();
  const ids = new Set(loadAsignadosIds());

  const asignados = pedidos.filter(
    (p) => ids.has(p.id) || p.estado === "ACEPTADO"
  );

  return (
    <section className="space-y-4">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold">Entregas asignadas</h1>
          <p className="text-sm text-gray-300">
            Aquí ves los pedidos que ya aceptaste y están en curso.
          </p>
        </div>
      </header>

      {asignados.length === 0 ? (
        <p className="text-sm text-gray-300">
          No tienes entregas asignadas en este momento.
        </p>
      ) : (
        <div className="space-y-3">
          {asignados.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3"
            >
              <div>
                <div className="font-semibold">
                  #{p.id.slice(0, 8)} {p.tienda && `— ${p.tienda}`}
                </div>
                {p.destino && (
                  <div className="text-sm text-gray-300">{p.destino}</div>
                )}
                <div className="text-xs text-gray-400 mt-1">
                  Estado: {p.estado}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{s(p.total)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
