// src/app/layouts/TiendaAppLayout.tsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../store/auth.store";

export default function TiendaAppLayout({ children }: { children: React.ReactNode }) {
  const { sesion, logout } = useAuth();
  const { pathname } = useLocation();
  const isActive = (to: string) =>
    pathname === to || pathname.startsWith(to + "/")
      ? "underline underline-offset-4"
      : "hover:underline";

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <header className="w-full text-white" style={{ backgroundColor: "#dc2626" /* rojo-600 */ }}>
        <div className="w-full px-6 flex items-center justify-between py-3">
          <Link to="/tienda" className="font-bold flex items-center gap-2">
            <img src="/img/brand/logo.png" className="h-6" alt="ULExpress" />
            <span>Panel de Tienda</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/tienda" className={isActive("/tienda")}>Stock</Link>
            <Link to="/tienda/precios" className={isActive("/tienda/precios")}>Precios</Link>
            <Link to="/tienda/nuevo" className={isActive("/tienda/nuevo")}>Nuevo</Link>
            <span className="text-sm opacity-90 hidden sm:inline">{sesion?.nombre}</span>
            <button onClick={logout} className="bg-black/20 px-3 py-1 rounded">Salir</button>
          </nav>
        </div>
      </header>
      <main className="w-full px-6 py-4">{children}</main>
    </div>
  );
}
