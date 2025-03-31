package br.senac.techcommerce.identityservice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.services.sqs.SqsAsyncClient;
import software.amazon.awssdk.services.sqs.model.SendMessageRequest;

@Service
public class SQSProducerService {

    @Value("${spring.cloud.aws.sqs.queue-name}")
    private String queueUrl;

    @Autowired
    private SqsAsyncClient sqsClient;

    public void send(String to, String subject, String html) {
        String message = String.format("{\"to\":\"%s\",\"subject\":\"%s\",\"html\":\"%s\"}", to, subject, html);

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
