import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PacienteContext } from '../contexts/PacienteContext';
import '../Styles/container.css';
import '../Styles/form.css';

function AddPaciente() {
  const [paciente, setPaciente] = useState({
    nome: '',
    aniversario: '',
    cpf: '',
    celular: '',
    inicio: '',
  });

  const [isValidCpf, setIsValidCpf] = useState(true); // Estado para controlar se o CPF é válido
  const { adicionarPaciente } = useContext(PacienteContext);
  const navigate = useNavigate();

  // Função de validação do CPF
  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres que não são números

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false;
    }

    return true;
  };

  // Função para formatar o CPF com pontos e traço
  const formatarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpf;
  };

  // Função para formatar o celular no formato (00) 00000-0000
  const formatarCelular = (celular) => {
    celular = celular.replace(/\D/g, ""); // Remove caracteres não numéricos
    celular = celular.replace(/(\d{2})(\d)/, "($1) $2"); // Formata o DDD
    celular = celular.replace(/(\d{5})(\d{1,4})$/, "$1-$2"); // Formata o número
    return celular;
  };

  // Manipulador para atualização de estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Aplica formatação e validação no campo CPF
    if (name === "cpf") {
      newValue = formatarCPF(value);
      setIsValidCpf(validarCPF(newValue));
    }

    // Aplica formatação no campo Celular
    if (name === "celular") {
      newValue = formatarCelular(value);
    }

    setPaciente({ ...paciente, [name]: newValue });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidCpf) {
      adicionarPaciente(paciente);
      navigate('/'); 
    } else {
      alert('CPF inválido! Verifique os dados.');
    }
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
            placeholder="000.000.000-00"
            type="text"
            name="cpf"
            value={paciente.cpf}
            onChange={handleChange}
            required
            className={!isValidCpf ? 'invalid' : ''}
          />
          {!isValidCpf && <p className="error">CPF inválido!</p>}
        </div>

        <div className="item">
          <label htmlFor="celular">Celular:</label>
          <input
            placeholder="(00) 00000-0000"
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

        <button className="add" type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default AddPaciente;
