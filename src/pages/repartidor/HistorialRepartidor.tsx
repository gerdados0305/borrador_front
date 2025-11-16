// src/pages/repartidor/HistorialRepartidor.tsx
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

function loadAsignadosIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem("repartidor_asignados") || "[]");
  } catch {
    return [];
  }
}

export default function HistorialRepartidor() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    setPedidos(loadPedidos());
  }, []);

  const ids = new Set(loadAsignadosIds());
  const historial = pedidos.filter((p) => ids.has(p.id));

  return (
    <section className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold">Historial de entregas</h1>
        <p className="text-sm text-gray-300">
          Resumen de pedidos que has aceptado y entregado.
        </p>
      </header>

      {historial.length === 0 ? (
        <p className="text-sm text-gray-300">
          Aún no tienes historial de entregas.
        </p>
      ) : (
        <div className="space-y-3">
          {historial.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3"
            >
              <div>
                <div className="font-semibold">#{p.id.slice(0, 8)}</div>
                <div className="text-xs text-gray-400">
                  Fecha: {new Date(p.fecha).toLocaleString()}
                </div>
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
