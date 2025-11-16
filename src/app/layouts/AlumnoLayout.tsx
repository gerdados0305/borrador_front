// src/app/layouts/AlumnoLayout.tsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../store/auth.store";

export default function AlumnoLayout({ children }: { children: React.ReactNode }) {
  const { sesion, logout } = useAuth();
  const { pathname } = useLocation();
  const isActive = (to: string) =>
    pathname === to || pathname.startsWith(to + "/")
      ? "underline underline-offset-4"
      : "hover:underline";

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <header className="w-full bg-orange-500 text-white">
        <div className="w-full px-6 flex items-center justify-between py-3">
          <Link to="/alumno" className="font-bold flex items-center gap-2">
            <img src="/img/brand/logo.png" className="h-6" alt="ULExpress" />
            <span>ULEXPRESS Delivery</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/tiendas" className={isActive("/tiendas")}>
              Tiendas
            </Link>
            <Link to="/carrito" className={isActive("/carrito")}>
              Mi carrito
            </Link>
            <Link to="/historial" className={isActive("/historial")}>
              Historial
            </Link>
            <Link
              to="/alumno/perfil"
              className="text-sm opacity-90 hidden sm:inline hover:underline"
            >
              {sesion?.nombre}
            </Link>
            <button
              onClick={logout}
              className="bg-black/20 px-3 py-1 rounded"
            >
              Salir
            </button>
          </nav>
        </div>
      </header>
      <main className="w-full px-6 py-4">{children}</main>
    </div>
  );
}
