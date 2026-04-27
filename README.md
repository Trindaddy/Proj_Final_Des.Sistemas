# 💰 Financial Control App

Um sistema completo (Full-Stack) para gestão de finanças pessoais. Desenvolvido com foco na experiência do usuário, performance e arquitetura moderna. O projeto permite que usuários gerenciem suas receitas e despesas, visualizem gráficos de evolução mensal e mantenham um histórico detalhado de suas transações.

---

## ✨ Funcionalidades

- **Autenticação Segura:** Criação de conta e Login utilizando JWT (JSON Web Tokens).
- **Dashboard Interativo:** Resumo financeiro (Saldo, Receitas, Despesas) e gráficos visuais de acompanhamento.
- **Gestão de Transações:** Adição, listagem e exclusão de transações (entradas e saídas).
- **Filtros Inteligentes:** Busca de transações por descrição e filtragem por categorias.
- **Perfil do Usuário:** Gerenciamento de informações pessoais.
- **Ambiente Containerizado:** Backend totalmente configurado com Docker para fácil execução.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi dividido em duas camadas principais, utilizando as melhores práticas do mercado:

### Frontend
- **React:** Biblioteca principal para construção da interface.
- **TypeScript:** Tipagem estática para maior segurança e previsibilidade do código.
- **Vite:** Bundler super rápido para o ambiente de desenvolvimento.
- **Tailwind CSS:** Estilização utilitária moderna e responsiva.
- **Axios:** Cliente HTTP para comunicação com a API, configurado com interceptors para injeção automática de tokens.
- **Lucide React:** Biblioteca de ícones.

### Backend
- **Node.js & Express:** Servidor web rápido e minimalista.
- **Prisma ORM:** Mapeamento objeto-relacional moderno e tipado para interagir com o banco de dados.
- **SQLite:** Banco de dados relacional leve e embutido, ideal para desenvolvimento e testes.
- **Bcrypt & JsonWebToken:** Criptografia de senhas e geração de tokens de acesso.
- **Docker & Docker Compose:** Containerização da aplicação, garantindo que o backend rode perfeitamente em qualquer máquina.

---

## 🚀 Como executar o projeto localmente

### Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (v18 ou superior)
- [Docker](https://www.docker.com/) e Docker Compose

### 1. Clonando o repositório
```bash
git clone [https://github.com/Trindaddy/Proj_Final_Des.Sistemas.git](https://github.com/Trindaddy/Proj_Final_Des.Sistemas.git)
cd seu-repositorio
2. Configurando e Rodando o Backend (API)
O backend foi preparado para rodar via Docker na porta 5000.

Navegue até a pasta do backend (se houver uma pasta separada, ex: cd backend).

Crie um arquivo .env na raiz do backend baseado no arquivo de exemplo (se houver), ou adicione:

Snippet de código
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave_secreta_super_segura"
PORT=5000
Suba o container do Docker:

Bash
docker-compose up -d --build
A API estará disponível em: http://localhost:5000/api

3. Configurando e Rodando o Frontend (React)
Abra um novo terminal e navegue até a pasta do frontend.

Crie um arquivo .env na raiz do frontend (junto ao package.json) com a seguinte variável:

Snippet de código
VITE_API_URL=http://localhost:5000/api
Instale as dependências:

Bash
npm install
Inicie o servidor de desenvolvimento:

Bash
npm run dev
Acesse a aplicação no seu navegador (geralmente em http://localhost:5173).

📂 Estrutura de Diretórios (Frontend)
Uma breve visão de como o frontend está organizado:

Plaintext
src/
 ├── components/     # Componentes reutilizáveis (Botões, Modais, Gráficos)
 ├── context/        # Estados globais da aplicação (AuthContext, TransactionContext)
 ├── hooks/          # Custom Hooks (useAuth, useTransactions)
 ├── lib/            # Funções utilitárias (formatações de moeda e data)
 ├── services/       # Configuração de comunicação com a API (Axios)
 ├── types/          # Definições de tipos do TypeScript
 └── App.tsx         # Rotas e entry-point da aplicação

📝 Licença
Este projeto está sob a licença MIT. Sinta-se livre para usá-lo e modificá-lo.

Desenvolvido com ☕ e 💻.