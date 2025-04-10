package exceptions

import (
	"errors"
	"fmt"

	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/gofiber/fiber/v2"
)

func ErrorHandler(c *fiber.Ctx, err error) error {
	code := fiber.StatusInternalServerError

	if e, ok := err.(*fiber.Error); ok {
		code = e.Code
	}

	var vErrs validation.Errors
	if errors.As(err, &vErrs) {
		var errs []Error
		for field, ferr := range vErrs {
			errs = append(errs, Error{
				Field:   field,
				Message: ferr.Error(),
			})
		}
		resp := ErrorResponseException{
			Status:  fiber.StatusBadRequest,
		Message: "Parâmetros inválidos",
			Errors:  errs,
		}
		return c.Status(fiber.StatusBadRequest).JSON(resp)
	}

	resp := ErrorResponseException{
		Status:  code,
		Message: fmt.Sprintf("%v", err),
		Errors:  []Error{},
	}
	return c.Status(code).JSON(resp)
}
