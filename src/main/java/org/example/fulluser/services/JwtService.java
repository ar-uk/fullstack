package org.example.fulluser.services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Date;


@Component
public class JwtService {
    static final long EXPIRATIONTIME = 86400000; // 1 day
    static final String PREFIX = "Bearer "; // note the space
    static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String getToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                .signWith(key)
                .compact();
    }

    public String getAuthUser(HttpServletRequest request) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (token != null && token.startsWith(PREFIX)) {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token.replace(PREFIX, "")) // clean cut
                    .getBody()
                    .getSubject();
        }
        return null;
    }
}

