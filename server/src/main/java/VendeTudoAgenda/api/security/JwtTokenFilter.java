package VendeTudoAgenda.api.security;

import VendeTudoAgenda.core.repository.UsuarioRepository;
import VendeTudoAgenda.core.services.JwtService;
import VendeTudoAgenda.domain.usuario.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

public class JwtTokenFilter extends OncePerRequestFilter {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtService jwtService;

    private String header = "Authorization";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        getTokenString(request.getHeader(header)).ifPresent(token -> {
            jwtService.getSubFromToken(token).ifPresent(id -> {
                if (SecurityContextHolder.getContext().getAuthentication() == null) {

                    Usuario usuario = usuarioRepository.findOne(Long.valueOf(id));
                    if (usuario != null) {
                        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                                usuario,
                                null,
                                Collections.emptyList()
                        );
                        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    }
                }
            });
        });

        filterChain.doFilter(request, response);
    }

    private Optional<String> getTokenString(String header) {
        if (!StringUtils.isEmpty(header)) {
            return Optional.ofNullable(header);
        }

        return Optional.empty();
    }

}
