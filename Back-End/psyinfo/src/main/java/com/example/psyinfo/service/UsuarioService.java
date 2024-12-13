package com.example.psyinfo.service;

import com.example.psyinfo.dtos.LoginDTO;
import com.example.psyinfo.model.Usuario;
import com.example.psyinfo.payloadResponse.MensagemLogin;
import com.example.psyinfo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Usuario criarUsuario(String username, String password) {
        Usuario usuario = new Usuario();
        usuario.setUsername(username);
        usuario.setPassword(passwordEncoder.encode(password)); // Criptografar a senha

        return usuarioRepository.save(usuario);
    }

    public MensagemLogin loginUsuario(LoginDTO loginDTO) {
        Usuario usuario = usuarioRepository.findByUsername(loginDTO.getUsername());
        if (usuario != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = usuario.getPassword();
            Boolean isPasswordRight = passwordEncoder.matches(password, encodedPassword);
            if (isPasswordRight) {
                return new MensagemLogin("Sucesso ao fazer Login", true);
            } else {
                return new MensagemLogin("Senha Incorreta", false);
            }
        } else {
            return new MensagemLogin("Usuario não encontrado", false);
        }
    }

    public Usuario validarCredenciais(String username, String password) {
        Usuario usuario = usuarioRepository.findByUsername(username);
        if (usuario != null && passwordEncoder.matches(password, usuario.getPassword())) {
            return usuario;
        }
        return null; // Retorna null se as credenciais não forem válidas
    }
}
