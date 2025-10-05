import type { DeliveryStrategy } from "../DeliveryStrategy";

export class FlatDelivery implements DeliveryStrategy {
  nombre = "Tarifa Plana";
  calcular(_subtotal: number): number {
    return 5; // S/5 como tus maquetas
  }
}
