package com.archivo.backend.services;

import com.archivo.backend.entities.Usuario;
import com.archivo.backend.repositories.UsuarioRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UsuarioService implements UserDetailsService {

    // Inyección de dependencias usando el constructor o @Autowired
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String usuario) throws UsernameNotFoundException {
        Usuario user = usuarioRepository.findByUsuario(usuario)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        // CAMBIO CLAVE: Usamos getRoles() que coincide con la propiedad de la entidad
        // Rol
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRol().getRoles());

        return new org.springframework.security.core.userdetails.User(
                user.getUsuario(),
                user.getContraseña(),
                Collections.singleton(authority));
    }

    public boolean existsByUsuario(String usuario) {
        return usuarioRepository.existsByUsuario(usuario);
    }

    public void save(Usuario usuario) {
        usuarioRepository.save(usuario);
    }
}