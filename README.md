# 🍽️ FoodFinder API - Backend

Bem-vindo ao repositório do backend do FoodFinder! Este servidor é a espinha dorsal do nosso aplicativo móvel, responsável por processar todas as requisições, se comunicar com serviços externos e fornecer os dados necessários para a busca de restaurantes, sugestões de IA e conteúdo da newsletter.

## ✨ Funcionalidades Principais

-   **API Gateway:** Ponto central que recebe as requisições do aplicativo React Native.
-   **Busca de Restaurantes:** Integração com a **[Yelp Fusion API](https://fusion.yelp.com/)** para buscar informações detalhadas sobre restaurantes com base na localização fornecida pelo usuário.
-   **Sugestões com IA:** Utiliza o poder do **[Groq](https://groq.com/)** para alimentar um modelo de linguagem (LLM). O modelo foi treinado com dados obtidos via web scraping para fornecer recomendações inteligentes e personalizadas de onde comer.
-   **Geração de Conteúdo para Newsletter:** Emprega técnicas de **Web Scraping** para coletar notícias, eventos e destaques do mundo gastronômico, gerando conteúdo relevante para os assinantes da newsletter.
-   **Gerenciamento de Usuários:** Endpoints para lidar com funcionalidades como favoritar restaurantes e gerenciar inscrições na newsletter (requer um banco de dados).

## 🚀 Tecnologias e Serviços

-   **Node.js:** Ambiente de execução para o JavaScript no lado do servidor.
-   **Express.js:** (Ou seu framework de preferência) Framework minimalista para a construção da API.
-   **Yelp Fusion API:** Serviço utilizado para a busca e obtenção de dados de restaurantes.
-   **Groq:** Plataforma de inferência de LLM para fornecer respostas rápidas e inteligentes nas sugestões.
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

Este projeto requer chaves de API para se conectar com os serviços da Yelp e da Groq.

1.  **Crie um arquivo `.env`** na raiz do projeto. Você pode copiar o arquivo de exemplo:
    ```bash
    cp .env.example .env
    ```

2.  **Edite o arquivo `.env`** com suas chaves de API e outras configurações necessárias.
    ```env
    # Arquivo .env

    # Porta em que o servidor irá rodar
    PORT=3000

    # Chave de API da Yelp Fusion
    # Obtenha em: [https://fusion.yelp.com/](https://fusion.yelp.com/)
    YELP_API_KEY="SUA_CHAVE_DE_API_DA_YELP_AQUI"

    # Chave de API da Groq
    # Obtenha em: [https://console.groq.com/keys](https://console.groq.com/keys)
    GROQ_API_KEY="SUA_CHAVE_DE_API_DA_GROQ_AQUI"

    # (Opcional) URL do seu banco de dados, se aplicável
    # DATABASE_URL="SUA_URL_DE_CONEXAO_AQUI"
    ```

### **Executando o Servidor**

Após instalar as dependências e configurar o ambiente, você pode iniciar o servidor de desenvolvimento.

```bash
# Inicia o servidor em modo de desenvolvimento (com hot-reload, se configurado)
npm run dev

# Ou, para iniciar em modo de produção:
npm start
```
Se tudo estiver configurado corretamente, você verá uma mensagem no terminal indicando que o servidor está em execução na porta definida no seu arquivo `.env` (por padrão, `http://localhost:3000`).

## API Endpoints

Uma visão geral dos principais endpoints disponíveis:

-   `GET /restaurants?city=nome_da_cidade`: Busca restaurantes em uma cidade específica.
-   `POST /suggest`: Envia um prompt para a IA e recebe uma sugestão de restaurante.
-   `POST /newsletter/subscribe`: Inscreve um usuário na newsletter.

---
