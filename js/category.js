$(function(){
  function render(){
    $.ajax({
      type: "get",
      url: "http://192.168.16.81:9090/api/getcategorytitle",
      dataType: 'json',
      success: function(info) {
        console.log(info);
        var htmlStr = template("tmp",info);
        $(".category-title").html(htmlStr);
      }
    })
  }
  render();
  // 点击一级分类
  $(".category-title").on("click",".title",function(){
    var id = $(this).data('id');
    $.ajax({
      type: "get",
      url: "http://192.168.16.81:9090/api/getcategory",
      data: {titleid:id},
      dataType: 'json',
      success: function(info) {
        console.log(info);
        var index = info.result[0].titleId
        var htmlStr = template("tpl",info);
        // .siblings().addClass("display-none")
        $(".category-content").eq(index).toggleClass("display-block").toggleClass("display-none").html(htmlStr);
      }
    })
    // 点击二级分类
    $(".category-title").on("click","")
  })


})