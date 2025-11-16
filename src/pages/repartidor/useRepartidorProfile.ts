// src/pages/repartidor/useRepartidorProfile.ts
import { useAuth } from "../../store/auth.store";
import { useEffect, useState } from "react";

export type RepartidorData = {
  codigo: string;
  nombre: string;
  apellidos: string;
  correo: string;
  password: string;
};

const KEY_STATE = "repartidor_estado_activo";
const KEY_DATA = "repartidor_datos";

export function useRepartidorProfile() {
  const { sesion } = useAuth();
  const [activo, setActivo] = useState<boolean>(true);
  const [data, setData] = useState<RepartidorData>({
    codigo: sesion?.codigo ?? "R0001",
    nombre: (sesion?.nombre?.split(" ")[0] || "Piero"),
    apellidos: (sesion?.nombre?.split(" ").slice(1).join(" ") || "Rodrigo"),
    correo: `${(sesion?.codigo || "r0001").toLowerCase()}@ulexpress.pe`,
    password: "********",
  });

  useEffect(() => {
    try {
      const a = localStorage.getItem(KEY_STATE);
      if (a !== null) setActivo(a === "1");
      const d = localStorage.getItem(KEY_DATA);
      if (d) setData(JSON.parse(d));
    } catch {
      /* noop */
    }
  }, []);

  const toggleActivo = () => {
    setActivo((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(KEY_STATE, next ? "1" : "0");
      } catch {}
      return next;
    });
  };

  const saveData = (next: RepartidorData) => {
    setData(next);
    try {
      localStorage.setItem(KEY_DATA, JSON.stringify(next));
    } catch {}
  };

  return { activo, toggleActivo, data, saveData };
}
