FROM node:18

# carpeta de trabajo dentro del contenedor
WORKDIR /app

# copiar package.json y package-lock.json
COPY package*.json ./

# instalar dependencias
RUN npm install

# copiar el resto del proyecto
COPY . .

# exponer el puerto de react
EXPOSE 3000

# comando que levanta react
CMD ["npm", "start"]
