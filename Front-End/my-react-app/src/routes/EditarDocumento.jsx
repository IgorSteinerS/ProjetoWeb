import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PacienteContext } from "../contexts/PacienteContext";

function EditDocumento() {
  const { id, index } = useParams();
  const { pacientes, editarDocumento } = useContext(PacienteContext);
  const navigate = useNavigate();

  const paciente = pacientes.find((p) => p.id === parseInt(id));
  const documento = paciente?.documentos.find((doc) => doc.id === parseInt(index));

  const [nome, setNome] = useState(documento?.nome || "");
  const [dataCriacao, setDataCriacao] = useState(documento?.dataCriacao || "");
  const [resumo, setResumo] = useState(documento?.resumo || "");
  const [arquivo, setArquivo] = useState(null);

  const handleFileChange = (e) => {
    setArquivo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!documento) {
      console.error("Documento não encontrado!");
      return;
    }

    const documentoAtualizado = {
      nome,
      dataCriacao,
      resumo,
    };

    editarDocumento(documento.id, documentoAtualizado, arquivo)
      .then(() => {
        navigate(`/prontuario/${id}`);
      })
      .catch((error) => {
        console.error("Erro ao editar documento:", error);
      });
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
          <label htmlFor="arquivo">Selecione um arquivo (opcional):</label>
          <input
            type="file"
            name="arquivo"
            onChange={handleFileChange}
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

        <div className="item">
          <label htmlFor="resumo">Resumo:</label>
          <textarea
            name="resumo"
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}
            required
          />
        </div>

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditDocumento;