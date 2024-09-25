import React, { createContext, useState } from 'react';

export const PacienteContext = createContext();

export const PacienteProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);

  const adicionarPaciente = (paciente) => {
    const novoPaciente = {
      id: pacientes.length + 1,
      nome: paciente.nome,
      data: paciente.data,
      sexo: paciente.sexo,
      cpf: paciente.cpf,
      endereco: paciente.endereco,
      telefone: paciente.telefone,
    };
    setPacientes([...pacientes, novoPaciente]);
  };

  return (
    <PacienteContext.Provider value={{ pacientes, adicionarPaciente }}>
      {children}
    </PacienteContext.Provider>
  );
};
