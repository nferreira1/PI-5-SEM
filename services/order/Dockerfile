FROM eclipse-temurin:17-jdk-alpine AS builder

WORKDIR /app

ARG JAVA_ENV
ENV JAVA_ENV=${JAVA_ENV}

COPY services/order . 

RUN chmod +x ./mvnw

RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

COPY keys /app/keys

EXPOSE 8080

ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar --spring.profiles.active=${JAVA_ENV}"]
