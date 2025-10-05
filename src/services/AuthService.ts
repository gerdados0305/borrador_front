// Tipos
export type User = {
  codigo: string;
  nombre: string;
  password: string;
  rol?: "alumno" | "repartidor" | "admin";
};

// Base de usuarios mock
export const usersMock: User[] = [
  { codigo: "20194613", nombre: "Piero", password: "1234", rol: "alumno" },
  // agrega más aquí:
  { codigo: "20201234", nombre: "Rodrigo",  password: "1234", rol: "alumno" },
  { codigo: "R001",     nombre: "Repartidor",  password: "1234", rol: "repartidor" },
];

// “Autenticar”
export async function loginUser(codigo: string, pass: string): Promise<User | null> {
  const u = usersMock.find(u => u.codigo === codigo && u.password === pass);
  return Promise.resolve(u ?? null);
}
