# Imagen base oficial de Node.js
FROM node:18-alpine

# Crear y establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias del proyecto
RUN npm ci --only=production || npm install

# Copiar el código fuente
COPY . .

# Compilar el código ES6 / Babel
RUN npm run build

# Crear directorio de PDFs si es necesario
RUN mkdir -p pdfs

# Exponer el puerto de la aplicación
EXPOSE 4000

# Definir variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=4000

# Comando para iniciar el servidor
CMD ["npm", "start"]
