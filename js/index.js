$(function(){
  function render() {
    $.ajax({
      type: "get",
      url: "http://192.168.16.81:9090/api/getindexmenu",
      dataType: "json",
      success: function(info){
        console.log(info);
        var htmlStr = template("tmp",info);
        $(".menu").html(htmlStr);
      }
    })
    $.ajax({
      type: "get",
      url: "http://192.168.16.81:9090/api/getmoneyctrl",
      dataType: "json",
      success: function(info){
        console.log(info);
        var htmlStr = template("tpl",info);
        $(".product ul").html(htmlStr);
      }
    })
  }
  render();
  $(".menu").on("click","div:nth-child(8) a",function(){
    console.log(112)
    $(".menu_item:nth-child(n+9)").toggleClass("display-none").toggleClass("display-block");
  })
})