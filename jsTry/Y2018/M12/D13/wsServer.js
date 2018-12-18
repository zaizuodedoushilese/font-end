const http = require('http');
const mysql = require('mysql');
const io = require('socket.io');
const fs = require('fs');
const regs = require('./regs');

//db server
let db = mysql.createPool(
  {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'websocket'
  }
);

//http server
let httpServer = http.createServer((req, res) => {
  fs.readFile(`www${req.url}`, (err, data) => {
    if(err) {
      res.writeHead(404);
      res.write('Not Found!');
    } else {
      res.write(data);
    }
    res.end();
  });
});
httpServer.listen(8080);

//websocket server
let wsServer = io.listen(httpServer);
wsServer.on('connection', sock => {
  //注册
  sock.on('reg', (user, pass) => {
    if(!regs.username.test(user)) {
      sock.emit('reg_ret', 1, '用户名不符合规范');
    } else if (!regs.password.test(pass)) {
      sock.emit('reg_ret', 1, '密码不符合规范');
    } else {
      db.query(`SELECT ID FROM user_table WHERE username='${user}'`, (err, data) => {
        if(err) {
          sock.emit('reg_ret', 1, '数据库内部错误');
        } else if(data.length > 0) {
          sock.emit('reg_ret', 1, '该用户名已经被注册');
        } else {
          db.query(`INSERT INTO user_table (username, password, online) VALUES('${user}', '${pass}', 0)`, err => {
            if(err) {
              sock.emit('reg_ret', 1, '数据库内部错误');
            } else {
              sock.emit('reg_ret', 0, '注册成功');
            }
          });
        }
      });
    }
  });

  //登录
  sock.on('login', (user, pass) => {
    if(!regs.username.test(user)) {
      sock.emit('login_ret', 1, '用户名不符合规范！');
    } else if(!regs.password.test(pass)) {
      sock.emit('login_ret', 1, '密码不符合规范！');
    } else {
      db.query(`SELECT ID,password FROM user_table WHERE username='${user}'`, (err, data) => {
        if(err) {
          sock.emit('login_ret', 1, '数据库内部错误！');
        } else if (data.length == 0) {
          sock.emit('login_ret', 1, '该用户名还未注册！');
        } else if (data[0].password != pass) {
          sock.emit('login_ret', 1, '用户名或密码错误！');
        } else {
          db.query(`UPDATE user_table SET online=1 WHERE ID=${data[0].ID}`, err =>{
            if(err) {
              sock.emit('login_ret', 1, '数据库内部错误！');
            } else {
              sock.emit('login_ret', 0, '登录成功！');
            }
          });
        }
      });
    }

  });
});
