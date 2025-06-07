# 🍽️ FoodFinder API - Backend

Bem-vindo ao repositório do backend do FoodFinder! Este servidor é a espinha dorsal do nosso aplicativo móvel, responsável por processar todas as requisições, se comunicar com serviços externos e fornecer os dados necessários para o app funcionar.

## ✨ Funcionalidades Principais

-   **API Gateway:** Ponto central que recebe as requisições do aplicativo React Native.
-   **Busca de Restaurantes:** Integração com a **[Yelp Fusion API](https://fusion.yelp.com/)** para buscar informações detalhadas sobre restaurantes com base na localização fornecida pelo usuário.
-   **Sugestões com IA:** Utiliza o poder do **[Groq](https://groq.com/)** para alimentar um modelo de linguagem (LLM). O modelo foi treinado com dados obtidos via web scraping para fornecer recomendações inteligentes e personalizadas de onde comer.
-   **Geração de Conteúdo para Newsletter:** Emprega técnicas de **Web Scraping** para coletar notícias e destaques do mundo gastronômico.
-   **Disparo de E-mails:** Serviço para envio de e-mails, utilizado para distribuir a newsletter para os usuários inscritos.

## 🚀 Tecnologias e Serviços

-   **Node.js:** Ambiente de execução para o JavaScript no lado do servidor.
-   **Express.js:** (Ou seu framework de preferência) Framework para a construção da API.
-   **Yelp Fusion API:** Serviço para a busca e obtenção de dados de restaurantes.
-   **Groq:** Plataforma de inferência de LLM para as sugestões da IA.
-   **Nodemailer:** (Ou similar) Biblioteca para o envio de e-mails.
-   **Web Scraping:** Bibliotecas como [Cheerio](https://cheerio.js.org/) ou [Puppeteer](https://pptr.dev/) para extrair dados de websites.

## 🏁 Começando

Siga as instruções abaixo para configurar e executar o servidor em sua máquina local.

### **Pré-requisitos**

-   [Node.js](https://nodejs.org/) (versão LTS recomendada)
-   [Yarn](https://yarnpkg.com/) ou npm
-   [Git](https://git-scm.com/)

### **Instalação**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Matheusbzrr/trab-aps-mobile.git](https://github.com/Matheusbzrr/trab-aps-mobile.git)
    cd trab-aps-mobile
    ```

2.  **Instale as dependências:**
    ```bash
    # Usando npm
    npm install

    # Ou usando Yarn
    yarn install
    ```

### **Configuração do Ambiente**

Este projeto requer chaves de API e credenciais para se conectar com os serviços externos.

1.  **Crie um arquivo `.env`** na raiz do projeto. Você pode criar um arquivo novo ou copiar o de exemplo, caso exista (`cp .env.example .env`).

2.  **Edite o arquivo `.env`** com suas chaves e credenciais. A estrutura deve ser a seguinte:

    ```env
    # Arquivo .env

    # Chave de API da Groq
    # Obtenha em: [https://console.groq.com/keys](https://console.groq.com/keys)
    GROQ_API_KEY=

    # Chave de API da Yelp Fusion
    # Obtenha em: [https://fusion.yelp.com/](https://fusion.yelp.com/)
    TOKEN_YELP=

    # --- Credenciais do Serviço de E-mail (ex: SMTP do Gmail, Mailtrap, etc.) ---

    # Host do servidor de e-mail (ex: "smtp.gmail.com")
    EMAIL_HOST=

    # Porta do servidor de e-mail (ex: 587 para TLS)
    EMAIL_PORT=

    # Usuário para autenticação no servidor de e-mail
    EMAIL_USER=

    # Senha para autenticação no servidor de e-mail
    EMAIL_PASS=
    
    # --- Configurações do Servidor ---

    # Porta em que o servidor irá rodar
    PORT=3000
    ```

### **Executando o Servidor**

Após instalar as dependências e configurar o ambiente, você pode iniciar o servidor de desenvolvimento.

```bash
# Inicia o servidor em modo de desenvolvimento (com hot-reload, se configurado)
npm start
```
