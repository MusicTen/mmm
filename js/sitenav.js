$(function(){
  
  function render() {
    $.ajax({
      type: "get",
      url: "http://192.168.16.81:9090/api/getsitenav",
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('tmp',info);
        $('.main ul').html(htmlStr);
      }
    })
  }
  render();
})