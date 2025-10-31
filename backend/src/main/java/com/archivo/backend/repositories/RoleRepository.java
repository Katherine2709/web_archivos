package com.archivo.backend.repositories;

import com.archivo.backend.entities.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Rol, Integer> {
    // Busca por el campo 'roles' de la entidad Rol
    Optional<Rol> findByRoles(String roles);
}