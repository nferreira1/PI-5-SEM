package br.senac.techcommerce.identityservice.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hibernate.validator.constraints.br.CPF;

import com.fasterxml.jackson.annotation.JsonView;

import br.senac.techcommerce.identityservice.views.UserViews;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "users")
@Entity(name = "User")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Schema(description = "User entity representing registered users in the system.")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Schema(description = "User ID", example = "f47ac10b-58cc-4372-a567-0e02b2c3d479", accessMode = Schema.AccessMode.READ_ONLY)
    @JsonView(UserViews.List.class)
    private UUID userId;

    @Column(nullable = false)
    @Size(min = 3, message = "O nome do usuário tem que ter no mínimo 3 caracteres.")
    @NotBlank(message = "O nome não pode ser nulo e nem vazio.")
    @JsonView({ UserViews.Create.class, UserViews.List.class })
    @Pattern(regexp = "^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$", message = "Nome completo inválido. Deve conter pelo menos um nome e um sobrenome, sem números ou caracteres especiais.")
    @Schema(description = "Full name of the user", example = "John Doe")
    private String fullName;

    @Column(nullable = false, unique = true)
    @Email(message = "O e-mail deve ter um formato válido.")
    @NotBlank(message = "O e-mail não pode ser nulo e nem vazio.")
    @JsonView({ UserViews.Create.class, UserViews.List.class })
    @Schema(description = "Email address of the user", example = "user@user.com")
    private String email;

    @Column(nullable = false, unique = true, columnDefinition = "CHAR(11)", length = 11)
    @CPF(message = "O CPF deve ser válido.")
    @NotBlank(message = "O CPF não pode ser nulo e nem vazio.")
    @JsonView({ UserViews.Create.class, UserViews.List.class })
    @Schema(description = "CPF of the user", example = "12345678901")
    private String cpf;

    @Column(nullable = false, columnDefinition = "CHAR(11)", length = 11)
    @NotNull(message = "O status do usuário não pode ser nulo.")
    @Schema(description = "Status of the user", example = "true", hidden = true)
    private boolean status = true;

    @Column(nullable = false, columnDefinition = "CHAR(11)", length = 11)
    @Pattern(regexp = "^\\d{11}$", message = "Número de celular inválido. Deve conter exatamente 11 dígitos numéricos (DDD + número).")
    @JsonView({ UserViews.Create.class, UserViews.List.class })
    @Schema(description = "Phone number of the user", example = "11912345678")
    private String phone;

    @Column(nullable = false, columnDefinition = "TEXT")
    @NotBlank(message = "A senha não pode ser nula e nem vazia.")
    @JsonView(UserViews.Create.class)
    @Schema(description = "Password of the user", example = "$2a$10$E1N", accessMode = Schema.AccessMode.WRITE_ONLY)
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @Schema(description = "List of addresses associated with the user")
    @JsonView({ UserViews.Create.class, UserViews.List.class })
    private List<AddressEntity> addresses = new ArrayList<>();

}
