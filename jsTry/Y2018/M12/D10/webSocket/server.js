const http = require('http');
const sio =  require('socket.io');

//1. http服务
const httpServer = http.createServer();
httpServer.listen(8080);

//2. websocket服务
const wsServer = sio.listen(httpServer);

//监听
wsServer.on('connection', sock => {
  //sock.emit
  sock.on('a', function(n1, n2, n3, n4, n5){
    console.log(n1, n2, n3, n4, n5);
  });
});
