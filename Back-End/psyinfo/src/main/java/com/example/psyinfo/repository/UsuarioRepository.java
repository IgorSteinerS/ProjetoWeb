package com.example.psyinfo.repository;

import com.example.psyinfo.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {


    Usuario findByUsername(String username);

    Optional<Usuario> findOneByUsernameAndPassword(String username, String password);
}
