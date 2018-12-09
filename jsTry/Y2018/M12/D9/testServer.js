const http = require('http');

let server = http.createServer(function(req, res){
  console.log(req.url);
  res.write('data from server!');

  res.end();
});

server.listen(8080);
