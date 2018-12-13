const mysql = require('mysql');

//仅仅一个连接，会造成拥堵
/* let db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'websocket'
  }
); */

//创建连接池
let db = mysql.createPool(
  {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'websocket'
  }
);

//查询
db.query('SELECT * FROM user_table', (err, data) => {
  if(err){
    console.log(err);
  } else {
    console.log(JSON.stringify(data));
  }
});
