import React, { createContext, useState } from 'react';

export const PacienteContext = createContext();

export const PacienteProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);

  const adicionarPaciente = (paciente) => {
    const novoPaciente = {
      id: pacientes.length + 1,
      nome: paciente.nome,
      aniversario: paciente.aniversario,
      cpf: paciente.cpf,
      celular: paciente.celular,
      inicio: paciente.inicio,
    };
    setPacientes([...pacientes, novoPaciente]);
  };

  return (
    <PacienteContext.Provider value={{ pacientes, adicionarPaciente }}>
      {children}
    </PacienteContext.Provider>
  );
};
