import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PacienteContext } from '../contexts/PacienteContext';
import { Link } from 'react-router-dom';

function ListaPacientes() {
  const { id } = useParams();
  const { pacientes } = useContext(PacienteContext);

  const paciente = pacientes.find(p => p.id === parseInt(id));

  if (!paciente) {
    return <div>Paciente não encontrado.</div>;
  }

  return (
    <div>
      <h2>Detalhes do Paciente</h2>
      <p><strong>Nome:</strong> {paciente.nome}</p>
      <p><strong>Data de Nascimento:</strong> {paciente.aniversario}</p>
      <p><strong>CPF:</strong> {paciente.cpf}</p>
      <p><strong>Celular:</strong> {paciente.celular}</p>
      <p><strong>Data da 1ª Consulta:</strong> {paciente.inicio}</p>

      <Link to={`/prontuario/${paciente.id}`}>
        Ver Prontuário
      </Link>
    </div>
  );
}

export default ListaPacientes;
