FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias usando --legacy-peer-deps para resolver conflictos
RUN npm ci --legacy-peer-deps

# Copiar el resto de los archivos
COPY . .

# Construir la aplicación
RUN npm run build

# Imagen de producción
FROM nginx:alpine

# Copiar archivos de construcción al directorio de nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copiar configuración personalizada de nginx si es necesaria
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
