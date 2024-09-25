import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PacienteContext } from '../contexts/PacienteContext';
import '../Styles/container.css';

function Home() {
  const { pacientes } = useContext(PacienteContext);

  return (
    <div>
      <h2>Lista de Pacientes</h2>
      <Link to="/addpaciente">Adicionar Paciente</Link>
      <div className="pacientes-container">
        {pacientes.map((paciente) => (
          <div key={paciente.id} className="paciente-item">
            <Link to={`/paciente/${paciente.id}`}>
              {paciente.nome}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
