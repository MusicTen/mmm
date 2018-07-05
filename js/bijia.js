$(function(){
  var category = getSearch('category');
  function render() {
    $.ajax({
      type: 'get',
      url: "http://192.168.16.81:9090/api/getproduct",
      data: {
        productid: getSearch('productid')
      },
      dataType: 'json',
      success: function(info) {
        console.log(info);
        info.category = category
        var htmlStr = template("tmp",info);
        $('.product-bijia').prepend(htmlStr);
      }
    })
    $.ajax({
      type: 'get',
      url: "http://192.168.16.81:9090/api/getproductcom",
      data: {
        productid: getSearch('productid')
      },
      dataType: 'json',
      success: function(info) {
        console.log(info);
        var htmlStr = template("tpl",info);
        $('.com-content').html(htmlStr);
      }
    })
  }
  render()


})