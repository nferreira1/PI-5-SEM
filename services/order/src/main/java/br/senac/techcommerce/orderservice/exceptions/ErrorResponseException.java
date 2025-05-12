package br.senac.techcommerce.orderservice.exceptions;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
@JsonIncludeProperties({ "status", "message", "errors" })
@JsonIgnoreProperties({ "cause", "stackTrace", "localizedMessage", "suppressed" })
@Schema(description = "Standard API error response")
public class ErrorResponseException extends RuntimeException {

    @Schema(description = "HTTP status code of the error. Values between 400 and 599.", defaultValue = "0", minimum = "400", maximum = "599")
    private final short status;

    @Schema(description = "Error message that explains the cause of the error")
    private final String message;

    @ArraySchema(arraySchema = @Schema(description = "List of errors with details about each error", example = "[{\"field\": \"string\", \"message\": \"string\"}]"), schema = @Schema(implementation = Error.class))
    private List<Error> errors = new ArrayList<>();

    public ErrorResponseException(HttpStatus status, String message) {
        super(message);
        this.status = (short) status.value();
        this.message = message;
    }

    public ErrorResponseException(short status, String message, List<Error> errors) {
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    public void addError(String field, String message) {
        if (Objects.isNull(errors)) {
            this.errors = new ArrayList<>();
        }
        this.errors.add(new Error(field, message));
    }

    @Schema(description = "Error details with field and message")
    private record Error(String field, String message) {

    }

}
