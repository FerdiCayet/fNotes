<h1 align="center">fNotes</h1>

O [fNotes](https://f--notes.vercel.app) é um aplicativo web de bloco de notas, acessado diretamente pelo navegador, que permite criar, salvar e gerenciar notas. Desenvolvido com JavaScript puro, ele oferece uma interface intuitiva e responsiva, com suporte para modo offline, garantindo que suas notas possam ser acessadas mesmo sem conexão com a internet. Além disso, conta com opções de temas claro e escuro, oferecendo uma experiência personalizada e prática.

### Funcionalidades

- **Criação e edição de notas** diretamente no navegador.
- **Pesquisa de notas** por título ou conteúdo.
- **Modo escuro** para uma melhor experiência visual.
- **Modo offline** usando `Service Worker` para acessar notas sem conexão.
- **Importação e exportação de notas** em formato JSON.
- **Armazenamento local** utilizando `localStorage`.
- **Servidor local** utilizando `JSDOM` e `http-server`.

### Tecnologias Utilizadas

- **JavaScript Vanilla** para a interface dinâmica e funcionalidades.
- **JSDOM** para gerar metadados, tags <meta>, <noscript> e instruções dinâmicas para ativar o JavaScript.
- **localStorage** para armazenamento seguro das notas no navegador.
- **Service Worker** para cache de arquivos e suporte offline.
- **Node.js** para servir arquivos e lidar com requisições HTTP.
- **http-server** como alternativa para rodar o projeto localmente.

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/FerdiCayet/fNotes.git
cd fnotes
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm start
```
ou, se preferir, utilize o `http-server`:
```bash
npx http-server .
```

A aplicação estará disponível em `http://localhost:4500`.

<hr>
<div align="right">
    <p><i>Notas rápidas, acessíveis e offline.</i></p>
</div>