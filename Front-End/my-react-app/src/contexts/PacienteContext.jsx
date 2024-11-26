import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PacienteContext = createContext();

export const PacienteProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);

  // Buscar os pacientes e documentos
  const fetchPacientes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/pacientes');
      console.log('Resposta da API:', response.data);

      const pacientesComDocumentos = await Promise.all(
        response.data.map(async (paciente) => {
          const docResponse = await axios.get(
            `http://localhost:8080/api/documentos/pacientes/${paciente.id}`
          );
          console.log(`Documentos do paciente ${paciente.id}:`, docResponse.data);
          return { ...paciente, documentos: docResponse.data };
        })
      );

      setPacientes(pacientesComDocumentos);
    } catch (error) {
      console.error('Erro ao buscar pacientes e documentos:', error);
    }
  };

  const adicionarPaciente = async (novoPaciente) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/pacientes',
        novoPaciente
      );
      setPacientes((prev) => [...prev, response.data]);
      console.log('Paciente adicionado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao adicionar paciente:', error);
    }
  };

  // Adicionar documento
  const adicionarDocumento = async (idPaciente, formData) => {
    try {
      await axios.post(
        `http://localhost:8080/api/documentos/pacientes/${idPaciente}/documentos/upload`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      const pacienteAtualizado = await axios.get(
        `http://localhost:8080/api/pacientes/${idPaciente}`
      );

      setPacientes((prev) =>
        prev.map((p) =>
          p.id === idPaciente ? { ...p, documentos: pacienteAtualizado.data.documentos } : p
        )
      );
    } catch (error) {
      console.error('Erro ao adicionar documento:', error);
    }
  };

  // Editar paciente
  const editarPaciente = async (idPaciente, dadosAtualizados) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/pacientes/${idPaciente}`,
        dadosAtualizados
      );
      setPacientes((prev) =>
        prev.map((p) => (p.id === idPaciente ? { ...p, ...response.data } : p))
      );
      console.log('Paciente atualizado:', response.data);
    } catch (error) {
      console.error('Erro ao editar paciente:', error);
    }
  };

  // Editar documento
  function editarDocumento(documentoId, dadosAtualizados, arquivo) {
    const formData = new FormData();
    formData.append("nome", dadosAtualizados.nome);
    formData.append("dataCriacao", dadosAtualizados.dataCriacao);
  
    if (arquivo) {
      formData.append("arquivo", arquivo);
    }
    
  
    return axios
      .put(`http://localhost:8080/api/documentos/${documentoId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Documento atualizado:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao editar documento:", error);
      });
  }

  // Deletar paciente e sua pasta
  const deletarPaciente = async (idPaciente) => {
    try {
      await axios.delete(`http://localhost:8080/api/pacientes/${idPaciente}`);
      setPacientes((prev) => prev.filter((p) => p.id !== idPaciente));
      console.log('Paciente deletado');
    } catch (error) {
      console.error('Erro ao deletar paciente:', error);
    }
  };

  // Deletar documento
  const deletarDocumento = async (idPaciente, idDocumento) => {
    try {
      await axios.delete(`http://localhost:8080/api/documentos/${idDocumento}`);
      const pacienteAtualizado = await axios.get(
        `http://localhost:8080/api/pacientes/${idPaciente}`
      );
      setPacientes((prev) =>
        prev.map((p) =>
          p.id === idPaciente ? { ...p, documentos: pacienteAtualizado.data.documentos } : p
        )
      );
      console.log('Documento deletado');
    } catch (error) {
      console.error('Erro ao deletar documento:', error);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  return (
    <PacienteContext.Provider
      value={{
        pacientes,
        adicionarPaciente,
        adicionarDocumento,
        editarPaciente,
        editarDocumento,
        deletarPaciente,
        deletarDocumento,
      }}
    >
      {children}
    </PacienteContext.Provider>
  );
};
