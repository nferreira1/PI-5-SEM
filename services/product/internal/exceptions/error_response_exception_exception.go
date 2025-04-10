package exceptions

type Error struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}

type ErrorResponseException struct {
	Status  int     `json:"status"`
	Message string  `json:"message"`
	Errors  []Error `json:"errors"`
}

// Error implements error.
func (e ErrorResponseException) Error() string {
	panic("unimplemented")
}
