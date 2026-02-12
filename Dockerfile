FROM node:25-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS production
WORKDIR /app
COPY --from=build /app/dist ./build
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]