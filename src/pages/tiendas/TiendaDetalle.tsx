import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerTienda, type Tienda } from "../../services/TiendasService";
import { useCarrito } from "../../store/carrito.store";
import QtyInput from "../../components/QtyInput";

export default function TiendaDetalle() {
  const { id } = useParams();
  const [tienda, setTienda] = useState<Tienda>();
  const { add } = useCarrito();

  // Mapa de cantidades por id de producto (default 1)
  const [qty, setQty] = useState<Record<number, number>>({});

  useEffect(() => {
    const idNum = Number(id);
    obtenerTienda(idNum).then((t) => {
      setTienda(t);
      if (t) {
        const init: Record<number, number> = {};
        t.catalogo.forEach((p) => (init[p.idProducto] = 1));
        setQty(init);
      }
    });
  }, [id]);

  if (!tienda) return <div>Cargando...</div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <img src={tienda.logo} className="h-12 rounded" />
        <div>
          <h2 className="text-2xl font-bold">{tienda.nombre}</h2>
          <p className="text-sm text-gray-400">{tienda.ubicacion}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {tienda.catalogo.map((p) => (
          <div key={p.idProducto} className="border border-white/10 rounded-xl p-4">
            <img src={p.imagen} alt={p.nombre} className="h-36 w-full object-cover rounded" />
            <h4 className="mt-2 font-medium">{p.nombre}</h4>
            <p className="mb-3">S/ {p.precio}</p>

            <div className="flex items-center justify-between gap-3">
              <QtyInput
                value={qty[p.idProducto] ?? 1}
                onChange={(n) => setQty((q) => ({ ...q, [p.idProducto]: n }))}
              />
              <button
                className="bg-black text-white rounded px-3 py-1"
                onClick={() => add({ producto: p as any, cantidad: qty[p.idProducto] ?? 1 })}
              >
                Agregar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
