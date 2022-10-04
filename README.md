<p>Este projeto foi desenvolvido por <a href="https://github.com/Istvanoliva">Istvan Oliva</a> enquanto estudava Desenvolvimento Back-end na <a href="https://www.betrybe.com/">Trybe</a> :rocket:</p>

# O que deverá ser desenvolvido

Você vai desenvolver uma API de um CRUD (**C**reate, **R**ead, **U**pdate e **D**elete) de palestrantes. Você vai desenvolver alguns endpoints que irão ler e escrever em um arquivo, isso utilizando o módulo `fs`.

  - [Antes de começar a desenvolver:](#antes-de-começar-a-desenvolver)
    - [Rodando no Docker vs Localmente](#rodando-no-docker-vs-localmente)
## Requisitos do projeto
  - [:notebook: Lista de requisitos](#notebook-lista-de-requisitos)
    - [1 - Crie o endpoint GET `/talker`](#1---crie-o-endpoint-get-talker)
    - [2 - Crie o endpoint GET `/talker/:id`](#2---crie-o-endpoint-get-talkerid)
    - [3 - Crie o endpoint POST `/login`](#3---crie-o-endpoint-post-login)
    - [4 - Adicione as validações para o endpoint `/login`](#4---adicione-as-validações-para-o-endpoint-login)
    - [5 - Crie o endpoint POST `/talker`](#5---crie-o-endpoint-post-talker)
    - [6 - Crie o endpoint PUT `/talker/:id`](#6---crie-o-endpoint-put-talkerid)
    - [7 - Crie o endpoint DELETE `/talker/:id`](#7---crie-o-endpoint-delete-talkerid)
    - [8 - Crie o endpoint GET `/talker/search?q=searchTerm`](#8---crie-o-endpoint-get-talkersearchqsearchterm)

---

# Habilidades

Neste projeto, verificamos se você é capaz de:

- Realizar operações assíncronas utilizando callbacks;
- Realizar operações assíncronas utilizando Promises;
- Ler e escrever arquivos localmente com NodeJS;
- Escrever seus próprios scripts que criam e consomem Promises;
- Reescrever código que usa callbacks para que use Promises;
- Realizar chamadas de funções de forma consciente;
- Entender os conceitos básicos de como o JavaScript funciona;
- Detectar e solucionar problemas no código de forma mais objetiva;
- Entender a diferença entre execução síncrona e assíncrona;
- Entender o que é o HTTP, o que é uma API e o que os dois têm a ver com o Express;
- Escrever APIs utilizando Node e Express;
- Entender a estrutura de uma aplicação Express e como organizar seu código;
- Criar rotas e aplicar middlewares.
---

### Rodando no Docker vs Localmente

<details close>
  <summary>Docker</summary>
  <br>

  > Rode o serviço `node` com o comando `docker-compose up -d`.
  - Esse serviço irá inicializar um container chamado `talker_manager`.
  - A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it talker_manager bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências [**Caso existam**] com `npm install`

✨ **Dica:** A extensão `Remote - Containers` do VS Code (que estará na seção de extensões recomendadas do programa) é indicada para que você possa desenvolver sua aplicação no container Docker direto no VS Code, como você faz com seus arquivos locais.

<img src="images/remote-container.png" width="800px" >
</details>

<details close>
  <summary>Localmente</summary>
  <br>

  > Instale as dependências [**Caso existam**] com `npm install`

  ✨ **Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.
  ✨ **Dica:** O avaliador espera que a versão do `node` utilizada seja a 16.

</details>

---
## Requisitos do projeto

### 1 - Crie o endpoint GET `/talker`

#### Os seguintes pontos serão avaliados:

- O endpoint deve retornar um array com todas as pessoas palestrantes cadastradas. Devendo retornar o `status 200`.
- Caso não exista nenhuma pessoa palestrante cadastrada o endpoint deve retornar um array vazio e o `status 200`.


### 2 - Crie o endpoint GET `/talker/:id`

- O endpoint deve retornar uma pessoa palestrante com base no id da rota. Devendo retornar o `status 200`.
- Caso não seja encontrada uma pessoa palestrante com base no id da rota, o endpoint deve retornar o `status 404`.

### 3 - Crie o endpoint POST `/login`

O endpoint deverá receber no corpo da requisição os campos `email` e `password` e retornar um token aleatório de 16 caracteres. Este token será utilizado pelas requisições dos próximos requisitos do projeto.

- O endpoint deverá retornar um código de `status 200` com o token gerado.
- O endpoint deve retornar um token aleatório a cada vez que for acessado.

### 4 - Adicione as validações para o endpoint `/login`

- Os campos recebidos pela requisição devem ser validados e, caso os valores sejam inválidos, o endpoint deve retornar o código de `status 400`.

### 5 - Crie o endpoint POST `/talker`

- O endpoint deve ser capaz de adicionar uma nova pessoa palestrante ao seu arquivo;
- A requisição deve ter o token de autenticação nos headers, no campo `authorization`.
- Caso o token não seja encontrado retorne um código de `status 401`.
- O campo `name` deverá ter no mínimo 3 caracteres. Ele é obrigatório.
- Caso o campo não seja passado ou esteja vazio retorne um código de `status 400`.
- Caso o nome não tenha pelo menos 3 caracteres retorne um código de `status 400`.
- O campo `age` deverá ser um inteiro e apenas pessoas maiores de idade (pelo menos `18 anos`) podem ser cadastrados. Ele é obrigatório.
- Caso o campo não seja passado ou esteja vazio retorne um código de `status 400`.
- Caso a pessoa palestrante não tenha pelo menos 18 anos retorne `status 400`.
- A chave `watchedAt` deve ser uma data no formato `dd/mm/aaaa`.
- Caso a data não respeito o formato `dd/mm/aaaa` retorne `status 400`.
- Caso a nota não seja um inteiro de 1 à 5 retorne `status 400`.
- O campo `talk` é obrigatório e nenhuma das chaves citadas anteriormente podem ser vazias.
- Caso o campo não seja informado, esteja vazio ou então alguma de suas chaves não tenham sido informadas retorne `status 400`.
- Caso esteja tudo certo, retorne o `status 201`  e a pessoa cadastrada.
- O endpoint deve retornar o `status 201` e a pessoa palestrante que foi cadastrada.

### 6 - Crie o endpoint PUT `/talker/:id`

- O endpoint deve ser capaz de editar uma pessoa palestrante com base no id da rota, sem alterar o id registrado.
- A requisição deve ter o token de autenticação nos headers, no campo `authorization`.
- Caso o token não seja encontrado retorne um código de `status 401`.
- Caso o token seja inválido retorne um código de `status 401`.
- O campo `name` deverá ter no mínimo 3 caracteres. Ele é obrigatório.
- Caso o campo não seja passado ou esteja vazio retorne um código de `status 400`.
- Caso o nome não tenha pelo menos 3 caracteres retorne um código de `status 400`.
- O campo `age` deverá ser um inteiro e apenas pessoas maiores de idade (pelo menos `18 anos`) podem ser cadastrados. Ele é obrigatório.
- Caso o campo não seja passado ou esteja vazio retorne um código de `status 400`.
- Caso a pessoa palestrante não tenha pelo menos 18 anos retorne `status 400`.
- Caso a data não respeito o formato `dd/mm/aaaa` retorne `status 400`.
- A chave `rate` deve ser um inteiro de 1 à 5.
- Caso a nota não seja um inteiro de 1 à 5 retorne `status 400`.
- O campo `talk` é obrigatório e nenhuma das chaves citadas anteriormente podem ser vazias.
- Caso o campo não seja informado, esteja vazio ou então alguma de suas chaves não tenham sido informadas retorne `status 400`.
- Caso esteja tudo certo, retorne o `status 200` e a pessoa editada.
- O endpoint deve retornar o `status 200` e a pessoa palestrante que foi editada.

### 7 - Crie o endpoint DELETE `/talker/:id`

- A requisição deve ter o token de autenticação nos headers, no campo `authorization`.
- Caso o token não seja encontrado retorne um código de `status 401`.
- Caso o token seja inválido retorne um código de `status 401`.
- O endpoint deve deletar uma pessoa palestrante com base no id da rota. Devendo retornar o `status 204`, sem conteúdo na resposta.

### 8 - Crie o endpoint GET `/talker/search?q=searchTerm`

- O endpoint deve retornar um array de palestrantes que contenham em seu nome o termo pesquisado no queryParam da URL. Devendo retornar o `status 200`.
- A requisição deve ter o token de autenticação nos headers, no campo `authorization`.
- Caso o token não seja encontrado retorne um código de `status 401`.
- Caso o token seja inválido retorne um código de `status 401`.
- Caso `searchTerm` não seja informado ou esteja vazio, o endpoint deverá retornar um array com todos as pessoas palestrantes cadastradas, assim como no endpoint GET `/talker`, com um `status 200`.
- Caso nenhuma pessoa palestrante satisfaça a busca, o endpoint deve retornar o `status 200` e um array vazio.
