import { createBrowserRouter } from "react-router-dom";
import ProtectedLayout from "./ProtectedLayout";
import Login from "../pages/auth/Login";
import Home from "../pages/home/Home";
import TiendasList from "../pages/tiendas/TiendasList";
import TiendaDetalle from "../pages/tiendas/TiendaDetalle";
import Carrito from "../pages/carrito/Carrito";
import Confirmacion from "../pages/checkout/Confirmacion";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "tiendas", element: <TiendasList /> },
      { path: "tiendas/:id", element: <TiendaDetalle /> },
      { path: "carrito", element: <Carrito /> },
      { path: "checkout", element: <Confirmacion /> },
    ],
  },
]);
