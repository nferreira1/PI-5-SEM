package br.senac.techcommerce.identityservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import br.senac.techcommerce.identityservice.entities.UserEntity;
import br.senac.techcommerce.identityservice.exceptions.ErrorResponseException;
import br.senac.techcommerce.identityservice.services.UserService;
import br.senac.techcommerce.identityservice.views.UserViews;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "User", description = "Controller for managing user and related operations.")
@RequestMapping("/user")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    @JsonView(UserViews.List.class)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User created successfully", content = @Content(schema = @Schema(implementation = UserEntity.class))),
            @ApiResponse(responseCode = "400", description = "Invalid request", content = @Content(schema = @Schema(implementation = ErrorResponseException.class))),
            @ApiResponse(responseCode = "409", description = "Conflict", content = @Content(schema = @Schema(implementation = ErrorResponseException.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ErrorResponseException.class)))
    })
    @Operation(summary = "Create user", description = "Endpoint for user creation.")
    public ResponseEntity<UserEntity> post(
            @Valid @RequestBody @JsonView(UserViews.Create.class) UserEntity userEntity) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.userService.createUser(userEntity));
    }

}
