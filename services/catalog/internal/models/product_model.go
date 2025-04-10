package models

import (
	"time"

	"github.com/go-ozzo/ozzo-validation/is"
	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ProductRequest struct {
	Status      bool                   `json:"status"`
	Name        string                 `json:"name"`
	Description string                 `json:"description"`
	Price       float64                `json:"price"`
	CategoryId  string                 `json:"categoryId"`
	Stock       int                    `json:"stock"`
	Images      []ProductImagesRequest `json:"images"`
}

type Product struct {
	ProductId   uuid.UUID       `gorm:"type:uuid;primaryKey" json:"productId"`
	Status      bool            `gorm:"default:true; not null" json:"status"`
	Name        string          `gorm:"size:100;not null" json:"name"`
	Description string          `gorm:"size:500" json:"description"`
	Price       float64         `gorm:"not null" json:"price"`
	Stock       int             `gorm:"not null" json:"stock"`
	CreatedAt   time.Time       `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt   time.Time       `gorm:"autoUpdateTime" json:"updatedAt"`
	Images      []ProductImages `gorm:"foreignKey:ProductId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"images"`
	CategoryId  uuid.UUID       `gorm:"type:uuid;not null" json:"categoryId"`
}

func (p *Product) BeforeCreate(tx *gorm.DB) (err error) {
	p.ProductId = uuid.New()
	return
}

func (pr ProductRequest) Validate() error {
	return validation.ValidateStruct(&pr,
		validation.Field(&pr.Status,
			validation.Required.Error("O status é obrigatório."),
			validation.In(true, false).Error("O status deve ser verdadeiro ou falso."),
		),
		validation.Field(&pr.Name,
			validation.Required.Error("O nome do produto não pode ser nulo nem vazio."),
			validation.Length(3, 100).Error("O nome do produto deve ter entre 3 e 100 caracteres."),
		),
		validation.Field(&pr.Description,
			validation.Length(0, 500).Error("A descrição deve conter no máximo 500 caracteres."),
		),
		validation.Field(&pr.Price,
			validation.Required.Error("O preço é obrigatório."),
			validation.Min(0.01).Error("O preço deve ser maior que 0."),
		),
		validation.Field(&pr.CategoryId,
			validation.Required.Error("A categoria é obrigatória."),
		),
		validation.Field(&pr.Stock,
			validation.Required.Error("O estoque é obrigatório."),
			validation.Min(1).Error("O estoque deve ser maior que 0."),
		),
		validation.Field(&pr.Images,
			validation.Each(validation.By(func(value any) error {
				img := value.(ProductImagesRequest)
				return validation.Validate(img.Base64, validation.Required.Error("A imagem é obrigatória."), is.Base64.Error("A imagem é inválida."))
			})),
		),
	)
}
