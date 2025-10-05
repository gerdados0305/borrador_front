import { useCarrito } from "../../store/carrito.store";
import { Link } from "react-router-dom";
import { DeliveryCalculator } from "../../services/Pricing/DeliveryCalculator";
import { FlatDelivery } from "../../services/Pricing/strategies/FlatDelivery";

export default function Carrito(){
  const { items, remove, subtotal } = useCarrito();
  const sub = subtotal();
  const del = new DeliveryCalculator(new FlatDelivery()).calcular(sub);
  const total = sub + del;

  return (
    <section className="grid md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">TU CARRITO</h2>
        {items.map(it=>(
          <div key={it.producto.idProducto} className="flex justify-between items-center border-b py-3">
            <div className="flex items-center gap-3">
              <img src={it.producto.imagen} className="h-12 w-12 object-cover rounded" />
              <div>{it.producto.nombre} x{it.cantidad}</div>
            </div>
            <div className="flex gap-3 items-center">
              <span>S/ {it.producto.precio * it.cantidad}</span>
              <button onClick={()=>remove(it.producto.idProducto)} className="text-red-600">X</button>
            </div>
          </div>
        ))}
      </div>
      <aside className="border rounded p-4 h-fit">
        <h3 className="font-semibold">TOTAL ESTIMADO: S/ {sub}</h3>
        <p>SERVICIO DE DELIVERY: S/ {del}</p>
        <h2 className="text-xl font-bold">TOTAL: S/ {total}</h2>
        <Link to="/checkout" className="mt-3 inline-block bg-orange-500 text-white rounded px-4 py-2">Confirmar</Link>
      </aside>
    </section>
  );
}
