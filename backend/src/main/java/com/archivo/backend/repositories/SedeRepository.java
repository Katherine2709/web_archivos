package com.archivo.backend.repositories;

import com.archivo.backend.entities.Sede;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SedeRepository extends JpaRepository<Sede, Integer> {
    // Puede añadir métodos de búsqueda personalizados aquí si es necesario
    Optional<Sede> findByNombre(String nombre);
}
