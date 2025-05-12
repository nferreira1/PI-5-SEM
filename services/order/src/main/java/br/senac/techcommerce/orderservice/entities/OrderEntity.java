package br.senac.techcommerce.orderservice.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonView;

import br.senac.techcommerce.orderservice.views.OrderView;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "orders")
@Entity(name = "Order")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Order entity representing a customer order.")
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Schema(description = "Unique identifier for the order")
    @JsonView(OrderView.List.class)
    private Long orderId;

    @Column(nullable = false)
    @Schema(description = "ID of the user who placed the order (from Identity Service)", example = "f7e1b6e4-8c7e-4fc5-a0dc-5d7f789cd1c4", hidden = true)
    private UUID userId;

    @Column(nullable = false)
    @Schema(description = "Date and time when the order was created", example = "2025-05-11T14:30:00")
    @JsonView(OrderView.List.class)
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne(optional = false)
    @JoinColumn(name = "status_id", nullable = false)
    @Schema(description = "Status of the order")
    @JsonView(OrderView.List.class)
    private OrderStatusEntity status;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @Schema(description = "List of items in the order")
    @JsonView({ OrderView.Create.class, OrderView.List.class })
    private List<OrderItemEntity> items = new ArrayList<>();
}
