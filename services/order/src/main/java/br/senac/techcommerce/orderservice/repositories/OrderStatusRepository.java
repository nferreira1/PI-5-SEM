package br.senac.techcommerce.orderservice.repositories;

import br.senac.techcommerce.orderservice.entities.OrderStatusEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderStatusRepository extends JpaRepository<OrderStatusEntity, Long> {

    Optional<OrderStatusEntity> findByNameIgnoreCase(String name);

}
