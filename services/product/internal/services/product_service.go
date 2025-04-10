package services

import (
	"github.com/nferreira1/PI-5-SEM/services/product/internal/models"
	"github.com/nferreira1/PI-5-SEM/services/product/internal/repositories"
)

type ProductService interface {
	CreateProduct(product *models.Product) error
	GetProduct(id string) (*models.Product, error)
	GetProducts() ([]models.Product, error)
	UpdateProduct(product *models.Product) error
	DeleteProduct(id string) error
}

type productService struct {
	repo repositories.ProductRepository
}

func NewProductService(repo repositories.ProductRepository) ProductService {
	return &productService{repo: repo}
}

func (ps *productService) CreateProduct(product *models.Product) error {
	return ps.repo.Create(product)
}

func (ps *productService) GetProduct(id string) (*models.Product, error) {
	return ps.repo.GetByID(id)
}

func (ps *productService) GetProducts() ([]models.Product, error) {
	return ps.repo.GetAll()
}

func (ps *productService) UpdateProduct(product *models.Product) error {
	return ps.repo.Update(product)
}

func (ps *productService) DeleteProduct(id string) error {
	return ps.repo.Delete(id)
}
