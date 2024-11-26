package com.example.psyinfo.service;


import com.example.psyinfo.model.Paciente;
import com.example.psyinfo.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PacienteService {
    @Autowired
    private PacienteRepository pacienteRepository;

    public List<Paciente> getAllPacientes() {
        return pacienteRepository.findAll();
    }

    public Paciente addPaciente(Paciente paciente) {
        System.out.println("Adicionando paciente: " + paciente);
        return pacienteRepository.save(paciente);
    }

    public void deletePaciente(Long id) {
        pacienteRepository.deleteById(id);
    }

    public Paciente updatePaciente(Long id, Paciente pacienteAtualizado) {
        Paciente paciente = pacienteRepository.findById(id).orElseThrow();
        paciente.setNome(pacienteAtualizado.getNome());
        paciente.setAniversario(pacienteAtualizado.getAniversario());
        paciente.setCpf(pacienteAtualizado.getCpf());
        paciente.setCelular(pacienteAtualizado.getCelular());
        paciente.setInicio(pacienteAtualizado.getInicio());
        return pacienteRepository.save(paciente);
    }
}