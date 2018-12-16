const url = require('url');

let str = "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=react&rsv_pq=ec1660ae00015d3a&rsv_t=5712zMr7201xnRgZOdGu0%2BRqW4F8j%2FoyoedEcz3zummB5egtGdKOVTLkYYc&rqlang=cn&rsv_enter=1&rsv_sug3=5&rsv_sug1=3&rsv_sug7=101"

console.log(url.parse(str, true));
