import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PacienteContext } from '../contexts/PacienteContext';

function EditarPaciente() {
  const { id } = useParams();
  const { pacientes, editarPaciente } = useContext(PacienteContext);
  const navigate = useNavigate();

  const pacienteAtual = pacientes.find(p => p.id === parseInt(id));

  const [paciente, setPaciente] = useState({
    nome: '',
    aniversario: '',
    cpf: '',
    celular: '',
    inicio: '',
  });

  useEffect(() => {
    if (pacienteAtual) {
      setPaciente(pacienteAtual);
    }
  }, [pacienteAtual]);

  const handleChange = (e) => {
    setPaciente({ ...paciente, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editarPaciente(parseInt(id), paciente);
    navigate('/');
  };

  return (
    <div className="container">
      <h2>Editar Paciente</h2>
      <form onSubmit={handleSubmit}>
        <div className="item">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            name="nome"
            value={paciente.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="item">
          <label htmlFor="aniversario">Data de Nascimento:</label>
          <input
            type="date"
            name="aniversario"
            value={paciente.aniversario}
            onChange={handleChange}
            required
          />
        </div>

        <div className="item">
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            name="cpf"
            value={paciente.cpf}
            onChange={handleChange}
            required
          />
        </div>

        <div className="item">
          <label htmlFor="celular">Celular:</label>
          <input
            type="text"
            name="celular"
            value={paciente.celular}
            onChange={handleChange}
            required
          />
        </div>

        <div className="item">
          <label htmlFor="inicio">Data de início:</label>
          <input
            type="date"
            name="inicio"
            value={paciente.inicio}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditarPaciente;
