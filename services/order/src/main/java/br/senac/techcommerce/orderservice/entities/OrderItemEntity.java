package br.senac.techcommerce.orderservice.entities;

import java.math.BigDecimal;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonView;

import br.senac.techcommerce.orderservice.views.OrderView;
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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "order_items")
@Entity(name = "OrderItem")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Represents a single product in a customer order.")
public class OrderItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Schema(description = "Unique identifier for the order item")
    @JsonView(OrderView.List.class)
    private Long orderItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    @Schema(description = "Reference to the order this item belongs to", hidden = true)
    private OrderEntity order;

    @Column(nullable = false)
    @Schema(description = "Product ID (from Catalog Service)", example = "c0a8012e-7e6b-4b79-84ea-4c0b2e6f6c53")
    @JsonView({ OrderView.Create.class, OrderView.List.class })
    private UUID productId;

    @Column(nullable = false)
    @Schema(description = "Quantity of the product ordered", example = "2")
    @JsonView({ OrderView.Create.class, OrderView.List.class })
    private int quantity;

    @Column(nullable = false)
    @Schema(description = "Unit price of the product at the time of order", example = "74.95")
    @JsonView({ OrderView.Create.class, OrderView.List.class })
    private BigDecimal unitPrice;
}
