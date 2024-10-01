import React, { createContext, useState } from 'react';

export const PacienteContext = createContext();

export const PacienteProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);

 
  const adicionarPaciente = (paciente) => {
    const novoPaciente = {
      id: Date.now(), // Gera um ID único com base no timestamp atual
      nome: paciente.nome,
      aniversario: paciente.aniversario,
      cpf: paciente.cpf,
      celular: paciente.celular,
      inicio: paciente.inicio,
      documentos: [],
    };
    setPacientes([...pacientes, novoPaciente]);
  };

 
  const editarPaciente = (id, pacienteAtualizado) => {
    setPacientes(pacientes.map(paciente => 
      paciente.id === id ? { ...pacienteAtualizado, id } : paciente
    ));
  };

 
  const deletarPaciente = (id) => {
    setPacientes(pacientes.filter(paciente => paciente.id !== id));
  };

    
    const adicionarDocumento = (id, documento) => {
      setPacientes((prevPacientes) =>
        prevPacientes.map((paciente) =>
          paciente.id === parseInt(id)
            ? { ...paciente, documentos: [...paciente.documentos, documento] }
            : paciente
        )
      );
    };

    const editarDocumento = (idPaciente, indexDocumento, documentoAtualizado) => {
      setPacientes((prevPacientes) =>
        prevPacientes.map((paciente) =>
          paciente.id === parseInt(idPaciente)
            ? {
                ...paciente,
                documentos: paciente.documentos.map((doc, idx) =>
                  idx === parseInt(indexDocumento) ? documentoAtualizado : doc
                ),
              }
            : paciente
        )
      );
    };
  
    const deletarDocumento = (idPaciente, indexDocumento) => {
      setPacientes((prevPacientes) =>
        prevPacientes.map((paciente) =>
          paciente.id === parseInt(idPaciente)
            ? {
                ...paciente,
                documentos: paciente.documentos.filter((_, idx) => idx !== indexDocumento),
              }
            : paciente
        )
      );
    };
  

  return (
    <PacienteContext.Provider value={{ 
      pacientes, 
      adicionarPaciente, 
      editarPaciente, 
      deletarPaciente, 
      adicionarDocumento,
      editarDocumento,
      deletarDocumento}}>
      {children}
    </PacienteContext.Provider>
  );
};
