import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PacienteContext } from '../contexts/PacienteContext';

function AddDocumento() {
  const { id } = useParams(); 
  const { adicionarDocumento } = useContext(PacienteContext);
  const [nome, setNome] = useState('');
  const [arquivo, setArquivo] = useState(null);
  const [dataCriacao, setDataCriacao] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setArquivo(e.target.files[0]); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !arquivo || !dataCriacao) {
      alert('Preencha todos os campos!');
      return;
    }

    
    const novoDocumento = {
      nome,
      arquivo: URL.createObjectURL(arquivo), 
      dataCriacao,
    };

    adicionarDocumento(id, novoDocumento); 

    navigate(`/prontuario/${id}`);
  };

  return (
    <div className="container">
      <h2>Adicionar Documento ao Paciente {id}</h2>
      <form onSubmit={handleSubmit}>
        <div className="item">
          <label htmlFor="nome">Nome do Documento:</label>
          <input
            type="text"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="item">
          <label htmlFor="arquivo">Arquivo:</label>
          <input type="file" name="arquivo" onChange={handleFileChange} required />
        </div>

        <div className="item">
          <label htmlFor="dataCriacao">Data de Criação:</label>
          <input
            type="date"
            name="dataCriacao"
            value={dataCriacao}
            onChange={(e) => setDataCriacao(e.target.value)}
            required
          />
        </div>

        <button type="submit">Adicionar Documento</button>
      </form>
    </div>
  );
}

export default AddDocumento;
