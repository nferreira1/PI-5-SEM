package configs

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"reflect"
	"strings"
	"sync"

	"github.com/joho/godotenv"
)

var (
	env      *Environment
	envOnce  sync.Once
	BuildEnv string
)

type EnvVar struct {
	Name     string
	Required bool
}

type Environment struct {
	GoEnv              string `env:"GO_ENV"`
	CatalogDbUser      string `env:"CATALOG_DB_USER"`
	CatalogDbPass      string `env:"CATALOG_DB_PASS"`
	CatalogDbName      string `env:"CATALOG_DB_NAME"`
	AwsDefaultRegion   string `env:"AWS_DEFAULT_REGION"`
	AwsAccessKeyId     string `env:"AWS_ACCESS_KEY_ID"`
	AwsSecretAccessKey string `env:"AWS_SECRET_ACCESS_KEY"`
	AwsS3Endpoint      string `env:"AWS_S3_ENDPOINT"`
	AwsBucket          string `env:"AWS_BUCKET_NAME_PRODUCTS_IMAGES"`
}

func GetEnv() *Environment {
	envOnce.Do(func() {
		var err error
		env, err = loadEnv()
		if err != nil {
			log.Fatal(err)
		}

		if BuildEnv != "" {
			env.GoEnv = BuildEnv
		} else if env.GoEnv == "" {
			env.GoEnv = "development"
		}
	})
	return env
}

func loadEnv() (*Environment, error) {
	env := &Environment{}
	v := reflect.ValueOf(env).Elem()
	t := v.Type()

	var missingVars []string

	for i := range t.NumField() {
		field := t.Field(i)
		tag := field.Tag.Get("env")

		if tag == "" {
			continue
		}

		parts := splitTag(tag)
		name := parts[0]
		required := len(parts) > 1 && parts[1] == "required"

		value := os.Getenv(name)
		if required && value == "" {
			missingVars = append(missingVars, name)
		}

		v.Field(i).SetString(value)
	}

	if len(missingVars) > 0 {
		return nil, fmt.Errorf("missing required environment variables: \n%s", strings.Join(missingVars, "\n"))
	}
	return env, nil
}

func LoadEnvFile(relativePath string) {
	absPath, err := filepath.Abs(relativePath)
	if err != nil {
		log.Fatalf("Error resolving .env file path: %v", err)
	}

	err = godotenv.Load(absPath)
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
}

func splitTag(tag string) []string {
	result := []string{}
	current := ""
	for _, char := range tag {
		if char == ',' {
			result = append(result, current)
			current = ""
		} else {
			current += string(char)
		}
	}
	result = append(result, current)
	return result
}
