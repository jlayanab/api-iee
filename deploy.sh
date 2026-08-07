#!/usr/bin/env bash

# Script de Despliegue Automático para Servidor Linux Remoto (Ubuntu/Debian)
# Ejecutar este script en el servidor remoto para instalar y desplegar la API

set -e

echo "🚀 Iniciando preparación del entorno en el servidor Linux..."

# 1. Actualizar paquetes del sistema
sudo apt update && sudo apt upgrade -y

# 2. Instalar herramientas básicas
sudo apt install -y curl git ufw nginx

# 3. Instalar Docker y Docker Compose si no están instalados
if ! command -v docker &> /dev/null; then
    echo "🐳 Instalando Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
fi

if ! command -v docker-compose &> /dev/null; then
    echo "🐳 Instalando Docker Compose..."
    sudo apt install -y docker-compose-plugin docker-compose
fi

# 4. Configurar firewall (UFW)
echo "🔒 Configurando Firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw allow 4000/tcp
sudo ufw --force enable

# 5. Desplegar aplicación con Docker Compose
echo "📦 Construyendo y levantando contenedores..."
docker compose up -d --build

echo "✅ Despliegue completado con éxito."
echo "🔗 Puedes verificar la API en http://localhost:4000 o mediante la IP del servidor."
