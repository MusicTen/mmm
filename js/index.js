$(function(){
  function render() {
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getindexmenu",
      dataType: "json",
      success: function(info){
        console.log(info);
        var htmlStr = template("tmp",info);
        $(".menu").html(htmlStr);
      }
    })
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getmoneyctrl",
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
    // $(".menu_item:nth-child(n+9)").toggleClass("display-none").toggleClass("display-block");
    $(".menu_item:nth-child(n+9)").slideToggle();
  })
})