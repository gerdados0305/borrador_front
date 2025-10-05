// src/services/Pricing/DeliveryCalculator.ts
import type { DeliveryStrategy } from "./DeliveryStrategy";

export class DeliveryCalculator {
  private strategy: DeliveryStrategy;   // ← campo explícito

  constructor(strategy: DeliveryStrategy) {
    this.strategy = strategy;           // ← asignación explícita
  }

  setStrategy(strategy: DeliveryStrategy) {
    this.strategy = strategy;
  }

  calcular(subtotal: number, distanciaKm?: number, hora?: number) {
    return this.strategy.calcular(subtotal, distanciaKm, hora);
  }
}
