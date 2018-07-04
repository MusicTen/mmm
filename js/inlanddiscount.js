$(function(){
  function render() {
    $.ajax({
      type: "get",
      url: "http://192.168.16.81:9090/api/getinlanddiscount",
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('tmp',info);
        $('.main ul').html(htmlStr);
      }
    })
  }
  render();

  // 点击返回顶部
  $(".footer a:eq(2)").click(function(){
    console.log(123);
  })
})