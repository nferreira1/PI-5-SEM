package controllers

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"github.com/jinzhu/copier"
	"github.com/nferreira1/PI-5-SEM/services/catalog/internal/models"
	"github.com/nferreira1/PI-5-SEM/services/catalog/internal/services"
)

type CategoryController struct {
	service services.CategoryService
}

func NewCategoryController(categoryService services.CategoryService) *CategoryController {
	return &CategoryController{service: categoryService}
}

// PostCategory godoc
// @Summary Create a new category
// @Tags Categories
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param category body models.CategoryRequest true "Category data"
// @Success 201 {object} models.CategoryResponse
// @Failure 400 {object} exceptions.ErrorResponseException
// @Failure 404 {object} exceptions.ErrorResponseException
// @Failure 500 {object} exceptions.ErrorResponseException
// @Router /category [post]
func (cc *CategoryController) Post(c *fiber.Ctx) error {
	categoryReq := new(models.CategoryRequest)

	if err := c.BodyParser(categoryReq); err != nil {
		return err
	}

	if err := categoryReq.Validate(); err != nil {
		return err
	}

	categoryRes := models.CategoryResponse{}
	if err := copier.Copy(&categoryRes, categoryReq); err != nil {
		return err
	}

	category := models.Category{}
	if err := copier.Copy(&category, categoryReq); err != nil {
		return err
	}
	category.Products = nil

	ctx := context.Background()
	url, err := services.UploadImageToS3(ctx, categoryReq.Base64)
	if err != nil {
		return err
	}

	category.Url = url

	if err := cc.service.Create(&category); err != nil {
		return err
	}

	if err := copier.Copy(&categoryRes, &category); err != nil {
		return err
	}

	return c.Status(fiber.StatusCreated).JSON(categoryRes)
}

// GetCategory godoc
// @Summary Get a category by ID
// @Tags Categories
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param categoryId path string true "Category ID"
// @Success 200 {object} models.CategoryResponse
// @Failure 400 {object} exceptions.ErrorResponseException
// @Failure 404 {object} exceptions.ErrorResponseException
// @Failure 500 {object} exceptions.ErrorResponseException
// @Router /category/{categoryId} [get]
func (cc *CategoryController) Get(c *fiber.Ctx) error {
	categoryId := c.Params("categoryId")

	category, err := cc.service.GetById(categoryId)

	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, "Categoria não encontrada.")
	}

	categoryRes := models.CategoryResponse{}
	if err := copier.Copy(&categoryRes, category); err != nil {
		return err
	}

	return c.JSON(categoryRes)
}

// GetByCategoryId godoc
// @Summary Get all products by category ID
// @Tags Categories
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param categoryId path string true "Category ID"
// @Success 200 {array} models.Product
// @Failure 400 {object} exceptions.ErrorResponseException
// @Failure 404 {object} exceptions.ErrorResponseException
// @Failure 500 {object} exceptions.ErrorResponseException
// @Router /category/{categoryId}/products [get]
func (cc *CategoryController) GetByCategoryId(c *fiber.Ctx) error {
	categoryId := c.Params("categoryId")

	products, err := cc.service.GetByCategoryId(categoryId)
	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, "Produtos não encontrados para esta categoria.")
	}

	return c.JSON(products)
}

// GetCategories godoc
// @Summary Get all categories
// @Tags Categories
// @Accept json
// @Produce json
// @Security BearerAuth
// @Success 200 {array} models.CategoryResponse
// @Failure 400 {object} exceptions.ErrorResponseException
// @Failure 500 {object} exceptions.ErrorResponseException
// @Router /category [get]
func (cc *CategoryController) GetAll(c *fiber.Ctx) error {
	categories, err := cc.service.GetAll()

	categoriesRes := []models.CategoryResponse{}
	if err := copier.Copy(&categoriesRes, categories); err != nil {
		return err
	}

	if err != nil {
		return err
	}

	return c.JSON(categoriesRes)
}
