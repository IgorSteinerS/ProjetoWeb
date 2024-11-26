import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { PacienteContext } from "../contexts/PacienteContext";

function Prontuario() {
  const { id } = useParams();
  const { pacientes, deletarDocumento } = useContext(PacienteContext);

  const paciente = pacientes.find((p) => p.id === parseInt(id));

  if (!paciente) {
    return <div>Prontuário não encontrado.</div>;
  }

  const documentos = paciente.documentos || [];

  const handleDeleteDocumento = (documentoId) => {
    if (window.confirm("Tem certeza que deseja excluir este documento?")) {
      deletarDocumento(id, documentoId);
    }
  };

  return (
    <div>
      <h2>Prontuário do Paciente: {paciente.nome}</h2>

      <ul className="document-list">
        {documentos.length > 0 ? (
          documentos.map((doc, index) => (
            <li key={index} className="document-item">
              <p>
                <strong>Nome:</strong> {doc.nome}
              </p>
              <p>
                <strong>Data de Criação:</strong> {doc.dataCriacao}
              </p>
              <a href={doc.caminhoArquivo} target="_blank" rel="noreferrer">
                Ver Documento
              </a>

              <div className="document-actions">
                <Link to={`/editdocumento/${id}/${doc.id}`}>
                  <button>Editar</button>
                </Link>
                <button onClick={() => handleDeleteDocumento(doc.id)}>
                  Excluir
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>Nenhum documento adicionado ainda.</p>
        )}
      </ul>

      <div className="add-document-button-container">
        <Link to={`/adddocumento/${id}`} className="add-document-button">
          Adicionar Documento
        </Link>
      </div>
    </div>
  );
}

export default Prontuario;
