package br.senac.techcommerce.orderservice.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.services.sqs.SqsAsyncClient;
import software.amazon.awssdk.services.sqs.model.SendMessageRequest;

@Service
public class SQSProducerService {

    @Value("${spring.cloud.aws.sqs.queue-url}")
    private String queueUrl;

    @Autowired
    private SqsAsyncClient sqsClient;

    public void send(UUID productId, int quantity) {

        System.out.println("queueUrl: " + queueUrl);

        String message = String.format("{\"productId\":\"%s\", \"quantity\": %d}", productId, quantity);

        SendMessageRequest request = SendMessageRequest.builder()
                .queueUrl(queueUrl)
                .messageBody(message)
                .build();

        sqsClient.sendMessage(request).whenComplete((resp, err) -> {
            if (err != null) {
                System.err.println("Erro ao enviar mensagem: " + err.getMessage());
            } else {
                System.out.println("Mensagem enviada com ID: " + resp.messageId());
            }
        });
    }
}
