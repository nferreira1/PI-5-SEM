package routers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/nferreira1/PI-5-SEM/services/product/internal/configs"
	"github.com/nferreira1/PI-5-SEM/services/product/internal/controllers"
	"github.com/nferreira1/PI-5-SEM/services/product/internal/exceptions"
	"github.com/nferreira1/PI-5-SEM/services/product/internal/repositories"
	"github.com/nferreira1/PI-5-SEM/services/product/internal/services"
)

func Initialize() {
	app := fiber.New(fiber.Config{
		ErrorHandler: exceptions.ErrorHandler,
	})

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,PUT,DELETE",
	}))

	productRepo := repositories.NewProductRepository(configs.DB)
	productService := services.NewProductService(productRepo)
	productController := controllers.NewProductController(productService)

	products := app.Group("/product")
	{
		products.Get("/api-docs", func(c *fiber.Ctx) error {
			return c.SendFile("./docs/swagger.json")
		})
		products.Get("/", productController.GetAll)
		products.Post("/", productController.Post)
		products.Get("/:productId", productController.Get)
		products.Put("/:productId", productController.Update)
		products.Delete("/:productId", productController.Delete)

	}

	app.Listen(":8081")
}
