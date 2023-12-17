
# API de Gestão Financeira 🏦

Esta é uma API RESTful que oferece funcionalidades para gerenciar transações financeiras de usuários, seguindo as seguintes operações:


## Funcionalidades

- Cadastro de Usuário
- Login de Usuário
- Detalhes do Perfil do Usuário Logado
- Edição do Perfil do Usuário Logado
- Listagem de Categorias
- Listagem de Transações
- Detalhamento de Transação
- Cadastro de Transação
- Edição de Transação
- Remoção de Transação
## Rodando os testes

Para rodar os testes, é necessario criar um banco de dados como fornececido no arquivo DUMP do codigo, com o respectivo nome da pasta.
Para executar a API rode os seguintes comandos:

```bash
npm install
  npm run dev
```
Importante lembrar que, como é uma API com validação de token, ao fazer login com o usuario criado deve-se copiar o token e coloca-lo como Bearer token


## Demonstração

Demonstração da criação do usuario, login e da autenticação do mesmo.

![Alt Text](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtveHBmeGwxZmVkbWdudTNrc21ya3NmdWtxb3NoNzJ5dGJkN3psOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FZHK3dYtQ0qgZ6r3Og/giphy.gif)

## Bibliotecas utilizadas
- Express: Gerenciamento de rotas e requisições HTTP.
- bcrypt: Para criptografar senhas antes de persistir no banco de dados.
- jsonwebtoken: Para criar e verificar tokens de autenticação.
- pg: Driver para PostgreSQL, utilizado para conexão e manipulação do banco de dados.

## End points
- POST /usuario
Cadastrar Usuário:
Cria um novo usuário no sistema.
- POST /login
Login de Usuário:
Permite que um usuário cadastrado faça login no sistema.

**As rotas abaixo ocorrem apenas quando o usuario esta logado**
- GET /usuario
Detalhar Perfil do Usuário Logado:
Retorna informações do perfil do usuário logado.
- PUT /usuario
Editar Perfil do Usuário Logado:
Permite atualizar informações do perfil do usuário logado.

- GET /categoria 
Listar Categorias
Retorna a lista de categorias cadastradas.

- GET /transacao
Listar Transações do Usuário Logado:
Retorna todas as transações associadas ao usuário logado.

- GET /transacao/:id 
Detalhar Transação do Usuário Logado:
Retorna detalhes de uma transação específica do usuário logado.

- POST /transacao
Cadastrar Transação para o Usuário Logado:
Cadastra uma transação associada ao usuário logado.

- PUT /transacao/:id
Atualizar Transação do Usuário Logado:
Permite atualizar uma transação específica do usuário logado.

- DELETE /transacao/:id
Excluir Transação do Usuário Logado:
Remove uma transação específica do usuário logado.
## Banco de Dados
Foram criadas as seguintes tabelas e colunas no banco de dados PostgreSQL chamado "dindin", elas podem ser melhor vizualizadas na arquivo DUMP:

**Tabela usuarios:**
- id
- nome
- email (campo único)
- senha
**Tabela categorias:**
- id
- descricao
**Tabela transacoes:**
- id
- descricao
- valor
- data
- categoria_id
- usuario_id
- tipo
## Autores

- [@natiialvarez](https://github.com/natiialvarez)

