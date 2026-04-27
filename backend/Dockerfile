# Usar a imagem oficial do Node.js (versão 18 é bem estável)
FROM node:18-alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de dependência primeiro (isso otimiza o cache do Docker)
COPY package*.json ./
COPY prisma ./prisma/

# Instalar as dependências
RUN npm install

# Gerar o cliente do Prisma (necessário para o ORM funcionar)
RUN npx prisma generate

# Copiar o restante do código do backend
COPY . .

# Expor a porta que a API vai rodar
EXPOSE 5000

# Comando para iniciar a aplicação (ajuste se o seu comando no package.json for diferente)
CMD ["npm", "run", "dev"]