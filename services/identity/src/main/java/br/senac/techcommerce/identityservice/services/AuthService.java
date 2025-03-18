package br.senac.techcommerce.identityservice.services;

import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import br.senac.techcommerce.identityservice.entities.UserEntity;
import br.senac.techcommerce.identityservice.exceptions.ErrorResponseException;
import br.senac.techcommerce.identityservice.repositories.AuthRepository;

@Service
public class AuthService {

    @Value("${spring.application.name}")
    private String applicationName;

    @Value("${jwt.expiration.time}")
    private int expirationTime;

    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtEncoder jwtEncoder;

    public UserEntity findUserByEmail(String email) {
        return this.authRepository
                .findByEmail(email.toLowerCase())
                .orElseThrow(() -> new ErrorResponseException(HttpStatus.NOT_FOUND, "Usuário não encontrado!"));
    }

    public String login(String email, String password) {

        var user = this.findUserByEmail(email);

        if (!user.isStatus()) {
            throw new ErrorResponseException(HttpStatus.FORBIDDEN, "O cliente está inativo.");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            var errorResponseException = new ErrorResponseException(HttpStatus.UNAUTHORIZED,
                    "E-mail ou senha inválidos.");
            errorResponseException.addError("password", "E-mail ou senha inválidos.");
            errorResponseException.addError("email", "E-mail ou senha inválidos.");

            throw errorResponseException;
        }

        var issuedAt = Instant.now();
        var expiresAt = issuedAt.plusSeconds(expirationTime * 60);

        var claims = JwtClaimsSet
                .builder()
                .issuer(applicationName)
                .subject(user.getUserId().toString())
                .claim("fullName", user.getFullName())
                .claim("email", user.getEmail())
                .claim("cpf", user.getCpf())
                .claim("phone", user.getPhone())
                .claim("roles", List.of("USER"))
                .issuedAt(issuedAt)
                .expiresAt(expiresAt)
                .build();

        return this.jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

}
