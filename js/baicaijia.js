$(function(){
  function renderTitle() {
    $.ajax({
      type: "get",
      url: "http://192.168.16.81:9090/api/getbaicaijiatitle",
      dataType: 'json',
      success: function(info){
        console.log(info);
        var htmlStr = template('tmp',info);
        $(".nav ul").html(htmlStr);
      }
    })
  }
  function renderProducts() {
    $.ajax({
      type: "get",
      url: "http://192.168.16.81:9090/api/getbaicaijiaproduct",
      data: {
        titleid : 1
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        var htmlStr = template('tpl',info);
        $(".main ul").html(htmlStr);
      }
    })
  }
  renderTitle()
  renderProducts()
})