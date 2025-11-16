import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth.store";

type AlumnoData = {
  codigo: string;
  nombre: string;
  correo: string;
};

const KEY = "alumno_datos";

export default function PerfilAlumnoEditar() {
  const { sesion } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<AlumnoData>({
    codigo: sesion?.codigo || "",
    nombre: sesion?.nombre || "",
    correo: "",
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(KEY, JSON.stringify(form));
    } catch {}
    navigate("/alumno/perfil");
  };

  return (
    <section className="space-y-4 max-w-xl">
      <header>
        <h1 className="text-2xl font-bold">Editar perfil</h1>
        <p className="text-sm text-gray-300">
          Actualiza tus datos de estudiante.
        </p>
      </header>

      <form onSubmit={onSubmit} className="space-y-3">
        <label className="flex flex-col gap-1 text-sm">
          <span className="opacity-70">Código</span>
          <input
            value={form.codigo}
            onChange={(e) => setForm({ ...form, codigo: e.target.value })}
            className="bg-white/10 border border-white/10 rounded px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="opacity-70">Nombre</span>
          <input
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="bg-white/10 border border-white/10 rounded px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="opacity-70">Correo</span>
          <input
            type="email"
            value={form.correo}
            onChange={(e) => setForm({ ...form, correo: e.target.value })}
            className="bg-white/10 border border-white/10 rounded px-3 py-2"
            placeholder="tucorreo@ulima.edu.pe"
          />
        </label>

        <button
          type="submit"
          className="mt-2 px-4 py-2 rounded bg-orange-500 hover:bg-orange-600 text-white text-sm"
        >
          Guardar cambios
        </button>
      </form>
    </section>
  );
}
