package com.archivo.backend.services;

import com.archivo.backend.dtos.NuevoUsuarioDto;
import com.archivo.backend.entities.Rol;
import com.archivo.backend.entities.Sede;
import com.archivo.backend.entities.AreaInterna;
import com.archivo.backend.entities.Usuario;
import com.archivo.backend.jwt.JwtUtil;
import com.archivo.backend.repositories.RoleRepository;
import com.archivo.backend.repositories.SedeRepository;
import com.archivo.backend.repositories.AreaInternaRepository;
import com.archivo.backend.repositories.UsuarioRepository; // Usaremos UsuarioRepository si ClienteRepository apunta a Usuario
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {
    private final UsuarioService usuarioService;
    // Asumo que 'ClienteRepository' debería ser 'UsuarioRepository' o que su
    // 'ClienteRepository'
    // maneja la entidad Usuario. Mantendré el nombre original por ahora.
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final RoleRepository roleRepository;
    private final SedeRepository sedeRepository;
    private final AreaInternaRepository areaInternaRepository;

    public AuthService(UsuarioService usuarioService, RoleRepository roleRepository, SedeRepository sedeRepository,
            UsuarioRepository usuarioRepository, AreaInternaRepository areaInternaRepository,
            PasswordEncoder passwordEncoder, JwtUtil jwtUtil,
            AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.usuarioService = usuarioService;
        this.roleRepository = roleRepository;
        this.sedeRepository = sedeRepository;
        this.usuarioRepository = usuarioRepository; // Uso aquí 'usuarioRepository'
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.areaInternaRepository = areaInternaRepository;
    }

    public String authenticate(String usuario, String contraseña) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(usuario,
                contraseña);
        Authentication authResult = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authResult);
        return jwtUtil.generateToken(authResult);
    }

    public void registerUser(NuevoUsuarioDto nuevoUsuarioDto) {
        // Verificar si el usuario ya existe
        if (usuarioService.existsByUsuario(nuevoUsuarioDto.getUsuario())) {
            throw new IllegalArgumentException("El nombre de usuario ya existe");
        }

        // Obtener IDs (ya son Integer)
        Integer rolId = nuevoUsuarioDto.getRolId();
        Integer sedeId = nuevoUsuarioDto.getSedeId();
        Integer areaInternaId = nuevoUsuarioDto.getAreaInternaId();

        // Buscar el rol por ID
        Rol rol = roleRepository.findById(rolId)
                .orElseThrow(() -> new IllegalArgumentException("Rol con ID " + rolId + " no encontrado"));

        // Buscar la sede por ID
        Sede sede = sedeRepository.findById(sedeId)
                .orElseThrow(() -> new IllegalArgumentException("Sede con ID " + sedeId + " no encontrada"));

        // Buscar el área interna por ID
        AreaInterna areaInterna = areaInternaRepository.findById(areaInternaId)
                .orElseThrow(
                        () -> new IllegalArgumentException("Área interna con ID " + areaInternaId + " no encontrada"));

        /// Crear el usuario
        Usuario usuario = new Usuario();
        usuario.setUsuario(nuevoUsuarioDto.getUsuario());
        usuario.setContraseña(passwordEncoder.encode(nuevoUsuarioDto.getContraseña()));
        usuario.setNombreCompleto(nuevoUsuarioDto.getNombreCompleto());
        usuario.setDni(nuevoUsuarioDto.getDni());
        usuario.setCorreo(nuevoUsuarioDto.getCorreo()); // <-- Nuevo campo mapeado
        usuario.setTelefono(nuevoUsuarioDto.getTelefono()); // <-- Nuevo campo mapeado

        // Mapear las entidades encontradas
        usuario.setRol(rol);
        usuario.setSede(sede);
        usuario.setAreaInterna(areaInterna);

        // Asignar fechas y estado
        usuario.setEstado(true); // Asignación por defecto
        usuario.setFechaCreado(LocalDateTime.now());
        // El campo fechaActualizado se actualiza automáticamente con @UpdateTimestamp
        // en la entidad
        // Lo establecemos manualmente aquí por si acaso, aunque en la Entidad ya está
        // definido.

        // Guardar el usuario
        usuarioService.save(usuario);
    }
}