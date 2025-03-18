package br.senac.techcommerce.identityservice.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import br.senac.techcommerce.identityservice.entities.AddressEntity;
import br.senac.techcommerce.identityservice.exceptions.ErrorResponseException;
import br.senac.techcommerce.identityservice.services.AddressService;
import br.senac.techcommerce.identityservice.views.AddressViews;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Address", description = "Controller for managing user addresses.")
@RequestMapping("/address")
@RestController
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    @JsonView(AddressViews.List.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Create address successful", content = @Content(schema = @Schema(implementation = AddressEntity.class))),
            @ApiResponse(responseCode = "400", description = "Invalid request", content = @Content(schema = @Schema(implementation = ErrorResponseException.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema(implementation = ErrorResponseException.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema(implementation = ErrorResponseException.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ErrorResponseException.class))),
    })
    @Operation(summary = "Create address", description = "Endpoint for registering a new user address.")
    public ResponseEntity<AddressEntity> post(JwtAuthenticationToken jwtAuthenticationToken,
            @Valid @RequestBody @JsonView(AddressViews.Create.class) AddressEntity addressEntity) {

        return ResponseEntity.status(HttpStatus.CREATED).body(this.addressService.createAddress(addressEntity,
                UUID.fromString(jwtAuthenticationToken.getToken().getSubject())));
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    @JsonView(AddressViews.List.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List addresses successful", content = @Content(array = @ArraySchema(schema = @Schema(implementation = AddressEntity.class)))),
            @ApiResponse(responseCode = "400", description = "Invalid request", content = @Content(schema = @Schema(implementation = ErrorResponseException.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema(implementation = ErrorResponseException.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema(implementation = ErrorResponseException.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ErrorResponseException.class))),
    })
    @Operation(summary = "List addresses", description = "Endpoint to list all addresses of a user.")
    public ResponseEntity<List<AddressEntity>> get(JwtAuthenticationToken jwtAuthenticationToken) {
        return ResponseEntity.ok().body(this.addressService
                .getAddressesByUserId(UUID.fromString(jwtAuthenticationToken.getToken().getSubject())));
    }

    @PutMapping
    @PreAuthorize("isAuthenticated()")
    @JsonView(AddressViews.Update.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Update address successful", content = @Content(schema = @Schema(implementation = AddressEntity.class))),
            @ApiResponse(responseCode = "400", description = "Invalid request", content = @Content(schema = @Schema(implementation = ErrorResponseException.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema(implementation = ErrorResponseException.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema(implementation = ErrorResponseException.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ErrorResponseException.class))),
    })
    @Operation(summary = "Update address", description = "Endpoint to update a address of a user.")
    public ResponseEntity<AddressEntity> put(JwtAuthenticationToken jwtAuthenticationToken,
            @Valid @RequestBody @JsonView(AddressViews.Update.class) AddressEntity addressEntity, Long addressId) {
        return ResponseEntity.ok().body(this.addressService.updateAddressByUserId(addressEntity, addressId));
    }

}
