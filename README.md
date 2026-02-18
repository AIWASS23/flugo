# Flugo - Cadastro de Colaboradores (Multi-step)

Aplicação em React + TypeScript com Material UI para cadastro de colaboradores em múltiplas etapas, com persistência no Firebase Firestore.

## Link em produção

- Vercel: <https://flugo-yylb.vercel.app/colaboradores>

## Stack

- React 18 + TypeScript
- Vite
- Material UI
- Firebase Firestore
- React Router

## Pré-requisitos

- Node.js 20+
- npm 10+
- Projeto Firebase com Firestore habilitado

## Como rodar localmente

1. Clone o repositório e acesse a pasta do projeto.
2. Instale as dependências:

```bash
npm install
```

3. Crie o arquivo de ambiente:

```bash
cp .env.example .env
```

4. Preencha o `.env` com as credenciais do seu app Web no Firebase:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

5. No Firestore, publique regras para permitir acesso à coleção `collaborators` durante desenvolvimento:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /collaborators/{docId} {
      allow read, write: if true;
    }
  }
}
```

6. Inicie o servidor:

```bash
npm run dev
```

7. Acesse:
- `http://localhost:5173/colaboradores`
- `http://localhost:5173/colaboradores/novo`

## Estrutura de dados no Firestore

Coleção: `collaborators`

Campos por documento:
- `name` (string)
- `email` (string)
- `emailNormalized` (string)
- `department` (string)
- `active` (boolean)
- `createdAt` (timestamp)

## Scripts

- `npm run dev`: ambiente local
- `npm run build`: build de produção
- `npm run preview`: preview da build
- `npm run lint`: lint
