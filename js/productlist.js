$(function(){
  var pageid = 1;
  function renderNav() {
    $.ajax({
      type: "get",
      url: "http://192.168.16.81:9090/api/getcategorybyid",
      data: {
        categoryid: getSearch('categoryid')
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        var htmlStr = template('tmp',info);
        $(".product-list-title").html(htmlStr);
      }
    })
  }
  function renderProduct() {
    $.ajax({
      type: "get",
      url: "http://192.168.16.81:9090/api/getproductlist",
      data: {
        categoryid: getSearch('categoryid'),
        pageid: pageid
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        var htmlStr = template('tpl',info);
        $(".product-list ul").html(htmlStr);
      }
    })
  }
  renderNav();
  renderProduct();


  $('.last').click(function(){
    if(pageid<1){
      pageid=4
    }
    pageid--;
    renderProduct();
  })
  $('.next').click(function(){
    if(pageid>2){
      pageid=0
    }
    pageid++;
    renderProduct();
    //动态设置下拉菜单的值
    $("#page option").eq(2).prop("selected",true);
  })











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