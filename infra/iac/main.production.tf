resource "aws_s3_bucket" "bucket_terraform" {
  bucket = "${var.AWS_DEFAULT_REGION}-bucket-terraform"
}

resource "aws_s3_bucket" "bucket_catalog_images" {
  bucket = "${var.AWS_DEFAULT_REGION}-bucket-catalog-images"
}

resource "aws_s3_bucket_public_access_block" "bucket_catalog_images" {
  bucket                  = aws_s3_bucket.bucket_catalog_images.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "bucket_catalog_images_policy" {
  bucket = aws_s3_bucket.bucket_catalog_images.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.bucket_catalog_images.arn}/*"
      }
    ]
  })
}

resource "aws_sqs_queue" "sqs" {
  name = var.EMAIL_SERVICE_QUEUE_NAME
}

output "sqs_queue_url" {
  value = aws_sqs_queue.sqs.url
}

output "bucket_terraform" {
  value = aws_s3_bucket.bucket_terraform.id
}

output "bucket_catalog_images" {
  value = aws_s3_bucket.bucket_catalog_images.id
}
