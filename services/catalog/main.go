package main

import (
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
	configs.LoadEnvFile("../../.env.development")
	configs.LoadORMConfig()
	routers.Initialize()
}
