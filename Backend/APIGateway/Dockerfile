# المرحلة الأولى: بناء الكود باستخدام الـ Wrapper اللي عندك
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

# نسخ ملفات الـ Maven Wrapper من الفولدر بتاعك
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
# نسخ الكود المصدري
COPY src ./src

# تحويل الـ mvnw لملف قابل للتنفيذ وتشغيله (البناء هيحصل على الـ D)
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# المرحلة الثانية: التشغيل (النسخة الخفيفة)
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

# بناخد ملف الـ JAR اللي اتكريه في المرحلة اللي فوق (build)
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

# أمر التشغيل مع الـ sleep اللي أنت عايزه
ENTRYPOINT ["sh", "-c", "sleep 25 && java -jar app.jar"]