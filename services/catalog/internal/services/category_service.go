package services

import (
	"github.com/nferreira1/PI-5-SEM/services/catalog/internal/models"
	"github.com/nferreira1/PI-5-SEM/services/catalog/internal/repositories"
)

type CategoryService interface {
	Create(category *models.Category) error
	GetById(categoryId string) (*models.Category, error)
	GetAll() ([]models.Category, error)
	Update(category *models.Category) error
	Delete(categoryId string) error
}

type categoryService struct {
	repo repositories.CategoryRepository
}

func NewCategoryService(repo repositories.CategoryRepository) CategoryService {
	return &categoryService{repo: repo}
}

func (cs *categoryService) Create(category *models.Category) error {
	return cs.repo.Create(category)
}

func (cs *categoryService) GetById(categoryId string) (*models.Category, error) {
	return cs.repo.GetById(categoryId)
}

func (cs *categoryService) GetAll() ([]models.Category, error) {
	return cs.repo.GetAll()
}

func (cs *categoryService) Update(category *models.Category) error {
	return cs.repo.Update(category)
}

func (cs *categoryService) Delete(categoryId string) error {
	return cs.repo.Delete(categoryId)
}
