package br.senac.techcommerce.orderservice.controllers;

import br.senac.techcommerce.orderservice.entities.OrderEntity;
import br.senac.techcommerce.orderservice.services.OrderService;
import br.senac.techcommerce.orderservice.views.OrderView;
import io.swagger.v3.oas.annotations.Operation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    @JsonView(OrderView.List.class)
    @Operation(summary = "Create a new order")
    public ResponseEntity<OrderEntity> createOrder(JwtAuthenticationToken jwtAuthenticationToken,
            @RequestBody @JsonView(OrderView.Create.class) OrderEntity order) {
        order.setUserId(UUID.fromString(jwtAuthenticationToken.getToken().getSubject()));
        return ResponseEntity.ok(this.orderService.createOrder(order));
    }

    @GetMapping
    @JsonView(OrderView.List.class)
    @Operation(summary = "Get all orders by User ID")
    public ResponseEntity<List<OrderEntity>> getOrders(JwtAuthenticationToken jwtAuthenticationToken) {
        return ResponseEntity.ok().body(
                orderService.getAllOrdersByUserId(UUID.fromString(jwtAuthenticationToken.getToken().getSubject())));
    }

}
