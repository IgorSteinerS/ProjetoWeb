import React, { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PacienteContext } from "../contexts/PacienteContext";
import "../Styles/button.css";

function ListaPacientes() {
  const { id } = useParams();
  const { pacientes, deletarPaciente } = useContext(PacienteContext);
  const navigate = useNavigate();

  const paciente = pacientes.find((p) => p.id === parseInt(id));

  if (!paciente) {
    return <div>Paciente não encontrado.</div>;
  }

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir este paciente?")) {
      deletarPaciente(paciente.id);
    navigate("/"); 
    }
  };

  return (
    <div>
      <h2>Detalhes do Paciente</h2>
      <p>
        <strong>Nome:</strong> {paciente.nome}
      </p>
      <p>
        <strong>Data de Nascimento:</strong> {paciente.aniversario}
      </p>
      <p>
        <strong>CPF:</strong> {paciente.cpf}
      </p>
      <p>
        <strong>Celular:</strong> {paciente.celular}
      </p>
      <p>
        <strong>Data da 1ª Consulta:</strong> {paciente.inicio}
      </p>
      <div className="buttonArea">
        <Link className="verProntuario" to={`/prontuario/${paciente.id}`}>Ver Prontuário</Link>
        
        <Link className="edit" to={`/editar-paciente/${paciente.id}`}>Editar Paciente</Link>

        <button onClick={handleDelete}>Deletar Paciente</button>
      </div>
    </div>
  );
}

export default ListaPacientes;
