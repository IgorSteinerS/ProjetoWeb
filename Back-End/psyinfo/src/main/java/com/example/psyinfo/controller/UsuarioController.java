package com.example.psyinfo.controller;

import com.example.psyinfo.dtos.LoginDTO;
import com.example.psyinfo.model.Usuario;
import com.example.psyinfo.payloadResponse.MensagemLogin;
import com.example.psyinfo.repository.UsuarioRepository;
import com.example.psyinfo.service.UsuarioService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/criar")
    public ResponseEntity<?> criarUsuario(@RequestBody Map<String, String> payload) {
        try {
            String username = payload.get("username");
            String password = payload.get("password");

            usuarioService.criarUsuario(username, password);
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuário criado com sucesso!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<String> loginUsuario(@RequestBody LoginDTO loginDTO, HttpServletRequest request) {
        try {
            // Verifica as credenciais
            Usuario usuario = usuarioService.validarCredenciais(loginDTO.getUsername(), loginDTO.getPassword());
            if (usuario != null) {
                // Armazena o usuário na sessão
                request.getSession().setAttribute("usuario", usuario);
                return ResponseEntity.ok("Login bem-sucedido!");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
            }
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais incorretas!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno no servidor");
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logoutUsuario(HttpServletRequest request) {
        request.getSession().invalidate(); // Invalida a sessão
        return ResponseEntity.ok("Logout realizado com sucesso");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUsuarioAutenticado(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autenticado");
        }
        return ResponseEntity.ok(authentication.getPrincipal());
    }

}