import { env } from "@/env";
import * as amqp from "amqplib";
import * as nodemailer from "nodemailer";

const RABBITMQ_URL = `amqp://${env.RABBITMQ_USER}:${env.RABBITMQ_PASS}@${env.RABBITMQ_HOST}:5672`;
const QUEUE_NAME = "email_queue";

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: env.EMAIL_USER,
		pass: env.EMAIL_PASS,
	},
});

async function startConsumer() {
	const connection = await amqp.connect(RABBITMQ_URL);
	const channel = await connection.createChannel();
	await channel.assertQueue(QUEUE_NAME, { durable: true });

	console.log(
		"✅ Email consumer is now running and listening for messages...",
	);

	channel.consume(QUEUE_NAME, async (msg) => {
		if (msg) {
			const emailData = JSON.parse(msg.content.toString());

			console.log("📧 Sending email to:", emailData.to);

			try {
				await transporter.sendMail({
					from: `Techcommerce <${env.EMAIL_USER}>`,
					to: emailData.to,
					subject: emailData.subject,
					text: emailData.text,
				});

				console.log("✅ Email successfully sent!");
				channel.ack(msg);
			} catch (error) {
				console.error("❌ Error sending email:", error);
			}
		}
	});
}

startConsumer().catch(console.error);
