# Front-end Teste Effecti

Este é o front-end do projeto desenvolvido como parte do teste técnico para a Effecti. A aplicação foi construída com **Vue.js 3** e consome dados de uma API construída com **Spring Boot**.

## 🧾 Funcionalidades

- Lista de licitações públicas extraídas do site do ComprasNet.
- Filtros por código UASG e número de pregão.
- Integração com a API `Spring Boot` hospedada localmente.
- Interface simples e responsiva para visualização dos dados.

## 🛠 Tecnologias utilizadas
- Vue.js 3
- Vite
- Axios
- CSS

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos

- Node.js (versão recomendada: >= 18)
- npm (ou yarn)

### Passo a passo

1. Clone este repositório:

```bash
git clone https://github.com/anecrispim/front-end-teste-effecti.git
cd front-end-teste-effecti
```

2. Instalar dependências
   
```bash
npm install
```

3. Executar a aplicação localmente
   
```bash
npm run dev
```

4. Acessar no navegador

```bash
http://localhost:5173
```

## 🔗 Integração com a API

1. Certifique-se de que o back-end está rodando em:

```bash
http://localhost:8080
```
2. A aplicação Vue consome os dados da seguinte rota da API: GET /licitacoes/listar
