## 🧪 Tecnologias

esse peojeto foi desenvolvido com as seguintes tecnologias

- [React](https://reactjs.org)
- [Styled components](https://styled-components.com/)
- [Firebase](https://firebase.google.com/)
- [TypeScript](https://www.typescriptlang.org/)

## 💻 Projeto

O BeTheHero é um projeto que visa conectar pessoas que desejam fazer contribuições monetárias a ONG's (Organizações não governamentais) que precisam de ajuda.

## 🚀 Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone https://github.com/nathanolinto/bethehero
$ cd bethehero
```

Para iniciá-lo, siga os passos abaixo:
```bash
# Instalar as dependências
$ yarn

# Iniciar o projeto
$ yarn start
```
O app estará disponível no seu browser pelo endereço http://localhost:3000.

Lembrando que será necessário criar uma conta no [Firebase](https://firebase.google.com/) e um projeto para disponibilizar um Realtime Database.

## Requisitos funcionais

1. A pagina inicial do projeto deve ser um lista dos casos e o total de casos
2. Quando um caso for selecionado uma visão detalhada deve ser apresentada mostrando:
    - caso (titulo do caso)
    - Ong (Nome da Ong)
    - Descrição do caso
    - Valor
    - Botão ao qual redireciona para o whatsApp
    - Botão ao qual redireciona para o email
3. A Ong deve ser capaz de criar uma conta e fazer login.
    - Nome
    - E-mail
    - WhatsApp
    - Cidade
    - UF
4. A Ong pode criar incidente
    - titulo
    - descrição
    - valor gasto com o tratamento
    
---