const http = require('http');
const fs = require('fs');
const path = require('path');

const { JSDOM } = require('jsdom');
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);

const document = dom.window.document;
const html = document.documentElement;
const head = document.head;
const body = document.body;

html.setAttribute('lang', 'pt-BR');
const charset = document.createElement('meta');
charset.setAttribute('charset', 'UTF-8');
const author = document.createElement('meta');
author.setAttribute('name', 'author');
author.setAttribute('content', 'Fernando Caetano');
const viewport = document.createElement('meta');
viewport.setAttribute('name', 'viewport');
viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
const metaDescription = document.createElement('meta');
metaDescription.setAttribute('name', 'description');
metaDescription.setAttribute('content', 'fNotes: Bloco de notas web simples e intuitivo para criar, organizar e acessar suas anotações, armazenadas localmente no seu dispositivo e sem necessidade de nuvem.');
const linkCSS = document.createElement('link');
linkCSS.setAttribute('rel', 'stylesheet');
linkCSS.setAttribute('href', '/style.css');
const noscript = document.createElement('noscript');
const linkJS = document.createElement('link');
linkJS.setAttribute('rel', 'stylesheet');
linkJS.setAttribute('href', '/no-js.css');
noscript.appendChild(linkJS);
const icon = document.createElement('link');
icon.setAttribute('rel', 'icon');
icon.setAttribute('type', 'image/x-icon');
icon.setAttribute('href', 'https://f--notes.vercel.app/images/favicon.ico');
const title = document.createElement('title');
title.textContent = 'fNotes';

head.appendChild(charset);
head.appendChild(author);
head.appendChild(viewport);
head.appendChild(metaDescription);
head.appendChild(linkCSS);
head.appendChild(icon);
head.appendChild(noscript);
head.appendChild(title);


const noScript = document.createElement('noscript');
const newDiv = document.createElement('div');
const divClass = document.createElement('div');
const preJS = document.createElement('pre');

newDiv.setAttribute('id', 'noScript');
divClass.setAttribute('class', 'js');
preJS.innerHTML = ` // Alerta Importante! O JavaScript está desativado!
                    // Sem JavaScript, os recursos do fNotes
                    // permanecem inacessíveis.
                    // Para desbloquear a experiência completa do fNotes,
                    // habilite o JavaScript nas configurações do seu navegador.

                    // Como habilitar o JavaScript:
                    //  1. Abra o menu do navegador.
                    //  2. Vá para "Configurações" ou "Preferências".
                    //  3. Acesse "Privacidade e segurança" ou equivalente.
                    //  4. Selecione "Configurações do site" ou "Permissões".
                    //  5. Localize e habilite a opção "JavaScript".

                    // Caso precise de ajuda, veja este guia:
                    // <a href="https://www.enable-javascript.com/pt/" target="_blank">Clique aqui para aprender a habilitar JavaScript</a>

                    // Após habilitar, atualize a página.
                    // O JavaScript permitirá uma experiência web mais rica e interativa.
                `;

newDiv.appendChild(divClass);
newDiv.appendChild(preJS);
noScript.appendChild(newDiv);
body.appendChild(noScript);

const scriptElement = document.createElement('script');
scriptElement.setAttribute('src', '/client.js');
body.appendChild(scriptElement);


// Caminho base da pasta public
const publicPath = path.join(__dirname, 'public');

// Servir o HTML em um servidor HTTP
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Servir o HTML
        const serializer = new dom.window.XMLSerializer();
        const output = serializer.serializeToString(dom.window.document);

        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(output);
    } else if (req.url.startsWith('/images/')) {
        // Servir imagens da pasta public/images
        const filePath = path.join(publicPath, req.url);
        if (fs.existsSync(filePath)) {
            const ext = path.extname(filePath);
            const mimeTypes = {
                '.jpg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.svg': 'image/svg+xml',
                '.ico': 'image/x-icon',
            };
            res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
            res.end(fs.readFileSync(filePath));
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Image not found');
        }
    } else if (req.url === '/client.js') {
        // Servir o JavaScript do cliente da pasta public
        fs.readFile(path.join(publicPath, 'client.js'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading client JavaScript');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
        });
    }
    else if (req.url === '/sw.js') {
        // Servir o JavaScript do Service Worker
        fs.readFile(path.join(publicPath, 'sw.js'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading client JavaScript');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
        });
    } else if (req.url === '/style.css') {
        // Servir o CSS da pasta public/css
        fs.readFile(path.join(publicPath, 'css', 'style.css'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('CSS file not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    } else if (req.url === '/no-js.css') {
        // Servir o CSS desativado pelo JavaScript da pasta public/css
        fs.readFile(path.join(publicPath, 'css', 'no-js.css'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('CSS file not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    } else {
        // 404 para outros caminhos
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(4500, () => {
    console.log('Servidor rodando em http://localhost:4500');
});