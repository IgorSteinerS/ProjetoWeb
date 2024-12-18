package com.example.psyinfo.repository;

import com.example.psyinfo.model.Documento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentoRepository extends JpaRepository<Documento, Long> {
    List<Documento> findByPacienteId(Long pacienteId);
}
