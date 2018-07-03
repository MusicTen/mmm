$(function(){
















  
  // 获取地址栏拼接的数据函数封装
  function getSearch(keys){
    var search = location.search;//?categoryid=11&category=数码相机&pageid=1
    search = search.slice(1);
    search = decodeURI(search);
    var arr = search.split('&');
    var obj = {};
    arr.forEach(function(v,i){
      var key = v.split('=')[0];
      var value = v.split('=')[1];
      obj[key] = value;
    })
    return obj[keys];
  }
})