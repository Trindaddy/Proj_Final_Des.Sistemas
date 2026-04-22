FROM node:20

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instala as dependências e gera o cliente do Prisma
RUN npm install
RUN npx prisma generate

# Copia o restante do código
COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]