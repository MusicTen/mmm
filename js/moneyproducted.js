$(function(){
  
  function render() {
    $.ajax({
      type: "get",
      url: "http://192.168.16.81:9090/api/getmoneyctrlproduct",
      data: {
        productid: getSearch('productid')
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('tmp',info);
        $('.main').html(htmlStr);
      }
    })
  }
  render();



})