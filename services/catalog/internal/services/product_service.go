package services

import (
	"github.com/nferreira1/PI-5-SEM/services/catalog/internal/models"
	"github.com/nferreira1/PI-5-SEM/services/catalog/internal/repositories"
)

type ProductService interface {
	Create(product *models.Product) error
	GetById(productId string) (*models.Product, error)
	GetAll() ([]models.Product, error)
	Update(product *models.Product) error
	Delete(productId string) error
}

type productService struct {
	repo repositories.ProductRepository
}

func NewProductService(repo repositories.ProductRepository) ProductService {
	return &productService{repo: repo}
}

func (ps *productService) Create(product *models.Product) error {
	return ps.repo.Create(product)
}

func (ps *productService) GetById(productId string) (*models.Product, error) {
	return ps.repo.GetById(productId)
}

func (ps *productService) GetAll() ([]models.Product, error) {
	return ps.repo.GetAll()
}

func (ps *productService) Update(product *models.Product) error {
	return ps.repo.Update(product)
}

func (ps *productService) Delete(productId string) error {
	return ps.repo.Delete(productId)
}
