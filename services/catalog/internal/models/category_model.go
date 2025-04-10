package models

import (
	"time"

	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CategoryRequest struct {
	Name   string `json:"name"`
	Base64 string `json:"base64"`
}

type CategoryResponse struct {
	CategoryId uuid.UUID `json:"categoryId"`
	Name       string    `json:"name"`
	Url        string    `json:"url"`
	CreatedAt  time.Time `json:"createdAt"`
	UpdatedAt  time.Time `json:"updatedAt"`
}

type Category struct {
	CategoryId uuid.UUID `gorm:"type:uuid;primaryKey" json:"categoryId"`
	Name       string    `gorm:"size:100;not null" json:"name"`
	Url        string    `gorm:"type:text;not null" json:"url"`
	CreatedAt  time.Time `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt  time.Time `gorm:"autoUpdateTime" json:"updatedAt"`
	Products   []Product `gorm:"foreignKey:CategoryId" json:"products"`
}

func (c *Category) BeforeCreate(tx *gorm.DB) (err error) {
	c.CategoryId = uuid.New()
	return
}

func (c CategoryRequest) Validate() error {
	return validation.ValidateStruct(&c,
		validation.Field(&c.Name,
			validation.Required.Error("O nome da categoria não pode ser nulo nem vazio."),
			validation.Length(3, 100).Error("O nome da categoria deve ter entre 3 e 100 caracteres."),
		),
	)
}
