import { useCarrito } from "../../store/carrito.store";
import { DeliveryCalculator } from "../Pricing/DeliveryCalculator";
import { FlatDelivery } from "../Pricing/strategies/FlatDelivery";

export class CheckoutFacade {
  async confirmar(){
    const { items, subtotal, clear } = useCarrito.getState();
    const sub = subtotal();
    const delivery = new DeliveryCalculator(new FlatDelivery()).calcular(sub);
    const pedido = {
      id: crypto.randomUUID(),
      fecha: new Date().toISOString(),
      estado: "CREADO",
      items, subtotal: sub, delivery, total: sub + delivery
    };
    const hist = JSON.parse(localStorage.getItem("historial")||"[]");
    hist.push(pedido);
    localStorage.setItem("historial", JSON.stringify(hist));
    clear();
    return pedido;
  }
}
