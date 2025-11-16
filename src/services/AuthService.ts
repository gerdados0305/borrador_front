// src/services/AuthService.ts
export type User = {
  codigo: string;
  nombre: string;
  password: string;
  rol?: "alumno" | "repartidor" | "admin" | "tienda";
  tiendaId?: number; // si es rol tienda, a qué tienda gestiona (mock)
  email?: string;    // correo (solo se usará realmente en tiendas)
};

// Usuarios base (mock, los que ya tenías)
export const usersMock: User[] = [
  { codigo: "20194613", nombre: "Piero S.",        password: "1234", rol: "alumno" },
  { codigo: "R001",     nombre: "Piero Rodrigo",   password: "1234", rol: "repartidor" },
  { codigo: "TDUNKIN",  nombre: "Dunkin Admin",    password: "1234", rol: "tienda", tiendaId: 1 },
  { codigo: "TSTAR",    nombre: "Starbucks Admin", password: "1234", rol: "tienda", tiendaId: 2 },
  { codigo: "TFRUTIX",  nombre: "Frutix Admin",    password: "1234", rol: "tienda", tiendaId: 3 },
];

const CUSTOM_KEY = "users_custom";

function loadCustomUsers(): User[] {
  try {
    const raw = localStorage.getItem(CUSTOM_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as User[];
  } catch {
    return [];
  }
}

function saveCustomUsers(users: User[]) {
  try {
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(users));
  } catch {
    // si falla localStorage, lo ignoramos (es solo mock)
  }
}

// 👉 Login: busca tanto en los mocks como en los registrados
export async function loginUser(codigo: string, pass: string): Promise<User | null> {
  const all = [...usersMock, ...loadCustomUsers()];
  const u = all.find((u) => u.codigo === codigo && u.password === pass);
  return Promise.resolve(u ?? null);
}

// 👉 Registro: guarda usuarios nuevos en localStorage
export async function registerUser(newUser: User): Promise<User> {
  const custom = loadCustomUsers();
  const all = [...usersMock, ...custom];

  // No permitir códigos/usuarios repetidos
  if (all.some((u) => u.codigo === newUser.codigo)) {
    throw new Error("El usuario o contraseña no es valido");
  }

  const userToSave: User = { ...newUser };

  custom.push(userToSave);
  saveCustomUsers(custom);

  return Promise.resolve(userToSave);
}
