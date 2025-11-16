import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth.store";
import HomeAlumno from "../pages/home/HomeAlumno";

export default function RoleIndex() {
  const { sesion } = useAuth();

  // seguridad básica: si por algo no hay sesión, manda a login
  if (!sesion) return <Navigate to="/login" replace />;

  // dirige por rol
  if (sesion.rol === "repartidor") return <Navigate to="/repartidor" replace />;
  if (sesion.rol === "tienda") return <Navigate to="/tienda" replace />;

  // alumno (u otros): muestra el Home de alumno (buscador de tiendas)
  return <HomeAlumno />;
}
