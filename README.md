# Teste-Dev-Fullstack-2-FrontEnd

Este projeto é uma aplicação Angular 18 que faz parte de um sistema de gerenciamento de vendedores, clientes e pedidos. Ele utiliza .NET Core no backend, Angular 18 no frontend, e SQL Server como banco de dados, aplicando os conceitos de Clean Architecture.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Começando](#começando)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Desenvolvimento](#desenvolvimento)
- [Testes](#testes)
- [Implantação](#implantação)

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina local:

- [Node.js](https://nodejs.org/) (v18 ou posterior)
- [npm](https://www.npmjs.com/) (v8 ou posterior)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

## Começando

Para executar o projeto em sua máquina local, siga estas etapas:

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/Teste-Dev-Fullstack-2-FrontEnd.git
   cd Teste-Dev-Fullstack-2-FrontEnd
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Construa e execute o contêiner Docker:
   ```
   docker build -t teste-dev-fullstack-frontend .
   docker run -p 4200:4200 teste-dev-fullstack-frontend
   ```

4. Abra seu navegador e acesse `http://localhost:4200` para visualizar a aplicação.

## Estrutura do Projeto

O projeto está estruturado da seguinte forma:

```
src/
├── app/
│   ├── core/
│   │     ├── interceptors/
│   │     ├── models/
│   │     └── services/
│   ├── data/
│   │     └── repositories/
│   ├── features/
│   │   ├── clientes/
│   │   ├── dashboard/
│   │   ├── pedidos/
│   │   ├── relatorios/
│   │   └── vendedores/
│   ├── shared/
│   │   ├── components/
│   │   ├── directives/
│   │   ├── icons/
│   │   └── pipes/
│   └── app.component.ts
├── environments/
├── index.html
└── main.ts
```

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```
npm run start
```

A aplicação estará disponível em `http://localhost:4200`. O aplicativo será recarregado automaticamente se você alterar qualquer um dos arquivos de origem.

## Implantação

O projeto utiliza um pipeline do GitHub Actions para integração contínua e implantação. Quando você enviar alterações para a branch principal, o pipeline automaticamente:

1. Construirá a aplicação
2. Executará os testes
3. Implantará no ambiente de staging

Para implantar em produção, crie e envie uma nova tag:

```
git tag v1.0.0
git push origin v1.0.0
```

Isso acionará o pipeline de implantação de produção.

Para mais informações sobre o processo de implantação, consulte o diretório `.github/workflows` no repositório do projeto.