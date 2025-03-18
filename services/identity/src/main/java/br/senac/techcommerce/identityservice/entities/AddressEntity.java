package br.senac.techcommerce.identityservice.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;

import br.senac.techcommerce.identityservice.views.AddressViews;
import br.senac.techcommerce.identityservice.views.UserViews;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "addresses")
@Entity(name = "Address")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Schema(description = "Address entity representing registered addresses in the system.")
public class AddressEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Address ID", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    @JsonView({ AddressViews.List.class, UserViews.List.class, AddressViews.Update.class })
    private Long addressId;

    @Column(nullable = false)
    @NotBlank(message = "O nome da rua não pode ser nulo e nem vazio.")
    @Schema(description = "Street name", example = "123 Main St")
    @JsonView({ AddressViews.Create.class, AddressViews.List.class, AddressViews.Update.class,
            UserViews.Create.class,
            UserViews.List.class })
    private String street;

    @Column(nullable = false)
    @NotBlank(message = "O número do endereço não pode ser nulo e nem vazio.")
    @Schema(description = "House or building number", example = "456")
    @JsonView({ AddressViews.Create.class, AddressViews.List.class, AddressViews.Update.class,
            UserViews.Create.class,
            UserViews.List.class })
    private String number;

    @Column
    @Schema(description = "Additional address details", example = "Apt 42B")
    @JsonView({ AddressViews.Create.class, AddressViews.List.class, AddressViews.Update.class,
            UserViews.Create.class,
            UserViews.List.class })
    private String complement;

    @Column(nullable = false)
    @NotBlank(message = "O bairro não pode ser nulo e nem vazio.")
    @Schema(description = "Neighborhood", example = "Moema")
    @JsonView({ AddressViews.Create.class, AddressViews.List.class, AddressViews.Update.class,
            UserViews.Create.class,
            UserViews.List.class })
    private String neighborhood;

    @Column(nullable = false)
    @NotBlank(message = "A cidade não pode ser nula e nem vazia.")
    @Schema(description = "City name", example = "São Paulo")
    @JsonView({ AddressViews.Create.class, AddressViews.List.class, AddressViews.Update.class,
            UserViews.Create.class,
            UserViews.List.class })
    private String city;

    @Column(nullable = false)
    @NotBlank(message = "O estado não pode ser nulo e nem vazio.")
    @Pattern(regexp = "^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$", message = "Estado inválido. Use apenas a sigla oficial de dois caracteres de um estado.")
    @Schema(description = "State name", example = "SP", pattern = "^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$")
    @JsonView({ AddressViews.Create.class, AddressViews.List.class, AddressViews.Update.class,
            UserViews.Create.class,
            UserViews.List.class })
    private String state;

    @Column(nullable = false, length = 8)
    @Pattern(regexp = "^\\d{8}$", message = "CEP inválido. Deve conter exatamente 8 dígitos numéricos.")
    @Schema(description = "Postal code (CEP)", example = "12345678")
    @JsonView({ AddressViews.Create.class, AddressViews.List.class, AddressViews.Update.class,
            UserViews.Create.class,
            UserViews.List.class })
    private String zipCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    @Schema(description = "User associated with the address")
    private UserEntity user;

}
