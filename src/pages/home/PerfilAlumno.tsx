// src/pages/home/PerfilAlumno.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth.store";

type AlumnoData = {
  codigo: string;
  nombre: string;
  correo: string;
};

const KEY = "alumno_datos";

function loadAlumnoData(
  fallbackCodigo?: string,
  fallbackNombre?: string
): AlumnoData {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      return JSON.parse(raw) as AlumnoData;
    }
  } catch {}
  return {
    codigo: fallbackCodigo || "",
    nombre: fallbackNombre || "",
    correo: "",
  };
}

export default function PerfilAlumno() {
  const { sesion } = useAuth();
  const [data, setData] = useState<AlumnoData>(() =>
    loadAlumnoData(sesion?.codigo, sesion?.nombre)
  );

  useEffect(() => {
    setData(loadAlumnoData(sesion?.codigo, sesion?.nombre));
  }, [sesion?.codigo, sesion?.nombre]);

  return (
    <section className="space-y-4 max-w-xl">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mi perfil</h1>
          <p className="text-sm text-gray-300">Datos básicos del estudiante.</p>
        </div>

        <Link
          to="/alumno/perfil/editar"
          className="text-xs px-3 py-1 rounded bg-white/10 hover:bg-white/20 border border-white/10"
        >
          Editar
        </Link>
      </header>

      <div className="bg-white/5 rounded-lg p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="opacity-70">Código</span>
          <span className="font-mono">{data.codigo || sesion?.codigo}</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-70">Nombre</span>
          <span>{data.nombre || sesion?.nombre}</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-70">Correo</span>
          <span>{data.correo || "no registrado"}</span>
        </div>
      </div>
    </section>
  );
}
