// src/pages/auth/Login.tsx
import { useAuth } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../services/AuthService";

type RolRegistro = "alumno" | "repartidor" | "tienda";

export default function Login() {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // estado para registro
  const [showRegister, setShowRegister] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);
  const [regData, setRegData] = useState({
    codigo: "",
    nombre: "",
    password: "",
    confirm: "",
    rol: "alumno" as RolRegistro,
    email: "",
  });

  // ========= LOGIN =========
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const f = e.target as HTMLFormElement;
    const codigo = (f.elements.namedItem("codigo") as HTMLInputElement).value;
    const pass = (f.elements.namedItem("pass") as HTMLInputElement).value;

    try {
      await login(codigo, pass);

      // Cargar sesión recién creada desde localStorage
      let sesion: any = undefined;
      try {
        sesion = JSON.parse(localStorage.getItem("sesion") || "null");
      } catch {}

      // SOLO alumno ve popup del carrito
      if (sesion?.rol === "alumno") {
        let items: unknown = [];
        try {
          items = JSON.parse(localStorage.getItem("carrito") || "[]");
        } catch {}

        if (Array.isArray(items) && items.length > 0) {
          const ir = window.confirm(
            `Tienes ${items.length} productos en tu carrito de la sesión anterior. ¿Quieres revisarlos ahora?`
          );
          navigate(ir ? "/carrito" : "/");
        } else {
          navigate("/");
        }
      } else {
        // tienda / repartidor / otros → RoleIndex se encarga
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  // ========= REGISTRO =========
  const onRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegLoading(true);
    setRegError(null);

    // validar confirmación de contraseña
    if (regData.password !== regData.confirm) {
      setRegError("Las contraseñas no coinciden");
      setRegLoading(false);
      return;
    }

    try {
      await registerUser({
        codigo: regData.codigo.trim(),
        nombre: regData.nombre.trim(),
        password: regData.password,
        rol: regData.rol,
        // solo tienda guarda email, para alumno/repartidor queda undefined
        email:
          regData.rol === "tienda" && regData.email.trim()
            ? regData.email.trim()
            : undefined,
      });

      alert("Cuenta creada correctamente. Ahora puedes iniciar sesión.");
      // limpiar y cerrar registro
      setRegData({
        codigo: "",
        nombre: "",
        password: "",
        confirm: "",
        rol: "alumno",
        email: "",
      });
      setShowRegister(false);
    } catch (err: any) {
      setRegError(err?.message ?? "Error al registrar usuario");
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 place-items-center bg-zinc-900 text-white">
      <div className="w-full h-full hidden md:block">
        <img
          src="/img/brand/banner.jpg"
          className="w-full h-full object-cover"
          alt="Campus ULima"
        />
      </div>

      <div className="w-full max-w-2xl p-8">
        {/* ===== LOGIN ===== */}
        <form onSubmit={onSubmit} className="w-full mb-8">
          <div className="flex items-center gap-3 mb-4">
            <img src="/img/brand/logo.png" alt="ULExpress" className="h-8" />
            <h1 className="text-2xl font-bold">Iniciar sesión</h1>
          </div>

          <input
            name="codigo"
            placeholder="Código / usuario"
            className="w-full bg-zinc-800 rounded px-3 py-2 mb-3"
          />
          <input
            name="pass"
            type="password"
            placeholder="Contraseña"
            className="w-full bg-zinc-800 rounded px-3 py-2 mb-4"
          />
          {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 rounded px-4 py-2 font-semibold"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

          <p className="text-xs opacity-70 mt-3">
            Alumno: <b>20194613</b> / <b>1234</b> · Tienda: <b>TDUNKIN</b> /{" "}
            <b>dunkin</b>
          </p>
        </form>

        {/* ===== LINK PARA REGISTRO ===== */}
        <div className="mb-3 text-sm">
          <span className="opacity-80">¿No tienes cuenta? </span>
          <button
            type="button"
            onClick={() => setShowRegister((v) => !v)}
            className="text-orange-400 hover:underline"
          >
            {showRegister ? "Ocultar registro" : "Regístrate aquí"}
          </button>
        </div>

        {/* ===== FORMULARIO DE REGISTRO ===== */}
        {showRegister && (
          <form
            onSubmit={onRegisterSubmit}
            className="w-full border border-white/10 rounded-lg p-4 space-y-3 bg-white/5"
          >
            <h2 className="text-lg font-semibold mb-1">Crear nueva cuenta</h2>

            <div className="grid md:grid-cols-2 gap-3">
              {/* Código / usuario */}
              <label className="flex flex-col gap-1 text-sm">
                <span className="opacity-70">
                  {regData.rol === "tienda"
                    ? "Usuario de tienda"
                    : "Código universitario"}
                </span>
                <input
                  value={regData.codigo}
                  onChange={(e) =>
                    setRegData({ ...regData, codigo: e.target.value })
                  }
                  className="bg-zinc-800 rounded px-3 py-2"
                  required
                />
              </label>

              {/* Nombre */}
              <label className="flex flex-col gap-1 text-sm">
                <span className="opacity-70">
                  {regData.rol === "tienda" ? "Nombre de la tienda" : "Nombre"}
                </span>
                <input
                  value={regData.nombre}
                  onChange={(e) =>
                    setRegData({ ...regData, nombre: e.target.value })
                  }
                  className="bg-zinc-800 rounded px-3 py-2"
                  required
                />
              </label>
            </div>

            {/* Solo para TIENDA: correo */}
            {regData.rol === "tienda" && (
              <label className="flex flex-col gap-1 text-sm">
                <span className="opacity-70">Correo de la tienda</span>
                <input
                  type="email"
                  value={regData.email}
                  onChange={(e) =>
                    setRegData({ ...regData, email: e.target.value })
                  }
                  className="bg-zinc-800 rounded px-3 py-2"
                  placeholder="tienda@correo.com"
                />
              </label>
            )}

            {/* Contraseña */}
            <label className="flex flex-col gap-1 text-sm">
              <span className="opacity-70">Contraseña</span>
              <input
                type="password"
                value={regData.password}
                onChange={(e) =>
                  setRegData({ ...regData, password: e.target.value })
                }
                className="bg-zinc-800 rounded px-3 py-2"
                required
              />
            </label>

            {/* Confirmar contraseña */}
            <label className="flex flex-col gap-1 text-sm">
              <span className="opacity-70">Confirmar contraseña</span>
              <input
                type="password"
                value={regData.confirm}
                onChange={(e) =>
                  setRegData({ ...regData, confirm: e.target.value })
                }
                className="bg-zinc-800 rounded px-3 py-2"
                required
              />
            </label>

            {/* Tipo de usuario */}
            <label className="flex flex-col gap-1 text-sm">
              <span className="opacity-70">Tipo de usuario</span>
              <select
                value={regData.rol}
                onChange={(e) =>
                  setRegData({
                    ...regData,
                    rol: e.target.value as RolRegistro,
                    // si cambia a otro rol, limpiamos email para evitar ruido
                    email: e.target.value === "tienda" ? regData.email : "",
                  })
                }
                className="bg-zinc-800 rounded px-3 py-2"
              >
                <option value="alumno">Estudiante</option>
                <option value="repartidor">Repartidor</option>
                <option value="tienda">Tienda</option>
              </select>
            </label>

            {regError && (
              <p className="text-red-400 text-xs">{regError}</p>
            )}

            <button
              type="submit"
              disabled={regLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 rounded px-4 py-2 text-sm font-semibold mt-1"
            >
              {regLoading ? "Registrando..." : "Crear cuenta"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
