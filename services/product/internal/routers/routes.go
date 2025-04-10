package routers

import (
	"github.com/gofiber/fiber/v2"
)

func initializeRoutes(router *fiber.App)  {

	app := router.Group("/products")
	{
		app.Get("/", func(c *fiber.Ctx) error {
			return c.SendString("Hello, World!")
		})
	}


}