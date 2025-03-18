package br.senac.techcommerce.identityservice.requests;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {

    @Email(message = "O e-mail deve ter um formato válido.")
    @NotBlank(message = "O e-mail não pode ser nulo e nem vazio.")
    @Schema(description = "User's email address", example = "user@user.com")
    private String email;

    @NotBlank(message = "A senha não pode ser nula e nem vazia.")
    @Schema(description = "User's password", example = "password")
    private String password;

}
