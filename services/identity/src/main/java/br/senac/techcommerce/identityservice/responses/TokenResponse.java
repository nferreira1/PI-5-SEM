package br.senac.techcommerce.identityservice.responses;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Response object containing the user's authentication token.")
public record TokenResponse(
                @Schema(description = "JWT token generated for authentication", example = "eyJhbGciOiJIUzI1...") String token) {

}
