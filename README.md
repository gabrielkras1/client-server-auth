# 🔐 client-server-auth

Projeto **Node.js** que implementa um sistema de autenticação baseado em **token** com arquitetura cliente-servidor. Ideal para estudo e demonstração do fluxo de autenticação em aplicações back-end.

## 🚀 Tecnologias

| Tecnologia | Descrição |
|---|---|
| Node.js | Ambiente de execução |
| JavaScript | Linguagem principal |
| Express (ou http nativo) | Servidor HTTP |
| JWT / Token | Mecanismo de autenticação |

## 📁 Estrutura do Projeto

```
client-server-auth/
├── server.js         # Servidor de autenticação
├── client.js         # Cliente que realiza as requisições
├── login.txt         # Dados de teste para login
├── .gitignore
├── package.json
└── package-lock.json
```

## ⚙️ Como Executar

### Pré-requisitos
- Node.js instalado

### Instalação

```bash
# Clone o repositório
git clone https://github.com/gabrielkras1/client-server-auth.git
cd client-server-auth

# Instale as dependências
npm install
```

### Executando o Servidor

```bash
node server.js
```

### Executando o Cliente

Em outro terminal:

```bash
node client.js
```

## 🔄 Fluxo de Autenticação

```
Cliente                        Servidor
  |                               |
  |-- POST /login (credenciais) ->|
  |                               |-- Valida credenciais
  |<-- Token JWT ------------------|
  |                               |
  |-- GET /rota (Bearer Token) -> |
  |                               |-- Valida token
  |<-- Resposta protegida --------|
```

## 👤 Autor

**Gabriel Kras** — [@gabrielkras1](https://github.com/gabrielkras1)
