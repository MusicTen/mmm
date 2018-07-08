$(function(){
  var pageid = 1;
  var category = '';
  var pages= 0;
  function renderNav() {
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getcategorybyid",
      data: {
        categoryid: getSearch('categoryid')
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        category = info.result[0].category;
        var htmlStr = template('tmp',info);
        $(".product-list-title").html(htmlStr);
      }
    })
  }
  function render() {
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getproductlist",
      data: {
        categoryid: getSearch('categoryid'),
        pageid: pageid
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('tpl',info);
        $(".product-list ul").html(htmlStr);
        //获取后台返回的数据
        var total = info.totalCount;
        var pagesize = info.pagesize;
        //根据后台返回的数据动态渲染下拉菜单
        pages = Math.ceil(total / pagesize);
        var obj = {pages:pages};
        var arr = [];
        for (var i = 0; i < pages; i++) {
          arr.push(i + 1);
        }
        obj.arr = arr;
        console.log(obj)
        var htmlStr2 = template("tpl2", obj);
        $("#page").html(htmlStr2);
      },
    })
  }
  function renderProduct() {
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getproductlist",
      data: {
        categoryid: getSearch('categoryid'),
        pageid: pageid
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        info.category = category;
        var htmlStr = template('tpl',info);
        $(".product-list ul").html(htmlStr);
      }
    })
  }
  renderNav();
  render();
  //分页左右按钮
  $('.last').click(function(){
    if ( pageid <= 0 ) {
      pageid = pages+1
    }
    pageid--;
    console.log(pageid)
    renderProduct();
    $("#page option").eq(pageid-1).prop("selected",true);
  })
  $('.next').click(function(){
    if ( pageid > pages - 1 ) {
      pageid = 0
    }
    pageid++;
    console.log(pageid)
    renderProduct();
    //动态设置下拉菜单的值
    $("#page option").eq(pageid-1).prop("selected",true);
  })
  //点击下拉菜单中的值,渲染页面
  $("#page").change(function(){
    pageid = +$("option:selected").text().slice(0,-2);
    console.log(pageid)
    renderProduct();
  })
})