package com.example.psyinfo.controller;

import com.example.psyinfo.mapper.PacienteMapper;
import com.example.psyinfo.model.Paciente;
import com.example.psyinfo.dtos.PacienteDTO;
import com.example.psyinfo.service.PacienteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @GetMapping
    public List<PacienteDTO> getAllPacientes() {

        // Mapeia a lista de Pacientes para uma lista de PacienteDTO
        return pacienteService.getAllPacientes()
                .stream()
                .map(PacienteMapper::toDto)
                .collect(Collectors.toList());
    }

    @PostMapping
    public Paciente addPaciente(@RequestBody Paciente paciente) {
        return pacienteService.addPaciente(paciente);
    }

    @PutMapping("/{id}")
    public Paciente updatePaciente(@PathVariable Long id, @RequestBody Paciente pacienteAtualizado) {
        return pacienteService.updatePaciente(id, pacienteAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePaciente(@PathVariable Long id) {
        pacienteService.deletePaciente(id);
        return ResponseEntity.ok().build();
    }
}
