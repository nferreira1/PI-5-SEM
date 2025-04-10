package repositories

import (
	"github.com/nferreira1/PI-5-SEM/services/product/internal/models"
	"gorm.io/gorm"
)

type ProductRepository interface {
	Create(product *models.Product) error
	GetByID(id string) (*models.Product, error)
	GetAll() ([]models.Product, error)
	Update(product *models.Product) error
	Delete(id string) error
}

type productRepository struct {
	db *gorm.DB
}

func NewProductRepository(db *gorm.DB) ProductRepository {
	return &productRepository{db: db}
}

func (pr *productRepository) Create(product *models.Product) error {
	return pr.db.Create(product).Error
}

func (pr *productRepository) GetByID(id string) (*models.Product, error) {
	var product models.Product

	if err := pr.db.Preload("Images").First(&product, "product_id = ?", id).Error; err != nil {
		return nil, err
	}

	return &product, nil
}

func (pr *productRepository) GetAll() ([]models.Product, error) {
	var products []models.Product

	if err := pr.db.Preload("Images").Find(&products).Error; err != nil {
		return nil, err
	}

	return products, nil
}

func (pr *productRepository) Update(product *models.Product) error {
	return pr.db.Save(product).Error
}

func (pr *productRepository) Delete(id string) error {
	return pr.db.Delete(&models.Product{}, "product_id = ?", id).Error
}
