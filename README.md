# Flugo - Cadastro de Colaboradores (Multi-step)

Projeto em React + TypeScript com Material UI para cadastro de funcionários em múltiplas etapas, persistindo dados no Firebase Firestore.

## Stack

- React 19 + TypeScript
- Vite
- Material UI
- Firebase Firestore
- React Router

## Estrutura de projeto

```text
src/
  app/
    providers/
    routes/
  features/
    collaborators/
      components/
      hooks/
      pages/
      services/
      types/
  shared/
    components/
    layout/
    theme/
```

## Requisitos

- Node.js 20+
- Conta Firebase com Firestore habilitado

## Como rodar localmente

1. Instale dependências:

```bash
npm install
```

2. Crie o arquivo `.env` com base no `.env.example`:

```bash
cp .env.example .env
```

3. Preencha as variáveis do Firebase no `.env`:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

4. Inicie o projeto:

```bash
npm run dev
```

5. Abra `http://localhost:5173`

## Firestore

Crie a coleção `collaborators` no Firestore. Cada documento salvo terá:

- `name` (string)
- `email` (string)
- `department` (string)
- `active` (boolean)
- `createdAt` (timestamp)

## Validações implementadas

- Todos os campos obrigatórios
- Validação de formato de e-mail na etapa 1
- Bloqueio de avanço enquanto a etapa atual estiver inválida
- Feedback visual por campo

## Deploy remoto (Vercel)

1. Suba o repositório para o GitHub (público):

```bash
git init
git add .
git commit -m "feat: cadastro multi-step colaboradores"
git branch -M main
git remote add origin https://github.com/<seu-usuario>/<seu-repo>.git
git push -u origin main
```

2. No Vercel:
- Import Project a partir do GitHub
- Configure as mesmas variáveis de ambiente do `.env`
- Deploy

## Scripts

- `npm run dev`: desenvolvimento
- `npm run build`: build de produção
- `npm run preview`: preview da build
- `npm run lint`: lint

## Observações

- O layout segue o protótipo fornecido com sidebar, listagem e formulário em 2 etapas.
- O componente de avatar usa DiceBear para gerar imagem a partir do nome.
