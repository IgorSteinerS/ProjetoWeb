import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PacienteContext } from '../contexts/PacienteContext';
import '../Styles/container.css';
import '../Styles/form.css';

function AddPaciente() {
  const [paciente, setPaciente] = useState({
    nome: '',
    data: '',
    sexo: '',
    cpf: '',
    endereco: '',
    telefone: '',
  });

  const { adicionarPaciente } = useContext(PacienteContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPaciente({ ...paciente, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarPaciente(paciente);
    navigate('/');  // Redireciona para a página inicial
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="item">
          <label htmlFor="nome">Nome:</label>
          <input
            placeholder="Nome Sobrenome"
            type="text"
            name="nome"
            value={paciente.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="item">
          <label htmlFor="data">Data de Nascimento</label>
          <input
            type="date"
            name="data"
            value={paciente.data}
            onChange={handleChange}
            required
          />
        </div>

        <div className="item">
          <label htmlFor="sexo">Sexo:</label>
          <input
            type="text"
            name="sexo"
            value={paciente.sexo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="item">
          <label htmlFor="cpf">CPF:</label>
          <input
            placeholder="000.000.000-00"
            type="text"
            name="cpf"
            value={paciente.cpf}
            onChange={handleChange}
            required
          />
        </div>

        <div className="item">
          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            name="endereco"
            value={paciente.endereco}
            onChange={handleChange}
            required
          />
        </div>

        <div className="item">
          <label htmlFor="telefone">Telefone:</label>
          <input
            placeholder="(00) 00000-0000"
            type="text"
            name="telefone"
            value={paciente.telefone}
            onChange={handleChange}
            required
          />
        </div>

        <button className="add" type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default AddPaciente;
