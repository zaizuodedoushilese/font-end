"use strict";

var a = 5;
var b = 12;

var arr = [{ a: a, b: b }, { b: b, a: a }];

arr.sort(function (json1, json2) {
  return json1.a - json2.b;
});

alert(arr[0].a);