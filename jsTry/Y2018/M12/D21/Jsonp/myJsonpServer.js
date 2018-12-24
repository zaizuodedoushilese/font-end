const http = require('http');
const url  = require('url');

let httpServer = http.createServer((req, res) => {
  let {pathname, query} = url.parse(req.url, true);
  let {a, b, callback} = query;
  res.write(`${callback}(${parseInt(a) + parseInt(b)})`);
  res.end();
});

httpServer.listen(8080);
