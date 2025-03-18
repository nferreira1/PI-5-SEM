package br.senac.techcommerce.identityservice.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import br.senac.techcommerce.identityservice.entities.AddressEntity;
import br.senac.techcommerce.identityservice.exceptions.ErrorResponseException;
import br.senac.techcommerce.identityservice.repositories.AddressRepository;
import jakarta.transaction.Transactional;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserService userService;

    public AddressEntity createAddress(AddressEntity address, UUID userId) {

        address.setUser(this.userService.getUserById(userId));

        return this.addressRepository.save(address);
    }

    public List<AddressEntity> getAddressesByUserId(UUID userId) {
        return this.addressRepository.findAllByUserUserId(userId);
    }

    @Transactional
    public AddressEntity updateAddressByUserId(AddressEntity addressEntity, Long addressId) {

        var address = this.addressRepository.findById(addressId).orElseThrow(
                () -> new ErrorResponseException(HttpStatus.NOT_FOUND, "Endereço não encontrado."));

        address.setStreet(addressEntity.getStreet());
        address.setNumber(addressEntity.getNumber());
        address.setComplement(addressEntity.getComplement());
        address.setNeighborhood(addressEntity.getNeighborhood());
        address.setCity(addressEntity.getCity());
        address.setState(addressEntity.getState());
        address.setZipCode(addressEntity.getZipCode());

        return this.addressRepository.save(address);
    }

}
