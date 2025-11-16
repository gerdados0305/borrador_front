// src/app/ProtectedLayout.tsx
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../store/auth.store";
import AlumnoLayout from "./layouts/AlumnoLayout";
import RepartidorLayout from "./layouts/RepartidorLayout";
import TiendaAppLayout from "./layouts/TiendaAppLayout";

export default function ProtectedLayout() {
  const { sesion, bootstrapped } = useAuth();

  if (!bootstrapped) return null;
  if (!sesion) return <Navigate to="/login" replace />;

  const content = <Outlet />;

  switch (sesion.rol) {
    case "repartidor":
      return <RepartidorLayout>{content}</RepartidorLayout>;
    case "tienda":
      return <TiendaAppLayout>{content}</TiendaAppLayout>;
    // alumno y cualquier otro rol caen aquí
    default:
      return <AlumnoLayout>{content}</AlumnoLayout>;
  }
}
