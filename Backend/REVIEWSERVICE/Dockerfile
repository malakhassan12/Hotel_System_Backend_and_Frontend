FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
COPY src ./src
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
COPY --from=build /app/target/REVIEWSERVICE-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8084
ENTRYPOINT ["sh", "-c", "sleep 25 && java -jar app.jar"]