import { useState, FormEvent, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

type RepartidorData = {
  codigo: string;
  nombre: string;
  apellidos: string;
  correo: string;
  password: string;
};

// Datos en duro (mismo mock que Perfil)
const MOCK: RepartidorData = {
  codigo: "R0001",
  nombre: "Piero",
  apellidos: "Rodrigo",
  correo: "r0001@ulexpress.pe",
  password: "********",
};

export default function PerfilEditar() {
  const nav = useNavigate();
  const [form, setForm] = useState<RepartidorData>(MOCK);
  const [show, setShow] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Sin persistencia: solo navega de vuelta
    nav("/repartidor/perfil");
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Editar perfil</h1>
        <Link
          to="/repartidor/perfil"
          className="px-3 py-2 rounded bg-white/10 hover:bg-white/15 border border-white/10"
        >
          Volver
        </Link>
      </div>

      <form
        onSubmit={onSubmit}
        className="grid md:grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/10"
      >
        <Field label="Código">
          <input
            className="w-full bg-black/30 rounded px-3 py-2"
            value={form.codigo}
            onChange={(e) => setForm({ ...form, codigo: e.target.value })}
          />
        </Field>

        <Field label="Correo">
          <input
            className="w-full bg-black/30 rounded px-3 py-2"
            type="email"
            value={form.correo}
            onChange={(e) => setForm({ ...form, correo: e.target.value })}
          />
        </Field>

        <Field label="Nombre">
          <input
            className="w-full bg-black/30 rounded px-3 py-2"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
        </Field>

        <Field label="Apellidos">
          <input
            className="w-full bg-black/30 rounded px-3 py-2"
            value={form.apellidos}
            onChange={(e) => setForm({ ...form, apellidos: e.target.value })}
          />
        </Field>

        <Field label="Contraseña" full>
          <div className="flex gap-2">
            <input
              className="w-full bg-black/30 rounded px-3 py-2"
              type={show ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="px-3 rounded bg-white/10 border border-white/10"
            >
              {show ? "Ocultar" : "Ver"}
            </button>
          </div>
        </Field>

        <div className="md:col-span-2 flex justify-end">
          <button className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 font-semibold">
            Guardar cambios
          </button>
        </div>
      </form>
    </section>
  );
}

function Field({
  label,
  children,
  full = false,
}: {
  label: string;
  children: ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`flex flex-col gap-1 ${full ? "md:col-span-2" : ""}`}>
      <span className="text-xs opacity-60">{label}</span>
      {children}
    </label>
  );
}
