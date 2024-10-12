const http = require('node:http');
const fs = require('fs');
const url = require('url');

http
  .createServer((req, res) => {
    const q = url.parse(req.url, true);
    let filename =
      q.pathname === '/' ? './index.html' : '.' + q.pathname + '.html';

    fs.readFile(filename, function (err, data) {
      if (err) {
        fs.readFile('./404.html', function (err404, page404) {
          if (err404) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            return res.end('500 Internal Server Error');
          }
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.write(page404);
          res.end();
        });
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
      }
    });
  })
  .listen(8080);
