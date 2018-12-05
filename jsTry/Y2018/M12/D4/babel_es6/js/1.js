let a = 5;
const b = 12;

let arr = [{a,b}, {b,a}];

arr.sort((json1, json2) => json1.a - json2.b);

alert(arr[0].a);
