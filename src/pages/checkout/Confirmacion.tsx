import { useState } from "react";
import { api } from "../../config/api"; // Directamente usamos api para mayor control
import { useCarrito } from "../../store/carrito.store";
import { useNavigate } from "react-router-dom";

const s = (n:number)=> new Intl.NumberFormat("es-PE",{style:"currency",currency:"PEN"}).format(n);

export default function Confirmacion(){
  const navigate = useNavigate();
  const [metodo, setMetodo] = useState<"efectivo"|"yape">("efectivo");
  const [montoPago, setMontoPago] = useState(""); // HU 2.9: Monto con el que paga
  const { items, subtotal, clear } = useCarrito();
  
  const sub = subtotal();
  const delivery = 5.00; // HU 2.8: Esto debería venir del backend idealmente
  const total = sub + delivery;

  const confirmar = async () => {
    // Validación simple
    if(metodo === "efectivo" && Number(montoPago) < total) {
      return alert("El monto de pago debe ser mayor o igual al total.");
    }

    try {
      // HU 2.9: Enviamos la transacción real
      const payload = {
        items: items.map(i => ({ productoId: i.producto.idProducto, cantidad: i.cantidad })),
        metodoPago: metodo,
        montoCliente: metodo === "efectivo" ? Number(montoPago) : total,
        totalCalculado: total,
        deliveryCost: delivery
      };

      const { data } = await api.post("/pedidos", payload);
      
      clear(); // Limpiamos carrito (HU 2.7: se sincroniza vacío)
      alert(`¡Pedido #${String(data.id).padStart(8,'0')} confirmado!`);
      navigate("/historial"); // Redirigir a historial (HU 6.1)
    } catch (error) {
      console.error(error);
      alert("Hubo un error al procesar tu pedido.");
    }
  };

  return (
    <section className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Confirmar pedido</h1>
      
      {/* Resumen de montos */}
      <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
        <div className="flex justify-between"><span>Subtotal</span><span>{s(sub)}</span></div>
        <div className="flex justify-between"><span>Delivery</span><span>{s(delivery)}</span></div>
        <div className="flex justify-between font-bold text-xl border-t border-white/10 pt-2">
          <span>Total a Pagar</span><span>{s(total)}</span>
        </div>
      </div>

      {/* Selección de método */}
      <div className="space-y-3">
        <h3 className="font-semibold">Método de pago</h3>
        <div className="flex gap-4">
          <label className={`flex-1 cursor-pointer border rounded-lg p-3 flex items-center gap-2 ${metodo==="efectivo"?"border-orange-500 bg-orange-500/10":"border-white/20"}`}>
            <input type="radio" name="pago" className="hidden" checked={metodo==="efectivo"} onChange={()=>setMetodo("efectivo")} />
            <span>💵 Efectivo</span>
          </label>
          <label className={`flex-1 cursor-pointer border rounded-lg p-3 flex items-center gap-2 ${metodo==="yape"?"border-purple-500 bg-purple-500/10":"border-white/20"}`}>
            <input type="radio" name="pago" className="hidden" checked={metodo==="yape"} onChange={()=>setMetodo("yape")} />
            <span>📱 Yape</span>
          </label>
        </div>

        {/* Input condicional para Monto (HU 2.9) */}
        {metodo === "efectivo" && (
          <div className="mt-2">
            <label className="block text-sm mb-1">¿Con cuánto vas a pagar?</label>
            <input 
              type="number" 
              className="w-full bg-white/10 border border-white/20 rounded px-3 py-2"
              placeholder={`Mínimo ${s(total)}`}
              value={montoPago}
              onChange={e => setMontoPago(e.target.value)}
            />
            {Number(montoPago) > total && (
              <p className="text-xs text-green-400 mt-1">Vuelto estimado: {s(Number(montoPago) - total)}</p>
            )}
          </div>
        )}
      </div>

      <button onClick={confirmar} className="w-full bg-green-600 hover:bg-green-700 py-3 rounded font-bold text-lg">
        Realizar Pedido
      </button>
    </section>
  );
}