let mod2 = require('./2');    //当前自定义必须加 './'， 区分于系统模块如'http'
let mod3 = require('3');      //node_modules可以不加

console.log(mod2.a + mod3.b);

const nmath = require('wzx_math');
console.log('namth test sum ' + nmath.sum(11, 45));
console.log('namth test divide ' + nmath.divide(99, 9));
