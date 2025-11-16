import { useState } from "react";
import { Link } from "react-router-dom";

type RepartidorData = {
  codigo: string;
  nombre: string;
  apellidos: string;
  correo: string;
  password: string;
};

// Datos en duro (mock)
const MOCK: RepartidorData = {
  codigo: "R0001",
  nombre: "Piero",
  apellidos: "Rodrigo",
  correo: "r0001@ulexpress.pe",
  password: "********",
};

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-black/20 p-3 border border-white/10">
      <div className="text-xs opacity-60">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

export default function Perfil() {
  // Estado visual solo en memoria (no persiste)
  const [activo, setActivo] = useState<boolean>(true);
  const data = MOCK;

  return (
    <section className="grid md:grid-cols-[1fr_auto] gap-4">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Mi perfil</h1>

        <div className="rounded-xl border border-white/10 p-4 bg-white/5">
          <div className="flex items-center gap-4">
            <img src="/img/brand/logo.png" className="h-12 w-12 rounded bg-white p-1" />
            <div>
              <div className="text-lg font-semibold">
                {data.nombre} {data.apellidos}
              </div>
              <div className="text-sm opacity-80">Código: {data.codigo}</div>
            </div>
          </div>

          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <Info label="Correo" value={data.correo} />
            <Info label="Contraseña" value={data.password} />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="text-sm opacity-80">Estado</div>
              <div className={`font-semibold ${activo ? "text-green-400" : "text-red-400"}`}>
                {activo ? "Activo para repartos" : "Inactivo (no recibe pedidos)"}
              </div>
            </div>

            <button
              onClick={() => setActivo(v => !v)}
              className={`px-4 py-2 rounded font-semibold ${
                activo ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {activo ? "Marcar Inactivo" : "Marcar Activo"}
            </button>
          </div>
        </div>
      </div>

      <div className="h-fit sticky top-6">
        <Link
          to="/repartidor/perfil/editar"
          title="Configurar datos"
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white/10 hover:bg-white/15 border border-white/10"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M19.14,12.94a7.07,7.07,0,0,0,.05-.94,7.07,7.07,0,0,0-.05-.94l2-1.55a.5.5,0,0,0,.12-.64l-1.9-3.29a.5.5,0,0,0-.6-.22l-2.35,1a7.17,7.17,0,0,0-1.63-.94l-.36-2.49A.5.5,0,0,0,12.93,2H11.07a.5.5,0,0,0-.49.41L10.22,4.9a7.17,7.17,0,0,0-1.63.94l-2.35-1a.5.5,0,0,0-.6.22L3.74,8.35a.5.5,0,0,0,.12.64l2,1.55a7.07,7.07,0,0,0-.05.94,7.07,7.07,0,0,0,.05.94l-2,1.55a.5.5,0,0,0-.12.64l1.9,3.29a.5.5,0,0,0,.6.22l2.35-1a7.17,7.17,0,0,0,1.63.94l.36,2.49a.5.5,0,0,0,.49.41h1.86a.5.5,0,0,0,.49-.41l.36-2.49a7.17,7.17,0,0,0,1.63-.94l2.35,1a.5.5,0,0,0,.6-.22l1.9-3.29a.5.5,0,0,0-.12-.64Zm-7.14,2.06A3,3,0,1,1,15,12,3,3,0,0,1,12,15Z"/>
          </svg>
          Configurar
        </Link>
      </div>
    </section>
  );
}
