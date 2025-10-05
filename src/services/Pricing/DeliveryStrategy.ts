// NO default. Export NOMBRE explícito.
export interface DeliveryStrategy {
  nombre: string;
  calcular(subtotal: number, distanciaKm?: number, hora?: number): number;
}
