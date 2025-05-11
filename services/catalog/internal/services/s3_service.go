package services

import (
	"bytes"
	"context"
	"encoding/base64"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gofiber/fiber/v2"
	"github.com/nferreira1/PI-5-SEM/services/catalog/internal/configs"
)

func UploadImageToS3(ctx context.Context, base64Image string) (string, error) {

	env := configs.GetEnv()

	endpoint := env.AwsS3Endpoint
	region := env.AwsDefaultRegion
	bucket := env.AwsBucket
	creds := credentials.NewStaticCredentialsProvider(
		env.AwsAccessKeyId,
		env.AwsSecretAccessKey,
		"",
	)

	parts := strings.SplitN(base64Image, ",", 2)
	raw := base64Image
	if len(parts) == 2 {
		raw = parts[1]
	}
	data, err := base64.StdEncoding.DecodeString(raw)
	if err != nil {
		return "", fiber.NewError(fiber.StatusInternalServerError, "erro ao decodificar imagem")
	}

	cfg, err := config.LoadDefaultConfig(ctx,
		config.WithRegion(region),
		config.WithCredentialsProvider(creds),
		config.WithEndpointResolver(aws.EndpointResolverFunc(func(service, rgn string) (aws.Endpoint, error) {
			if service == s3.ServiceID {
				return aws.Endpoint{
					URL:               endpoint,
					SigningRegion:     region,
					HostnameImmutable: true,
				}, nil
			}
			return aws.Endpoint{}, &aws.EndpointNotFoundError{}
		})),
	)
	if err != nil {
		return "", fiber.NewError(fiber.StatusInternalServerError, "falha ao carregar configuração AWS/LocalStack")
	}

	client := s3.NewFromConfig(cfg, func(o *s3.Options) {
		o.UsePathStyle = true
	})

	contentType := "image/png"
	if len(data) >= 3 && data[0] == 0xFF && data[1] == 0xD8 && data[2] == 0xFF {
		contentType = "image/jpeg"
	}

	key := fmt.Sprintf("%d", time.Now().UnixNano())
	_, err = client.PutObject(ctx, &s3.PutObjectInput{
		Bucket:      aws.String(bucket),
		Key:         aws.String(key),
		Body:        bytes.NewReader(data),
		ContentType: aws.String(contentType),
	})
	if err != nil {
		log.Printf("falha no PutObject: %v", err)
		return "", fiber.NewError(fiber.StatusInternalServerError, "erro ao fazer upload da imagem")
	}

	url := fmt.Sprintf("%s/%s/%s", strings.TrimSuffix(endpoint, "/"), bucket, key)
	return url, nil
}
