import { createBrowserRouter } from "react-router-dom";
import ProtectedLayout from "./ProtectedLayout";

// Auth
import Login from "../pages/auth/Login";

// Home por rol
import RoleIndex from "./RoleIndex";

// Alumno
import HomeAlumno from "../pages/home/HomeAlumno";
import TiendasList from "../pages/tiendas/TiendasList";
import TiendaDetalle from "../pages/tiendas/TiendaDetalle";
import Carrito from "../pages/carrito/Carrito";
import Confirmacion from "../pages/checkout/Confirmacion";
import Historial from "../pages/Historial/Historial";
import PerfilAlumno from "../pages/home/PerfilAlumno";
import PerfilAlumnoEditar from "../pages/home/PerfilAlumnoEditar";

// Repartidor
import RepartidorDashboard from "../pages/repartidor/Dashboard";
import RepartidorDisponibles from "../pages/repartidor/Disponibles";
import RepartidorHistorial from "../pages/repartidor/HistorialRepartidor";
import RepartidorPerfil from "../pages/repartidor/Perfil";
import RepartidorPerfilEditar from "../pages/repartidor/PerfilEditar";

// Panel Tienda
import TiendaLayout from "../pages/TiendaPanel/TiendaLayout";
import TiendaStock from "../pages/TiendaPanel/TiendaStock";
import TiendaPrecios from "../pages/TiendaPanel/TiendaPrecios";
import TiendaNuevo from "../pages/TiendaPanel/TiendaNuevo";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      // ===== INDEX POR ROL =====
      { index: true, element: <RoleIndex /> },

      // ===== Alumno =====
      { path: "alumno", element: <HomeAlumno /> },
      { path: "alumno/perfil", element: <PerfilAlumno /> },
      { path: "alumno/perfil/editar", element: <PerfilAlumnoEditar /> },
      { path: "tiendas", element: <TiendasList /> },
      { path: "tiendas/:id", element: <TiendaDetalle /> },
      { path: "carrito", element: <Carrito /> },
      { path: "checkout", element: <Confirmacion /> },
      { path: "historial", element: <Historial /> },

      // ===== Repartidor =====
      { path: "repartidor", element: <RepartidorDashboard /> },
      { path: "repartidor/disponibles", element: <RepartidorDisponibles /> },
      { path: "repartidor/historial", element: <RepartidorHistorial /> },
      { path: "repartidor/perfil", element: <RepartidorPerfil /> },
      { path: "repartidor/perfil/editar", element: <RepartidorPerfilEditar /> },

      // ===== Tienda =====
      {
        path: "tienda",
        element: <TiendaLayout />,
        children: [
          { index: true, element: <TiendaStock /> },
          { path: "stock", element: <TiendaStock /> },
          { path: "precios", element: <TiendaPrecios /> },
          { path: "nuevo", element: <TiendaNuevo /> },
        ],
      },
    ],
  },
]);
