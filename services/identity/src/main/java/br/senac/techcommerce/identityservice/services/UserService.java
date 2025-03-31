package br.senac.techcommerce.identityservice.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.senac.techcommerce.identityservice.entities.UserEntity;
import br.senac.techcommerce.identityservice.exceptions.ErrorResponseException;
import br.senac.techcommerce.identityservice.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private SQSProducerService sqsProducerService;

    @Autowired
    private UserRepository userRepository;

    public UserEntity getUserById(UUID userId) {
        return this.userRepository.findById(userId)
                .orElseThrow(() -> new ErrorResponseException(HttpStatus.NOT_FOUND, "Usuário não encontrado!"));
    }

    public boolean existsUserByEmail(String email) {
        return this.userRepository.findByEmail(email.toLowerCase()).isPresent();
    }

    public UserEntity createUser(UserEntity user) {

        user.setPassword(this.passwordEncoder.encode(user.getPassword()));

        if (!user.getAddresses().isEmpty()) {
            user.getAddresses().forEach(address -> address.setUser(user));
        }

        var userSaved = this.userRepository.save(user);

        this.sqsProducerService.send("nathan@circulomilitar.com.br", "Boas vindas",
                "Seja bem-vindo ao TechCommerce!");

        return userSaved;
    }

}
