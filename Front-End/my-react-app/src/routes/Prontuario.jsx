import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { PacienteContext } from "../contexts/PacienteContext";
import "../Styles/prontuario.css"; // Importando o CSS atualizado

function Prontuario() {
  const { id } = useParams();
  const { pacientes, editarDocumento, deletarDocumento } = useContext(PacienteContext);

  const paciente = pacientes.find((p) => p.id === parseInt(id));

  if (!paciente) {
    return <div>Prontuário não encontrado.</div>;
  }

  const documentos = paciente.documentos || [];

  const handleDelete = (index) => {
    if (window.confirm("Tem certeza que deseja excluir este documento?")) {
      deletarDocumento(id, index);
    }
  };

  const handleEdit = (docId) => {
    const novoNome = prompt("Digite o novo nome do documento:");
    if (novoNome) {
      editarDocumento(paciente.id, docId, { nome: novoNome });
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
              <a href={doc.arquivo} target="_blank" rel="noreferrer">
                Ver Documento
              </a>

              <div className="document-actions">
                  <Link to={`/editdocumento/${id}/${index}`}>
                    <button>Editar</button>
                  </Link>
                  <button onClick={() => handleDelete(index)}>Excluir</button>
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
