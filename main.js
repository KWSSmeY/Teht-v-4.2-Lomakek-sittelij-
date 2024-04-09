const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Serve index.html for the root path
        fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && req.url === '/palaute') {
        // Handle POST request to /palaute
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            const postData = querystring.parse(body);
            const nimi = postData.nimi;
            const sahkoposti = postData.sahkoposti;
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(`Kiitos palautteestasi, ${nimi}! Otamme sinuun tarvittaessa yhteyttä sähköpostitse osoitteeseen ${sahkoposti}.`);
        });
    } else {
        // 404 Not Found response for other paths/methods
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
