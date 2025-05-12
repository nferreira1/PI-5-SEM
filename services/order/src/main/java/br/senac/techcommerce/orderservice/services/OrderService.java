package br.senac.techcommerce.orderservice.services;

import br.senac.techcommerce.orderservice.entities.OrderEntity;
import br.senac.techcommerce.orderservice.entities.OrderStatusEntity;
import br.senac.techcommerce.orderservice.exceptions.ErrorResponseException;
import br.senac.techcommerce.orderservice.repositories.OrderRepository;
import br.senac.techcommerce.orderservice.repositories.OrderStatusRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderStatusRepository statusRepository;

    @Autowired
    private SQSProducerService sqsProducerService;

    @Transactional
    public void markOrderAsPaid(Long orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ErrorResponseException(HttpStatus.BAD_REQUEST, "Order not found"));

        OrderStatusEntity paidStatus = statusRepository.findByNameIgnoreCase("PAID")
                .orElseThrow(() -> new ErrorResponseException(HttpStatus.BAD_REQUEST, "Status 'PAID' not found"));

        order.setStatus(paidStatus);
        orderRepository.save(order);
    }

    public List<OrderEntity> getAllOrdersByUserId(UUID userId) {
        return orderRepository.findAllByUserId(userId)
                .orElseThrow(() -> new ErrorResponseException(HttpStatus.BAD_REQUEST, "Order not found"));
    }

    public OrderEntity createOrder(OrderEntity order) {
        var paid = this.statusRepository.findById(2L)
                .orElseThrow(() -> new ErrorResponseException(HttpStatus.NOT_FOUND, "Status não encontrado."));
        order.setStatus(paid);
        order.getItems().forEach(item -> {
            item.setOrder(order);
            this.sqsProducerService.send(item.getProductId(), item.getQuantity());
        });
        return orderRepository.save(order);
    }

    public List<OrderEntity> getAllOrders() {
        return orderRepository.findAll();
    }

    public OrderEntity getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ErrorResponseException(HttpStatus.BAD_REQUEST, "Order not found"));
    }

}
