import { Outlet, Navigate, Link } from "react-router-dom";
import { useAuth } from "../store/auth.store";

export default function ProtectedLayout() {
  const { sesion, bootstrapped, logout } = useAuth();
  if (!bootstrapped) return null;
  if (!sesion) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <header className="w-full bg-orange-500 text-white">
        <div className="w-full px-6 flex items-center justify-between py-3">
          <Link to="/" className="font-bold flex items-center gap-2">
            <img src="/img/brand/logo.png" className="h-6" alt="ULExpress" />
            <span>ULEXPRESS Delivery</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link to="/tiendas" className="hover:underline">Tiendas</Link>
            <Link to="/carrito" className="hover:underline">Mi carrito</Link>

            {/* 👇 Nombre del usuario logueado */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-black/20 grid place-items-center font-semibold">
                {sesion.nombre.split(" ").map(p => p[0]).join("").slice(0,2).toUpperCase()}
              </div>
              <span className="hidden sm:block">Hola, <b>{sesion.nombre}</b></span>
            </div>

            <button onClick={logout} className="bg-black/20 px-3 py-1 rounded">Salir</button>
          </nav>
        </div>
      </header>

      <main className="w-full px-6 py-4">
        <Outlet />
      </main>
    </div>
  );
}
