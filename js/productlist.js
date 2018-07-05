$(function(){
  var pageid = 1;
  var category = '';

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
        category = info.result[0].category;
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
        info.category = category;
        var htmlStr = template('tpl',info);
        $(".product-list ul").html(htmlStr);
      }
    })
  }
  renderNav();
  renderProduct();

  //分页
  $('.last').click(function(){
    if(pageid<1){
      pageid=4
    }
    pageid--;
    renderProduct();
    $("#page option").eq(pageid-1).prop("selected",true);
  })
  $('.next').click(function(){
    if(pageid>2){
      pageid=0
    }
    pageid++;
    renderProduct();
    //动态设置下拉菜单的值
    $("#page option").eq(pageid-1).prop("selected",true);
  })

})