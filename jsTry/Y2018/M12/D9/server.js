const http =  require('http');
const fs =  require('fs');

let server = http.createServer((req, res) => {
  fs.readFile(`xxx${req.url}`, (err, data) => {  //限定用户所能请求的资源目录 'xxx'
    if(err) {
      fs.readFile('./http_errors/error.html', (err, data) => {
        if(err) {
          res.writeHeader(404);
          res.write('Not Found!');
        } else {
          res.writeHeader(404);
          res.write(data);
        }
        res.end();
      });
    } else {
      //console.log(data.toString());
      res.write(data);
      res.end();             // 必须放在里面（文件是异步读取，否则会落后于end）
    }

  });
});

server.listen(8080);
