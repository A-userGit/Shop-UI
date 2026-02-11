FROM node:25-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:25-alpine AS production
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/dist ./build
EXPOSE 80
CMD ["serve", "-s", "build", "-l", "80"]