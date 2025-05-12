package br.senac.techcommerce.orderservice.entities;

import com.fasterxml.jackson.annotation.JsonView;

import br.senac.techcommerce.orderservice.views.OrderView;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "order_status")
@Entity(name = "OrderStatus")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Represents a possible status for an order.")
public class OrderStatusEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Schema(description = "Unique identifier for the order status")
    @JsonView({ OrderView.Create.class, OrderView.List.class })
    private Long statusId;

    @Column(nullable = false, unique = true)
    @NotBlank
    @Schema(description = "Name of the status", example = "PENDING")
    @JsonView({ OrderView.Create.class, OrderView.List.class })
    private String name;

    @Column(nullable = true)
    @Schema(description = "Optional description of the status", example = "The order has been placed and is awaiting payment")
    @JsonView({ OrderView.Create.class, OrderView.List.class })
    private String description;
}
