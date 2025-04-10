package models

import (
	"time"

	"github.com/go-ozzo/ozzo-validation/is"
	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/google/uuid"
)

type ProductImagesRequest struct {
	Base64    string `json:"base64"`
	Principal bool   `json:"principal"`
}

type ProductImages struct {
	ProductImageId int       `gorm:"primaryKey;autoIncrement" json:"productImageId"`
	Url            string    `gorm:"type:text;not null" json:"url"`
	Principal      bool      `gorm:"not null" json:"principal"`
	CreatedAt      time.Time `gorm:"autoCreateTime" json:"createdAt"`
	ProductId      uuid.UUID `gorm:"type:uuid;not null" json:"productId"`
}

func (pi ProductImagesRequest) Validate() error {
	return validation.ValidateStruct(&pi,
		validation.Field(&pi.Base64,
			validation.Required.Error("A imagem é obrigatória."),
			is.Base64.Error("A imagem é inválida."),
		),
	)
}
