package main

import (
	"log"
	"os"

	"github.com/nferreira1/PI-5-SEM/services/catalog/internal/configs"
	"github.com/nferreira1/PI-5-SEM/services/catalog/internal/routers"
)

//go:generate swag init --output ./docs --parseDependency

// @title Catalog API
// @version 1.0
// @description API for the catalog management.
// @host localhost:8081
// @BasePath /catalog
// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
func main() {
	if os.Getenv("GO_ENV") != "production" && os.Getenv("GO_ENV") != "production.local" {
		configs.LoadEnvFile("../../.env.development")
	} else {
		log.Println("Rodando em produção, utilizando as variáveis de ambiente já definidas")
	}

	configs.LoadORMConfig()
	routers.Initialize()
}
