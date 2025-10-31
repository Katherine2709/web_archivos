package com.archivo.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "usuario", nullable = false, unique = true, length = 30)
    private String usuario;

    @Column(name = "contraseña", nullable = false, length = 60)
    private String contraseña;

    @Column(name = "nombre_completo", length = 50)
    private String nombreCompleto;

    @Column(name = "dni", unique = true, length = 15)
    private String dni;

    @Column(name = "correo", length = 50)
    private String correo;

    @Column(name = "telefono", length = 20)
    private String telefono;

    // Relación con ROL
    @ManyToOne
    @JoinColumn(name = "rol_id", nullable = false) // Columna FK en tabla 'usuario'
    private Rol rol;

    // Relación con AREA_INTERNA
    @ManyToOne
    @JoinColumn(name = "area_interna_id") // Columna FK en tabla 'usuario'
    private AreaInterna areaInterna;

    // Relación con SEDE
    @ManyToOne
    @JoinColumn(name = "sede_id") // Columna FK en tabla 'usuario'
    private Sede sede;

    // Otros campos
    @Column(name = "estado")
    private Boolean estado = true;

    @Column(name = "fecha_creado", updatable = false)
    private LocalDateTime fechaCreado;

    @Column(name = "fecha_actualizado")
    private LocalDateTime fechaActualizado; // Mapea fecha_actualizado
}