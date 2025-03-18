package br.senac.techcommerce.identityservice.services;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j(topic = "RABBITMQ_PRODUCER")
public class RabbitMQProducerService {

    private final RabbitTemplate rabbitTemplate;

    @Value("${spring.rabbitmq.queue.email}")
    private String emailQueue;

    public RabbitMQProducerService(RabbitTemplate rabbitTemplate, ObjectMapper objectMapper) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendEmailMessage(String to, String subject, String html) {
        var message = "{\"to\":\"" + to + "\",\"subject\":\"" + subject + "\",\"html\":\"" + html + "\"}";
        rabbitTemplate.convertAndSend("", emailQueue, message);
        log.info("📩 Email message published to RabbitMQ: " + message);
    }
}