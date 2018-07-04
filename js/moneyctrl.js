$(function () {
  var pageid=1;
  var total = 0;
  var pagesize = 0;
  function render() {
    $.ajax({
      type: "get",
      url: "http://192.168.16.81:9090/api/getmoneyctrl",
      data: {
        pageid: pageid
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template("tmp", info);
        $(".product-list ul").html(htmlStr);

        //获取后台返回的数据
        total = info.totalCount;
        pagesize = info.pagesize;
        //根据后台返回的数据动态渲染下拉菜单
        var pages = Math.ceil(total / pagesize);
        var obj = {pages:pages};
        var arr = [];
        for (var i = 0; i < pages; i++) {
          arr.push(i + 1);
        }
        obj.arr = arr;
        console.log(obj)
        var htmlStr2 = template("tpl", obj);
        $("#page").html(htmlStr2);
      }
    })
  }
  function renderProduct() {
    $.ajax({
      type: "get",
      url: "http://192.168.16.81:9090/api/getmoneyctrl",
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
    if(pageid<1){
      pageid=pagesize+1
    }
    pageid--;
    renderProduct();
    $("#page option").eq(pageid-1).prop("selected",true);
  })
  $('.next').click(function(){
    if(pageid>pagesize-1){
      pageid=0
    }
    pageid++;
    renderProduct();
    //动态设置下拉菜单的值
    $("#page option").eq(pageid-1).prop("selected",true);
  })
})