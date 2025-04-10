package services

import (
	"bytes"
	"context"
	"encoding/base64"
	"fmt"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gofiber/fiber/v2"
	"github.com/nferreira1/PI-5-SEM/services/product/internal/configs"
)

func UploadImageToS3(ctx context.Context, base64Image string) (string, error) {

	env := configs.GetEnv()

	data, err := base64.StdEncoding.DecodeString(base64Image)
	if err != nil {
		return "", fiber.NewError(fiber.StatusInternalServerError, "Erro ao decodificar a imagem")
	}

	cfg, err := config.LoadDefaultConfig(ctx,
		config.WithBaseEndpoint(env.AwsS3Endpoint),
		config.WithRegion(env.AwsDefaultRegion),
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(env.AwsAccessKeyId, env.AwsSecretAccessKey, "")),
	)
	if err != nil {
		return "", fiber.NewError(fiber.StatusInternalServerError, "Erro ao carregar configuração AWS")
	}

	client := s3.NewFromConfig(cfg)

	key := fmt.Sprintf("%d.jpg", time.Now().UnixNano())

	input := &s3.PutObjectInput{
		Bucket: aws.String(env.AwsBucket),
		Key:    aws.String(key),
		Body:   bytes.NewReader(data),
	}

	_, err = client.PutObject(ctx, input)
	if err != nil {
		print(err.Error())
		return "", fiber.NewError(fiber.StatusInternalServerError, "Erro ao fazer upload da imagem")
	}

	url := ""

	if env.GoEnv == "development" {
		url = fmt.Sprintf("%s/%s/%s", env.AwsS3Endpoint, env.AwsBucket, key)

		return url, nil
	}

	url = fmt.Sprintf("https://%s.s3.amazonaws.com/%s", env.AwsBucket, key)

	return url, nil
}
