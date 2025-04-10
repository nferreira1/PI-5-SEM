package models

import (
	"time"

	"github.com/go-ozzo/ozzo-validation/is"
	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CategoryRequest struct {
	Name   string `json:"name"`
	Base64 string `json:"base64"`
	Status bool   `json:"status"`
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
	Status     bool      `gorm:"default:true; not null" json:"status"`
	CreatedAt  time.Time `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt  time.Time `gorm:"autoUpdateTime" json:"updatedAt"`
	Products   []Product `gorm:"foreignKey:CategoryId" json:"products"`
}

func (c *Category) BeforeCreate(tx *gorm.DB) (err error) {
	c.CategoryId = uuid.New()
	return
}

func (cr CategoryRequest) Validate() error {
	return validation.ValidateStruct(&cr,
		validation.Field(&cr.Name,
			validation.Required.Error("O nome da categoria não pode ser nulo nem vazio."),
			validation.Length(3, 100).Error("O nome da categoria deve ter entre 3 e 100 caracteres."),
		),
		validation.Field(&cr.Base64,
			validation.Required.Error("A imagem é obrigatória."),
			is.Base64.Error("A imagem é inválida."),
		),
		validation.Field(&cr.Status,
			validation.Required.Error("O status é obrigatório."),
			validation.In(true, false).Error("O status deve ser verdadeiro ou falso."),
		),
	)
}
