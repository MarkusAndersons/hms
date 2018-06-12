FROM node:alpine as frontend_builder
ADD . .
WORKDIR frontend
RUN npm install
RUN npm run build

FROM maven:alpine
WORKDIR /root/
COPY --from=frontend_builder . .
RUN mkdir src/main/resources/static/swagger
RUN cp assets/swagger-dist/* src/main/resources/static/swagger
RUN mvn clean install
CMD ["mvn", "spring-boot:run"]