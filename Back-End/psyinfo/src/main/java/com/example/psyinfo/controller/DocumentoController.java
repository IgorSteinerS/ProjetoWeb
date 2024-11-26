package com.example.psyinfo.controller;

import com.example.psyinfo.model.Documento;
import com.example.psyinfo.model.Paciente;
import com.example.psyinfo.repository.DocumentoRepository;
import com.example.psyinfo.service.DocumentoService;
import com.example.psyinfo.repository.PacienteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/documentos")
public class DocumentoController {

    @Autowired
    private DocumentoRepository documentoRepository;

    @Autowired
    private DocumentoService documentoService;

    @Autowired
    private PacienteRepository pacienteRepository;

    @PostMapping("/pacientes/{id}/documentos/upload")
    public ResponseEntity<?> uploadDocumento(
            @PathVariable Long id,
            @RequestParam("arquivo") MultipartFile arquivo,
            @RequestParam("nome") String nome,
            @RequestParam("dataCriacao") String dataCriacao) {

        if (arquivo.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Arquivo não recebido.");
        }

        try {
            // Encontrar paciente
            Paciente paciente = pacienteRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));

            // Criar o diretório
            String caminhoBase = System.getProperty("user.dir") + "/uploads/pacientes/" + id;
            File diretorio = new File(caminhoBase);
            if (!diretorio.exists() && !diretorio.mkdirs()) {
                throw new IOException("Não foi possível criar o diretório: " + caminhoBase);
            }

            // Caminho completo para salvar o arquivo
            String caminhoArquivo = caminhoBase + "/" + arquivo.getOriginalFilename();

            // Transferir o arquivo para o diretório
            try {
                arquivo.transferTo(new File(caminhoArquivo));
                System.out.println("Arquivo salvo com sucesso em: " + caminhoArquivo);
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException("Erro ao salvar o arquivo: " + e.getMessage(), e);
            }

            // Criar o documento no banco
            Documento documento = new Documento();
            documento.setNome(nome);
            documento.setDataCriacao(dataCriacao);
            documento.setCaminhoArquivo(caminhoArquivo);
            documento.setPaciente(paciente);

            documentoRepository.save(documento);

            return ResponseEntity.ok("Documento salvo com sucesso!");
        } catch (IOException e) {
            e.printStackTrace();  // Para visualizar o erro completo
            throw new RuntimeException("Erro ao tentar criar diretório ou salvar o arquivo.", e);
        }

    }

    // Método para acessar os documentos via URL
    @GetMapping("/pacientes/{id}/documentos/{nomeArquivo}")
    public ResponseEntity<Resource> getDocumento(@PathVariable Long id, @PathVariable String nomeArquivo) throws IOException {
        // Caminho do arquivo
        String caminhoArquivo = System.getProperty("user.dir") + "/uploads/pacientes/" + id + "/" + nomeArquivo;
        Resource resource = new UrlResource(Paths.get(caminhoArquivo).toUri());

        if (resource.exists() || resource.isReadable()) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } else {
            throw new IOException("Arquivo não encontrado ou não pode ser lido.");
        }
    }

    @GetMapping("/pacientes/{id}")
    public ResponseEntity<List<Documento>> listarDocumentosPorPaciente(@PathVariable("id") Long pacienteId) {
        Optional<Paciente> pacienteOptional = pacienteRepository.findById(pacienteId);

        if (pacienteOptional.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        List<Documento> documentos = documentoRepository.findByPacienteId(pacienteId);

        // Adicionar URLs para acesso aos arquivos
        documentos.forEach(doc -> {
            String arquivoUrl = "http://localhost:8080/api/documentos/pacientes/" + pacienteId + "/documentos/"
                    + new File(doc.getCaminhoArquivo()).getName();
            doc.setCaminhoArquivo(arquivoUrl);
        });

        return ResponseEntity.ok(documentos);
    }

    // Método para deletar documento
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletarDocumento(@PathVariable("id") Long documentoId) {
        try {
            documentoService.deletarDocumento(documentoId);
            return ResponseEntity.ok("Documento deletado com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao deletar documento: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editarDocumento(
            @PathVariable("id") Long documentoId,
            @RequestParam(value = "nome", required = false) String nome,
            @RequestParam(value = "dataCriacao", required = false) String dataCriacao,
            @RequestParam(value = "arquivo", required = false) MultipartFile arquivo) {

        try {
            // Buscar o documento pelo ID
            Documento documento = documentoRepository.findById(documentoId)
                    .orElseThrow(() -> new RuntimeException("Documento não encontrado"));

            // Atualizar os dados do documento
            if (nome != null && !nome.isEmpty()) {
                documento.setNome(nome);
            }
            if (dataCriacao != null && !dataCriacao.isEmpty()) {
                documento.setDataCriacao(dataCriacao);
            }

            // Verificar se foi enviado um novo arquivo
            if (arquivo != null && !arquivo.isEmpty()) {
                // Deletar o arquivo antigo (caso exista)
                File arquivoAntigo = new File(documento.getCaminhoArquivo());
                if (arquivoAntigo.exists()) {
                    boolean deleted = arquivoAntigo.delete();
                    if (!deleted) {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Erro ao deletar o arquivo antigo.");
                    }
                }

                // Criar diretório para salvar o novo arquivo
                String caminhoBase = System.getProperty("user.dir") + "/uploads/pacientes/" + documento.getPaciente().getId();
                File diretorio = new File(caminhoBase);
                if (!diretorio.exists() && !diretorio.mkdirs()) {
                    throw new IOException("Não foi possível criar o diretório para o novo arquivo.");
                }

                // Caminho completo para o novo arquivo
                String novoCaminhoArquivo = caminhoBase + "/" + arquivo.getOriginalFilename();
                // Salvar o novo arquivo
                arquivo.transferTo(new File(novoCaminhoArquivo));

                // Atualizar o caminho do arquivo no banco de dados
                documento.setCaminhoArquivo(novoCaminhoArquivo);
            }

            // Salvar o documento atualizado
            documentoRepository.save(documento);

            return ResponseEntity.ok("Documento atualizado com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar o documento: " + e.getMessage());
        }
    }

}
