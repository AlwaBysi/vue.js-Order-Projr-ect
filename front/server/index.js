var http = require('http');
var url = require('url');

function accept(req, res) {
  debugger
  // если URL запроса /vote, то...
  if (req.url == '/vote') {
    // через 1.5 секунды ответить сообщением
    setTimeout(function() {
      res.end('Ваш голос принят: ' + new Date());
    }, 1500);
  }
}

// ------ этот код запускает веб-сервер -------

if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}