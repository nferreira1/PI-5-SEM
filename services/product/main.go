package main

import (
	"github.com/nferreira1/PI-5-SEM/services/product/internal/configs"
	"github.com/nferreira1/PI-5-SEM/services/product/internal/routers"
)

//go:generate swag init --output ./docs --parseDependency

// @title Catalog API
// @version 1.0
// @description API for the catalog management.
// @host localhost:8081
// @BasePath /
// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
func main() {
	configs.LoadEnvFile("../../.env.development")
	configs.LoadORMConfig()
	routers.Initialize()
}
