import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App'
import Home from './routes/Home'
import ListaPacientes from './routes/ListaPacientes'
import AddPaciente from './routes/AddPaciente'
import Prontuario from './routes/Prontuario';


import { PacienteProvider } from './contexts/PacienteContext'

const router = createBrowserRouter([

  {
    path: "/",
    element: <App />,
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
        path: '/prontuario/:id', 
        element: <Prontuario />,
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PacienteProvider>
      <RouterProvider router={router}/>
    </PacienteProvider>
  </StrictMode>,
)
