# المرحلة الأولى: بناء الكود (دي اللي بتستخدم الـ Wrapper اللي في الفولدر عندك)
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

# نسخ ملفات الـ Maven Wrapper اللي إنت عايزها من الفولدر
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
# نسخ كود الـ Booking Service
COPY src ./src

# تحويل الـ mvnw لملف قابل للتنفيذ وتشغيله (البناء هيتم بالكامل على الـ D)
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# المرحلة الثانية: التشغيل (النسخة الخفيفة)
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

# بناخد ملف الـ JAR اللي الدوكر لسه بانيه حالاً جوه الـ D
COPY --from=build /app/target/BookingService-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8081

# أمر التشغيل مع الـ sleep اللي إنت عايزه
ENTRYPOINT ["sh", "-c", "sleep 25 && java -jar app.jar"]