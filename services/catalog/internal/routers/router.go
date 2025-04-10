package routers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/nferreira1/PI-5-SEM/services/catalog/internal/configs"
	"github.com/nferreira1/PI-5-SEM/services/catalog/internal/controllers"
	"github.com/nferreira1/PI-5-SEM/services/catalog/internal/exceptions"
	"github.com/nferreira1/PI-5-SEM/services/catalog/internal/repositories"
	"github.com/nferreira1/PI-5-SEM/services/catalog/internal/services"
)

func Initialize() {

	app := fiber.New(fiber.Config{
		ErrorHandler: exceptions.ErrorHandler,
	})

	app.Use(
		cors.New(cors.Config{
			AllowOrigins: "*",
			AllowMethods: "GET,POST,PUT,DELETE",
		}),
	)

	categoryRepo := repositories.NewCategoryRepository(configs.DB)
	categoryService := services.NewCategoryService(categoryRepo)
	categoryController := controllers.NewCategoryController(categoryService)

	productRepo := repositories.NewProductRepository(configs.DB)
	productService := services.NewProductService(productRepo)
	productController := controllers.NewProductController(productService)

	catalog := app.Group("/catalog")
	{
		catalog.Get("/api-docs", func(c *fiber.Ctx) error {
			return c.SendFile("./docs/swagger.json")
		})

		categories := catalog.Group("/category")
		{
			categories.Get("/", categoryController.GetAll)
			categories.Post("/", categoryController.Post)
			categories.Get("/:categoryId", categoryController.Get)
			// categories.Put("/:categoryId", categoryController.Update)
			// categories.Delete("/:categoryId", categoryController.Delete)
		}

		products := catalog.Group("/product")
		{
			products.Get("/", productController.GetAll)
			products.Post("/", productController.Post)
			products.Get("/:productId", productController.Get)
			products.Put("/:productId", productController.Update)
			products.Delete("/:productId", productController.Delete)

		}
	}

	app.Listen(":8081")
}
