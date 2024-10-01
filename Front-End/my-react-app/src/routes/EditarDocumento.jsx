import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PacienteContext } from '../contexts/PacienteContext';

function EditDocumento() {
  const { id, index } = useParams(); 
  const { pacientes, editarDocumento } = useContext(PacienteContext);
  const navigate = useNavigate();

  const paciente = pacientes.find(p => p.id === parseInt(id));
  const documento = paciente?.documentos[index];

  const [nome, setNome] = useState(documento?.nome || '');
  const [dataCriacao, setDataCriacao] = useState(documento?.dataCriacao || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    const documentoAtualizado = {
      ...documento,
      nome,
      dataCriacao,
    };

    editarDocumento(id, index, documentoAtualizado);
    navigate(`/prontuario/${id}`); 
  };

  return (
    <div className="container">
      <h2>Editar Documento do Paciente {paciente?.nome}</h2>
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
          <label htmlFor="dataCriacao">Data de Criação:</label>
          <input
            type="date"
            name="dataCriacao"
            value={dataCriacao}
            onChange={(e) => setDataCriacao(e.target.value)}
            required
          />
        </div>

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditDocumento;
