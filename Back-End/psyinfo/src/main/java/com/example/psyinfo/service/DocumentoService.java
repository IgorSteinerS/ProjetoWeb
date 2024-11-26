package com.example.psyinfo.service;

import com.example.psyinfo.model.Documento;
import com.example.psyinfo.model.Paciente;
import com.example.psyinfo.repository.DocumentoRepository;
import com.example.psyinfo.repository.PacienteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class DocumentoService {

    @Autowired
    private DocumentoRepository documentoRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    public void salvarDocumento(MultipartFile arquivo, Paciente paciente, String nome, String dataCriacao) throws IOException {
        String caminhoBase = "c:/documentos/uploads";

        // Verificar e criar diretório
        File diretorio = new File(caminhoBase);
        if (!diretorio.exists()) {
            if (!diretorio.mkdirs()) {
                throw new IOException("Não foi possível criar o diretório para salvar arquivos.");
            }
        }

        // Caminho completo para salvar o arquivo
        String caminhoCompleto = caminhoBase + "/" + arquivo.getOriginalFilename();

        // Transferir arquivo
        try {
            arquivo.transferTo(new File(caminhoCompleto));
        } catch (IOException e) {
            throw new RuntimeException("Erro ao salvar o arquivo: " + e.getMessage(), e);
        }

        // Salvar informações no banco
        Documento documento = new Documento();
        documento.setNome(nome);
        documento.setDataCriacao(dataCriacao);
        documento.setCaminhoArquivo(caminhoCompleto);
        documento.setPaciente(paciente);

        documentoRepository.save(documento);
    }

    public List<Documento> listarDocumentosPorPaciente(Long pacienteId) {
        return documentoRepository.findByPacienteId(pacienteId);
    }

    public void deletarDocumento(Long documentoId) {
        Documento documento = documentoRepository.findById(documentoId)
                .orElseThrow(() -> new RuntimeException("Documento não encontrado."));

        // Excluir o arquivo físico
        File arquivo = new File(documento.getCaminhoArquivo());
        if (arquivo.exists()) {
            arquivo.delete();
        }

        // Remover do banco de dados
        documentoRepository.deleteById(documentoId);
    }
}
