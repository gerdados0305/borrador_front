// src/app/layouts/RepartidorLayout.tsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../store/auth.store";

export default function RepartidorLayout({ children }: { children: React.ReactNode }) {
  const { sesion, logout } = useAuth();
  const { pathname } = useLocation();
  const isActive = (to: string) =>
    pathname === to || pathname.startsWith(to + "/")
      ? "underline underline-offset-4"
      : "hover:underline";

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <header className="w-full text-white" style={{ backgroundColor: "#1d4ed8" /* azul-700 */ }}>
        <div className="w-full px-6 flex items-center justify-between py-3">
          <Link to="/repartidor" className="font-bold flex items-center gap-2">
            <img src="/img/brand/logo.png" className="h-6" alt="ULExpress" />
            <span>Repartidor</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/repartidor" className={isActive("/repartidor")}>Asignados</Link>

            {/* Nombre clickeable → perfil */}
            <Link to="/repartidor/perfil" className="bg-black/20 px-3 py-1 rounded hover:bg-black/30">
              {sesion?.nombre}
            </Link>

            <button onClick={logout} className="bg-black/20 px-3 py-1 rounded">Salir</button>
          </nav>
        </div>
      </header>
      <main className="w-full px-6 py-4">{children}</main>
    </div>
  );
}
