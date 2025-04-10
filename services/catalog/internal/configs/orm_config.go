package configs

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nferreira1/PI-5-SEM/services/catalog/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func LoadORMConfig() error {

	env := GetEnv()
	dsn := ""

	if env.GoEnv == "development" {
		dsn = "host=localhost user=postgres password=postgres dbname=product_service_db_test port=5432 sslmode=disable TimeZone=UTC"
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
