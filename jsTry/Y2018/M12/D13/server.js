const http = require('http');
//const io = require('socket.io');
const url = require('url');
const mysql = require('mysql');
const fs = require('fs');
const reg = require('./regs');

let db = mysql.createPool(
  {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'websocket'
  }
);

let httpServer = http.createServer((req, res) => {
  //res.url='/reg?user=wzx&pass=djksj';
  console.log(req.url);
  let {pathname, query} = url.parse(req.url, true);
  if(pathname == '/reg'){
    //注册接口
    console.log('request to register!');
    let {user, pass} = query;
    //1、数据校验
    if(!reg.username.test(user)){
      res.write(JSON.stringify({code: 1, msg: 'username is not well-formed!'}));
      res.end();
    } else if(!reg.password.test(pass)) {
      res.write(JSON.stringify({code: 1, msg: 'password is not well-formed!'}));
      res.end();
    } else {
      //2、校验用户名重复
      db.query(`SELECT ID FROM user_table WHERE username='${user}'`, (err, data) => {
        if(err) {
          res.write(JSON.stringify({code: 1, msg: 'database inner error!'}));
          res.end();
        } else if (data.length > 0) {
          res.write(JSON.stringify({code: 1, msg: 'username has been registered!'}));
          res.end();
        } else {
          //3、注册数据库
          db.query(`INSERT INTO user_table (username, password, online) VALUES('${user}', '${pass}', 0)`, err => {
            if(err){
              res.write(JSON.stringify({code: 1, msg: 'database inner error, fail to register!'}));
              res.end();
            } else {
              res.write(JSON.stringify({code: 0, msg: 'congratulation! Success to register'}));
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
    let {user, pass} = query;
    //1、校验
    if(!reg.username.test(user)) {
      res.write(JSON.stringify({code: 1, msg: 'username is not well-formed!'}));
      res.end();
    } else if(!reg.password.test(pass)) {
      res.write(JSON.stringify({code: 1, msg: 'password is not well-formed!'}));
      res.end();
    } else {
      //2、取数据
      db.query(`SELECT ID,password FROM user_table WHERE username='${user}'`, (err, data) => {
        if(err) {
          res.write(JSON.stringify({code: 1, msg: 'database inner error!'}));
          res.end();
        } else if(data.length == 0) {
          res.write(JSON.stringify({code: 1, msg: 'username has not been registered!'}));
          res.end();
        } else if (data[0].password != pass) {
          res.write(JSON.stringify({code: 1, msg: 'username or password are incorrect!'}));
          res.end();
        } else {
          //3、设置登录状态
          db.query(`UPDATE user_table SET online=1 WHERE ID=${data[0].ID}`, err =>{
            if(err) {
              res.write(JSON.stringify({code: 1, msg: 'database inner error!'}));
              res.end();
            } else {
              res.write(JSON.stringify({code: 0, msg: 'success to login!'}));
              res.end();
            }
          });
        }
      });
    }
    console.log('login end!');
  } else {
    fs.readFile(`www${pathname}`, (err,data) => {
      if(err) {
        console.log('err');
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
