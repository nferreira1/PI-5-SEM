import { env } from "@/env";
import {
	DeleteMessageCommand,
	ReceiveMessageCommand,
	SQSClient,
} from "@aws-sdk/client-sqs";
import chalk from "chalk";
import * as nodemailer from "nodemailer";

const sqsClient = new SQSClient({
	region: env.AWS_DEFAULT_REGION,
	credentials: {
		accessKeyId: env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
	},
	endpoint: env.AWS_SQS_QUEUE_ENDPOINT,
});

const log = {
	info: (...args: any[]) => console.log(chalk.blue("[INFO]"), ...args),
	success: (...args: any[]) => console.log(chalk.green("[SUCCESS]"), ...args),
	warn: (...args: any[]) => console.warn(chalk.yellow("[WARN]"), ...args),
	error: (...args: any[]) => console.error(chalk.red("[ERROR]"), ...args),
};

export const sendEmail = async (to: string, subject: string, html: string) => {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: env.EMAIL_USER,
			pass: env.EMAIL_PASS,
		},
	});

	try {
		const info = await transporter.sendMail({
			from: `Techcommerce <${env.EMAIL_USER}>`,
			to,
			subject,
			html,
		});
		log.success(`E-mail enviado para ${to} (ID: ${info.messageId})`);
	} catch (error) {
		log.error("Erro ao enviar e-mail:", error);
		throw error;
	}
};

const startPolling = async (): Promise<void> => {
	log.info("🚀 Iniciando consumidor de e-mail...");

	while (true) {
		try {
			const command = new ReceiveMessageCommand({
				QueueUrl: env.EMAIL_SERVICE_QUEUE_URL,
				MaxNumberOfMessages: 5,
				WaitTimeSeconds: 10,
				VisibilityTimeout: 30,
			});

			const response = await sqsClient.send(command);

			if (response.Messages && response.Messages.length > 0) {
				for (const message of response.Messages) {
					const body = JSON.parse(message.Body!);
					log.info("📩 Mensagem recebida:", body);

					try {
						await sendEmail(body.to, body.subject, body.html);

						const deleteCommand = new DeleteMessageCommand({
							QueueUrl: env.EMAIL_SERVICE_QUEUE_URL,
							ReceiptHandle: message.ReceiptHandle!,
						});

						await sqsClient.send(deleteCommand);
						log.success(
							`🗑️ Mensagem ${message.MessageId} processada e removida.`,
						);
					} catch (err) {
						log.warn(
							`⚠️ Falha ao processar mensagem ${message.MessageId}, mantendo na fila.`,
						);
					}
				}
			} else {
				log.info("⏳ Nenhuma mensagem na fila.");
			}
		} catch (error) {
			log.error("❌ Erro ao consultar mensagens:", error);
		}
	}
};

log.info("🚀 Iniciando consumidor de e-mail...");
startPolling();
