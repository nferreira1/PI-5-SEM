package controllers

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"github.com/jinzhu/copier"
	"github.com/nferreira1/PI-5-SEM/services/catalog/internal/models"
	"github.com/nferreira1/PI-5-SEM/services/catalog/internal/services"
)

type ProductController struct {
	service services.ProductService
}

func NewProductController(productService services.ProductService) *ProductController {
	return &ProductController{service: productService}
}

// PostProduct godoc
// @Summary Create a new product
// @Tags Products
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param product body models.ProductRequest true "Product data"
// @Success 201 {object} models.ProductRequest
// @Failure 400 {object} exceptions.ErrorResponseException
// @Failure 404 {object} exceptions.ErrorResponseException
// @Failure 500 {object} exceptions.ErrorResponseException
// @Router /product [post]
func (pc *ProductController) Post(c *fiber.Ctx) error {
	productReq := new(models.ProductRequest)

	if err := c.BodyParser(productReq); err != nil {
		return err
	}

	if err := productReq.Validate(); err != nil {
		return err
	}

	product := models.Product{}
	if err := copier.Copy(&product, productReq); err != nil {
		return err
	}

	ctx := context.Background()

	var uploadedImages []models.ProductImages
	for _, imgReq := range productReq.Images {
		url, err := services.UploadImageToS3(ctx, imgReq.Base64)
		if err != nil {
			return err
		}

		uploadedImages = append(uploadedImages, models.ProductImages{
			Url:       url,
			Principal: imgReq.Principal,
		})
	}
	product.Images = uploadedImages

	if err := pc.service.Create(&product); err != nil {
		return err
	}

	return c.Status(fiber.StatusCreated).JSON(product)
}

// GetProduct godoc
// @Summary Get a product by ID
// @Tags Products
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param productId path string true "Product ID"
// @Success 200 {object} models.Product
// @Failure 400 {object} exceptions.ErrorResponseException
// @Failure 404 {object} exceptions.ErrorResponseException
// @Failure 500 {object} exceptions.ErrorResponseException
// @Router /product/{productId} [get]
func (pc *ProductController) Get(c *fiber.Ctx) error {
	productId := c.Params("productId")

	product, err := pc.service.GetById(productId)

	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, "Produto não encontrado.")
	}

	return c.JSON(product)
}

// GetProducts godoc
// @Summary Get all products
// @Tags Products
// @Accept json
// @Produce json
// @Security BearerAuth
// @Success 200 {array} models.Product
// @Failure 400 {object} exceptions.ErrorResponseException
// @Failure 500 {object} exceptions.ErrorResponseException
// @Router /product [get]
func (pc *ProductController) GetAll(c *fiber.Ctx) error {
	products, err := pc.service.GetAll()

	if err != nil {
		return err
	}

	return c.JSON(products)
}
