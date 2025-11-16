// src/pages/repartidor/Disponibles.tsx
import { useEffect, useState } from "react";

type Pedido = {
  id: string;
  fecha: string;
  estado: "CREADO" | "ACEPTADO" | "ENTREGADO";
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

function savePedidos(pedidos: Pedido[]) {
  try {
    localStorage.setItem("historial", JSON.stringify(pedidos));
  } catch {}
}

function appendAsignado(id: string) {
  try {
    const raw = localStorage.getItem("repartidor_asignados");
    const arr = raw ? JSON.parse(raw) : [];
    if (!arr.includes(id)) {
      arr.push(id);
      localStorage.setItem("repartidor_asignados", JSON.stringify(arr));
    }
  } catch {}
}

export default function Disponibles() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    setPedidos(loadPedidos());
  }, []);

  const disponibles = pedidos.filter((p) => p.estado === "CREADO");

  const aceptar = (id: string) => {
    const next = pedidos.map((p) =>
      p.id === id ? { ...p, estado: "ACEPTADO" } : p
    );
    savePedidos(next);
    appendAsignado(id);
    setPedidos(next);
  };

  return (
    <section className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold">Entregas disponibles</h1>
        <p className="text-sm text-gray-300">
          Pedidos que aún no han sido aceptados por ningún repartidor.
        </p>
      </header>

      {disponibles.length === 0 ? (
        <p className="text-sm text-gray-300">
          Por ahora no hay pedidos disponibles para aceptar.
        </p>
      ) : (
        <div className="space-y-3">
          {disponibles.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3"
            >
              <div>
                <div className="font-semibold">#{p.id.slice(0, 8)}</div>
                <div className="text-xs text-gray-400">
                  Fecha: {new Date(p.fecha).toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{s(p.total)}</div>
                <button
                  onClick={() => aceptar(p.id)}
                  className="mt-2 text-xs px-3 py-1 rounded bg-blue-600 hover:bg-blue-700"
                >
                  Aceptar entrega
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
