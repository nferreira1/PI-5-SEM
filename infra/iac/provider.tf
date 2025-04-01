provider "aws" {
  region                      = var.AWS_DEFAULT_REGION
  access_key                  = var.AWS_ACCESS_KEY_ID
  secret_key                  = var.AWS_SECRET_ACCESS_KEY
  skip_credentials_validation = true
  skip_requesting_account_id  = true
  s3_use_path_style           = true

  endpoints {
    sqs = var.AWS_ENDPOINT != null ? var.AWS_ENDPOINT : null
    s3  = var.AWS_ENDPOINT != null ? var.AWS_ENDPOINT : null
  }
}