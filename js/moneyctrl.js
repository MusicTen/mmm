$(function () {
  var pageid= 0;
  var pages= 0;
  function render() {
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getmoneyctrl",
      data: {
        pageid: pageid
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template("tmp", info);
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
        var htmlStr2 = template("tpl", obj);
        $("#page").html(htmlStr2);
      },
    })
  }
  function renderProduct() {
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getmoneyctrl",
      data: {
        pageid: pageid
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template("tmp", info);
        $(".product-list ul").html(htmlStr);
      }
    })
  }
  render();
  
  //上一页下一页点击功能
  // var pagecurrent = $('option').find('selected').text();
  // console.log(pagecurrent)
  $('.last').click(function(){
    if ( pageid <= 0 ) {
      pageid = pages
    }
    pageid--;
    console.log(pageid)
    renderProduct();
    $("#page option").eq(pageid).prop("selected",true);
  })
  $('.next').click(function(){
    if ( pageid > pages - 2 ) {
      pageid = -1
    }
    pageid++;
    console.log(pageid)
    renderProduct();
    //动态设置下拉菜单的值
    $("#page option").eq(pageid).prop("selected",true);
  })
  //点击下拉菜单中的值,渲染页面
  $("#page").change(function(){
    pageid = +$("option:selected").text().slice(0,-3)-1 ;
    console.log(pageid)
    renderProduct();
  })

})