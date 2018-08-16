

var http = require('http');

http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/plain'}); // `text/plain`返回普通的文本；`text/html`返回HTML
  res.end('Hello world!');
}).listen(3000);

console.log('服务器开启在3000端口，可按下ctrl-c终止');
