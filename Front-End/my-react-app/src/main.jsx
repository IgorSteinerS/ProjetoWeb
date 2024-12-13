import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./routes/Home";
import ListaPacientes from "./routes/ListaPacientes";
import AddPaciente from "./routes/AddPaciente";
import Prontuario from "./routes/Prontuario";
import EditarPaciente from "./routes/EditarPaciente";
import AddDocumento from "./routes/AddDocumento";
import EditarDocumento from "./routes/EditarDocumento";

import Signup from "./routes/Signup";
import Login from "./routes/Login";
import PrivateRoute from "./components/PrivateRoute";

import { PacienteProvider } from "./contexts/PacienteContext";

const router = createBrowserRouter([
  // Rotas Públicas
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  // Rotas Protegidas
  {
    path: "/",
    element: (
      <PacienteProvider>
        <PrivateRoute>
          <App />
        </PrivateRoute>
      </PacienteProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/paciente/:id",
        element: <ListaPacientes />,
      },
      {
        path: "/addpaciente",
        element: <AddPaciente />,
      },
      {
        path: "/prontuario/:id",
        element: <Prontuario />,
      },
      {
        path: "/editar-paciente/:id",
        element: <EditarPaciente />,
      },
      {
        path: "/adddocumento/:id",
        element: <AddDocumento />,
      },
      {
        path: "/editdocumento/:id/:index",
        element: <EditarDocumento />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);