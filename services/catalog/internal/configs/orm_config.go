package configs

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/nferreira1/PI-5-SEM/services/catalog/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func LoadORMConfig() error {

	env := GetEnv()
	dsn := ""

	print(env.GoEnv)

	if env.GoEnv == "development" {
		dsn = "host=localhost user=postgres password=postgres dbname=catalog_service_db_test port=5432 sslmode=disable TimeZone=UTC"
	}

	if env.GoEnv == "production.local" {
		dsn = fmt.Sprintf("host=%s user=%s password=%s dbname=%s sslmode=disable TimeZone=UTC",
			"catalog-db", env.CatalogDbUser, env.CatalogDbPass, env.CatalogDbName)
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Ocorreu um erro inesperado ao conectar com o banco de dados!")
	}

	if err := db.AutoMigrate(models.Category{}, models.Product{}, models.ProductImages{}); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Falha ao migrar o banco de dados!")
	}

	DB = db.Session(&gorm.Session{FullSaveAssociations: true})

	return nil
}
