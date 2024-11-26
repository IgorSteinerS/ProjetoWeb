package com.example.psyinfo.mapper;

import com.example.psyinfo.dtos.PacienteDTO;
import com.example.psyinfo.model.Paciente;

public class PacienteMapper {

    // Converte uma entidade Paciente para um DTO
    public static PacienteDTO toDto(Paciente paciente) {
        PacienteDTO dto = new PacienteDTO();
        dto.setId(paciente.getId());
        dto.setNome(paciente.getNome());
        dto.setAniversario(paciente.getAniversario());
        dto.setCpf(paciente.getCpf());
        dto.setCelular(paciente.getCelular());
        dto.setInicio(paciente.getInicio());
        return dto;
    }

    // Converte um DTO para uma entidade Paciente
    public static Paciente toEntity(PacienteDTO dto) {
        Paciente paciente = new Paciente();
        paciente.setId(dto.getId());
        paciente.setNome(dto.getNome());
        paciente.setAniversario(dto.getAniversario());
        paciente.setCpf(dto.getCpf());
        paciente.setCelular(dto.getCelular());
        paciente.setInicio(dto.getInicio());
        return paciente;
    }
}
