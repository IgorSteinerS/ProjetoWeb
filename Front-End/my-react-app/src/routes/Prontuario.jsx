import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PacienteContext } from '../contexts/PacienteContext';

function Prontuario() {
  const { id } = useParams();
  const { pacientes } = useContext(PacienteContext);

  const paciente = pacientes.find(p => p.id === parseInt(id));

  if (!paciente) {
    return <div>Prontuário não encontrado.</div>;
  }

  return (
    <div>
      <h2>Prontuário do Paciente: {paciente.nome}</h2>
      <p>Informações do prontuário vão aqui...</p>
      {/* mais detalhes do prontuário */}
    </div>
  );
}

export default Prontuario;
