# Login API

Essa aplicação backend desenvolvida em node.js, realiza a criação de contas em um banco de dados não relacional (MongoDB), e permite criar, editar e alterar contas de usuários e permite fazer a autenticação no lado do client, utilizando JWT (JasonWebToken).

Cada usuário, possui uma lista de Comics e Personagens da Marvel favoritos. 

Baseado no tutorial:
> [Node.js + MongoDB: User Authentication & Authorization with JWT](https://bezkoder.com/node-js-mongodb-auth-jwt/)

## Project setup
```
npm install
```

### Run
```
npm start
```

### Rotas
> [POST] /api/auth/signup
POST >  /api/auth/signin
POST /api/auth/changemail
