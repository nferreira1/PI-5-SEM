FROM golang:1.24 AS builder

WORKDIR /app

COPY services/catalog/ .

RUN go mod download

ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64
RUN go build -ldflags="-s -w" -o catalog-service .

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/catalog-service .

EXPOSE 8081

ENTRYPOINT ["/app/catalog-service"]
