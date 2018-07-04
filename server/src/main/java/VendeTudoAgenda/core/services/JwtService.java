package VendeTudoAgenda.core.services;

import VendeTudoAgenda.domain.usuario.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Optional;

@Component
public class JwtService {

    @Value("${jwt.secret}")
    private static String secret;
    @Value("${jwt.sessionTime}")
    private static int sessionTime;

    @Autowired
    public JwtService(@Value("${jwt.secret}") String secret,
                      @Value("${jwt.sessionTime}") int sessionTime) {
        this.secret = secret;
        this.sessionTime = sessionTime;
    }

    public String toToken(Usuario usuario) {
        return Jwts.builder()
                .setSubject(usuario.getId().toString())
                .setExpiration(expireTimeFromNow())
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public Optional<String> getSubFromToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return Optional.ofNullable(claimsJws.getBody().getSubject());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    private Date expireTimeFromNow() {
        return new Date(System.currentTimeMillis() + sessionTime * 1000);
    }

}
