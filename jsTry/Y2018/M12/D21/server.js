const http = require('http');

let server = http.createServer((req, res) => {
  console.log(req.headers);                                 //请求头中2.0比1.0 多一个 "origin"
  //if(条件：如处于相同网段       req.headers['origin'])
  res.setHeader('Access-Control-Allow-Origin', '*');        //ajax 1.0和2.0 都有 -> 允许跨域

  res.write('serve send test');
  res.end();
});

server.listen(8080);
