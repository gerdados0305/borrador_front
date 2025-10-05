export type Producto = {
  idProducto: number;
  nombre: string;
  precio: number;
  imagen: string;
};

export type Tienda = {
  idTienda: number;
  nombre: string;
  ubicacion: string;
  logo: string;
  catalogo: Producto[];
};

export const tiendasMock: Tienda[] = [
  {
    idTienda: 1,
    nombre: "DUNKIN DONUTS",
    ubicacion: "ULima - Edificio N",
    logo: "/img/tiendas/dunkin.jpg",
    catalogo: [
      { idProducto: 101, nombre: "Café Pequeño", precio: 8,  imagen: "/img/productos/coffee-small.jpg"  },
      { idProducto: 102, nombre: "Café Mediano", precio: 10, imagen: "/img/productos/coffee-medium.jpg" },
      { idProducto: 103, nombre: "Café Grande",  precio: 12, imagen: "/img/productos/coffee-large.jpg"  },
    ],
  },
  {
    idTienda: 2,
    nombre: "STARBUCKS",
    ubicacion: "ULima - Edificio A1",
    logo: "/img/tiendas/starbucks.jpg",
    catalogo: [
      { idProducto: 201, nombre: "Café Alto",   precio: 9,  imagen: "/img/productos/coffee-alto.jpg"   },
      { idProducto: 202, nombre: "Café Grande", precio: 11, imagen: "/img/productos/coffee-grande.jpg" },
      { idProducto: 203, nombre: "Café Venti",  precio: 13, imagen: "/img/productos/coffee-venti.jpg"  },
      { idProducto: 204, nombre: "Brownie",     precio: 8,  imagen: "/img/productos/brownie.jpg"  },
      { idProducto: 205, nombre: "Sandwich",     precio: 16,  imagen: "/img/productos/sandwich.jpg"  },
    ],
  },
];

export const listarTiendas = async () => Promise.resolve(tiendasMock);
export const obtenerTienda = async (id: number) =>
  Promise.resolve(tiendasMock.find(t => t.idTienda === id));
