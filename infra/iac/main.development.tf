provider "aws" {
  region                      = var.AWS_DEFAULT_REGION
  access_key                  = var.AWS_ACCESS_KEY_ID
  secret_key                  = var.AWS_SECRET_ACCESS_KEY
  skip_credentials_validation = true
  skip_requesting_account_id  = true

  endpoints {
    sqs = "http://aws:4566"
  }
}

resource "aws_sqs_queue" "sqs" {
  name = var.EMAIL_SERVICE_QUEUE_NAME
}

output "sqs_queue_url" {
  value = aws_sqs_queue.sqs.url
}
