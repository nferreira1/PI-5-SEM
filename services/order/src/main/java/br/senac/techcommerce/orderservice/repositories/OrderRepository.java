package br.senac.techcommerce.orderservice.repositories;

import br.senac.techcommerce.orderservice.entities.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

    Optional<List<OrderEntity>> findAllByUserId(UUID userId);

}
