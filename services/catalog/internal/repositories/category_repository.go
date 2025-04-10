package repositories

import (
	"github.com/nferreira1/PI-5-SEM/services/catalog/internal/models"
	"gorm.io/gorm"
)

type CategoryRepository interface {
	Create(category *models.Category) error
	GetById(categoryId string) (*models.Category, error)
	GetByCategoryId(categoryId string) (*[]models.Product, error)
	GetAll() ([]models.Category, error)
	Update(category *models.Category) error
	Delete(categoryId string) error
}

type categoryRepository struct {
	db *gorm.DB
}

func NewCategoryRepository(db *gorm.DB) CategoryRepository {
	return &categoryRepository{db: db}
}

func (cr *categoryRepository) Create(category *models.Category) error {
	return cr.db.Create(category).Error
}

func (cr *categoryRepository) GetById(categoryId string) (*models.Category, error) {
	var category models.Category

	if err := cr.db.First(&category, "category_id = ?", categoryId).Error; err != nil {
		return nil, err
	}

	return &category, nil
}

func (cr *categoryRepository) GetByCategoryId(categoryId string) (*[]models.Product, error) {
	var products []models.Product

	if err := cr.db.Preload("Images").Where("category_id = ?", categoryId).Find(&products).Error; err != nil {
		return nil, err
	}

	return &products, nil
}

func (cr *categoryRepository) GetAll() ([]models.Category, error) {
	var categories []models.Category

	if err := cr.db.Find(&categories).Error; err != nil {
		return nil, err
	}

	return categories, nil
}

func (cr *categoryRepository) Update(category *models.Category) error {
	return cr.db.Save(category).Error
}

func (cr *categoryRepository) Delete(categoryId string) error {
	return cr.db.Delete(&models.Category{}, "category_id = ?", categoryId).Error
}
