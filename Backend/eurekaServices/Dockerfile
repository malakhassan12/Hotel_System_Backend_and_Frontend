# المرحلة الأولى: البناء (باستخدام الـ Wrapper بتاعك جوه الـ D)
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

# نسخ ملفات الـ Maven Wrapper اللي موجودة في فولدر eurekaServices
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
# نسخ كود الـ Eureka
COPY src ./src

# تحويل الـ mvnw لملف قابل للتنفيذ وبناء الـ JAR
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# المرحلة الثانية: التشغيل
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

# سحب ملف الـ JAR اللي اتبنى في المرحلة الأولى
COPY --from=build /app/target/eurekaServices-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8761

# يفضل في اليوريكا ميكونش فيه sleep لأنها أول خدمة لازم تقوم
ENTRYPOINT ["java", "-jar", "app.jar"]