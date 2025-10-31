package com.archivo.backend.repositories;

import com.archivo.backend.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    // Método necesario para la autenticación
    Optional<Usuario> findByUsuario(String usuario);

    // Método para validar si el nombre de usuario ya existe
    boolean existsByUsuario(String usuario);
}