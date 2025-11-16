import { create } from "zustand";

export type Producto = { idProducto:number; nombre:string; precio:number; imagen:string; };
export type Item = { producto: Producto; cantidad: number };

export const useCarrito = create<{
  items: Item[];
  add: (it: Item) => void;
  remove: (id: number) => void;
  clear: () => void;
  subtotal: () => number;
}>((set, get) => ({
  items: JSON.parse(localStorage.getItem("carrito") || "[]"),
  add: (it) => {
    const items = [...get().items];
    const i = items.findIndex(x => x.producto.idProducto === it.producto.idProducto);
    if (i >= 0) items[i].cantidad += it.cantidad; else items.push(it);
    localStorage.setItem("carrito", JSON.stringify(items));
    set({ items });
  },
  remove: (id) => {
    const items = get().items.filter(x => x.producto.idProducto !== id);
    localStorage.setItem("carrito", JSON.stringify(items));
    set({ items });
  },
  clear: () => { localStorage.removeItem("carrito"); set({ items: [] }); },
  subtotal: () => get().items.reduce((s, it) => s + it.producto.precio * it.cantidad, 0),
}));
