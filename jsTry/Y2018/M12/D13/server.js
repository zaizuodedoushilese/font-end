const http = require('http');
//const io = require('socket.io');
const url = require('url');
const mysql = require('mysql');
const fs = require('fs');

let db = mysql.createPool(
  {
    hos: 'localhost',
    user: 'root',
    password: '123456',
    database: 'websocket'
  }
);

let httpServer = http.createServer((req, res) => {
  //res.url='/reg?user=wzx&pass=djksj';
  let {pathname, query} = url.parse(req.url, true);
  if(pathname == '/reg'){
    //注册接口
    console.log('request to register!');
    let {user, pass} = query;
    //1、数据校验
    if(!/^\w{2,32}$/.test(user)){
      res.write(JSON.stringify({code: 1, msg: '1 用户名不符合规范！'}));
      res.end();
    } else if(!/^.{6,32}$/.test(pass)) {
      res.write(JSON.stringify({code: 1, msg: '2 密码不符合规范！'}));
      res.end();
    } else {
      //2、校验用户名重复
      db.query(`SELECT * FROM user_table WHERE username='${user}'`, (err, data) => {
        if(err) {
          res.write(JSON.stringify({code: 1, msg: '3 数据库内部错误！'}));
          res.end();
        } else if (data.length > 0) {
          res.write(JSON.stringify({code: 1, msg: '4 用户名已经被注册！'}));
          res.end();
        } else {
          //3、注册数据库
          db.query(`INSERT INTO user_table (username, password, online) VALUES('${user}', '${pass}', 0)`, err => {
            if(err){
              res.write(JSON.stringify({code: 1, msg: '5 内部错误，注册失败！'}));
              res.end();
            } else {
              res.write(JSON.stringify({code: 0, msg: ' fc 520 love you!'}));
              res.end();
            }
          });
        }
      });
    }
    console.log('request end!');
  } else if(pathname == '/login'){
    //登录接口
    console.log('request to login!');
  } else {
    fs.readFile(`www${req.url}`, (err,data) => {
      if(err) {
        res.writeHead(404);
        res.write('Not Found!');
      } else {
        res.write(data);
      }
      res.end();
    });
  }
});

httpServer.listen(8080);
