package br.senac.techcommerce.identityservice.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.senac.techcommerce.identityservice.entities.AddressEntity;

public interface AddressRepository extends JpaRepository<AddressEntity, Long> {

    List<AddressEntity> findAllByUserUserId(UUID userId);

}
