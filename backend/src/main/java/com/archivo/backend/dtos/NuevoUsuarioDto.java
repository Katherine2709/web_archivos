package com.archivo.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NuevoUsuarioDto {

    @NotBlank(message = "El usuario es obligatorio")
    @Size(min = 4, max = 30)
    private String usuario;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres") // Añadir size
    private String contraseña;

    // Opcionales (no necesitan @NotBlank, ya que pueden ser null/vacío)
    private String nombreCompleto;
    private String dni;
    private String correo; // Añadido para coincidir con la Entidad
    private String telefono; // Añadido para coincidir con la Entidad

    // Los IDs son obligatorios
    @NotNull(message = "El ID del rol es obligatorio")
    private Integer rolId;

    @NotNull(message = "El ID de la sede es obligatorio")
    private Integer sedeId;

    @NotNull(message = "El ID del área interna es obligatorio")
    private Integer areaInternaId;
}