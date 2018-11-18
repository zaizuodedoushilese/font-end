function ajax(method, url, fnSuc, fnFail){
  //1'创建ajax对象
  var oAjax;
  //不可使用XMLHttpRequest。区别属性（undfined）和变量(报错)
  if(window.XMLHttpRequest){              //非IE6
    oAjax = new XMLHttpRequest();
  } else {                               //IE6
    oAjax = new ActiveXObject('Microsoft.XMLHTTP');
  }

  //2'连接服务器
  //open(方法，文件名，异步)
  oAjax.open(method, url, true);

  //3'发送请求
  oAjax.send();

  //4'接受返回
  oAjax.onreadystatechange = function(){
    if(oAjax.readyState == 4){   //读取完成
      if(oAjax.status == 200){
        fnSuc(oAjax.responseText);
      } else {
        fnFail(oAjax.status);
      }
    }
  };
}
