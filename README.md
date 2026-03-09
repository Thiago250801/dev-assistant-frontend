# Dev Assistant Frontend

Interface web para um assistente de desenvolvimento com foco em suporte de codigo via chat em tempo real.

## Visao Geral

Este projeto e um frontend em React + TypeScript que consome um backend de streaming para respostas token a token. A UI foi pensada para fluxo rapido de desenvolvimento: escolha de modo, envio de prompt e acompanhamento da resposta em tempo real.

## Funcionalidades

- Chat com streaming de resposta (token a token)
- Renderizacao de markdown nas respostas do assistente
- Modos de atendimento para tarefas tecnicas:
  - `explain`
  - `debug`
  - `commit`
  - `refactor`
- Estado global de conversa com Zustand
- Interface animada com Framer Motion

## Stack Tecnica

- React 19
- TypeScript 5
- Vite 7
- Tailwind CSS 4
- Zustand
- Framer Motion
- Lucide React
- React Markdown

## Requisitos

- Node.js 20+
- npm 10+
- Backend do assistente rodando localmente

## Como Rodar

1. Instale dependencias:

```bash
npm install
```

2. Inicie o frontend:

```bash
npm run dev
```

3. Acesse no navegador:

- `http://localhost:5173`

## Integracao com Backend

O frontend envia requisicoes para:

- `POST http://localhost:3001/api/chat-stream`

Payload enviado:

```json
{
  "prompt": "texto do usuario",
  "mode": "explain"
}
```

Formato esperado de resposta:

- Stream com linhas no padrao `data: <token>`
- Encerramento com token `END`

## Scripts Disponiveis

- `npm run dev`: inicia ambiente de desenvolvimento
- `npm run build`: gera build de producao
- `npm run preview`: sobe preview da build
- `npm run lint`: executa lint

## Estrutura do Projeto

```text
src/
  components/
    Chat.tsx          # Janela de conversa e input
    Sidebar.tsx       # Seletor de modo
  services/
    chatService.ts    # Cliente HTTP + parser de stream
  store/
    chatStore.ts      # Estado global (mensagens e modo)
  types/
    chat.ts           # Tipos de dominio do chat
  App.tsx             # Layout principal
  main.tsx            # Bootstrap da aplicacao
  index.css           # Estilos globais
```

## Fluxo da Conversa

1. Usuario envia mensagem no `Chat.tsx`
2. Mensagem e adicionada no store (`chatStore.ts`)
3. Frontend abre stream via `streamChat` (`chatService.ts`)
4. Tokens recebidos atualizam a ultima mensagem do assistente
5. UI renderiza markdown progressivamente

## Proximos Passos Recomendados

- Mover URL da API para variavel de ambiente (`VITE_API_URL`)
- Adicionar tratamento de erro visual para falhas de conexao
- Implementar testes de componentes e store
- Salvar historico de chat (localStorage ou backend)


