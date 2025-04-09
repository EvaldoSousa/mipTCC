# FNF - Sistema de Filtro de Notas Fiscais Eletrônicas

FNF é um projeto desenvolvido utilizando **NestJS** para o backend, **NextJS** para o frontend e **MongoDB** como banco de dados. Ele é voltado para o tratamento de dados contábeis.

## Tecnologias Utilizadas

- **Backend:** NestJS
- **Frontend:** NextJS
- **Banco de Dados:** MongoDB
- **Implantação:** Docker + SSH
- **Autenticação:** JWT
- **Estilização:** TailwindCSS

## Funcionalidades Principais

- Busca, filtro e download dos dados de Notas Fiscais Eletrônicas do Estado do Pará;
- Visualização das notas emitentes e destinatários em gráfico de árvore;

## Como Rodar o Projeto

### Requisitos:
- Node.js instalado (versão recomendada: 18+)
- MongoDB instalado ou banco de dados remoto configurado
- Acesso aos arquivos dotenv de desenvolvimento (`.env` para backend e `.env.local` para frontend)

### Backend

1. Clone o repositório:
   ```sh
   git clone https://github.com/LACAM-dev/mip-tru.git
   cd mip-tru
   ```
2. Instale as dependências:
   ```sh
   cd backend
   npm install
   ```
3. Configure as variáveis de ambiente (`.env`):
   ```sh
   MONGO_URI=mongodb://localhost:27017/
   JWT_SECRET=seu-segredo
   PORT=3001
   ```
4. Execute o backend:
   ```sh
   npm run start:dev
   ```

### Frontend

1. Instale as dependências:
   ```sh
   cd frontend
   npm install
   ```
2. Configure as variáveis de ambiente (`.env.local`):
   ```sh
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```
3. Execute o frontend:
   ```sh
   npm run dev
   ```

## Estrutura do Projeto

```
nomolito/
│-- miptru/       # Código-fonte do NestJS (backend)
│   ├── src/      # Código-fonte principal
│   ├── schemas/  # Definições do MongoDB
│   ├── test/     # Testes
│   ├── .env.example
│   ├── miptru.dockerfile
│-- web/          # Código-fonte do NextJS (frontend)
│   ├── src/      # Código-fonte principal
│   ├── public/   # Arquivos estáticos
│   ├── .env.example
│   ├── tailwind.config.js
│   ├── web.dockerfile
│-- docker-compose.yml # Configuração para Docker
│-- README.md     # Documentação principal
```

## Deploy no Servidor

### Observações:
Lembrar de verificar **TODAS** as variáveis de ambiente dos arquivos `.env` e `.env.production`.

### Passos para Deploy

1. Acessar o servidor via SSH:
   ```sh
   ssh lacam@200.18.90.113
   ```
2. Na `$HOME`, liste as pastas:
   ```sh
   ls
   ```
   - Se não houver a pasta "mip-tru", clone o repositório:
   ```sh
   git clone https://github.com/LACAM-dev/mip-tru.git
   ```
3. Entre na pasta "mip-tru":
   ```sh
   cd mip-tru
   ```
4. Atualize o repositório:
   ```sh
   git pull origin main
   ```
5. Execute o Docker Compose:
   ```sh
   sudo docker compose -f "docker-compose.yml" up -d --build
   ```

