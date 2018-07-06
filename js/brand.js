$(function(){
  var productid;
  function renderBrand() {
    $.ajax({
      type: "get",
      url: "http://192.168.16.81:9090/api/getbrand",
      data: {
        brandtitleid: getSearch("brandtitleid")
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('tmp',info);
        $('.brand_list ul').html(htmlStr);
      }
    })
  }

  function renderProductlist() {
    $.ajax({
      type: "get",
      url: "http://192.168.16.81:9090/api/getbrandproductlist",
      data: {
        brandtitleid: getSearch('brandtitleid'),
        pagesize: 4
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        productid = info.result[0].productId;
        var htmlStr = template('tpl',info);
        $('.product-list ul').html(htmlStr);
      },
      complete: function() {
        renderProductcom()
      }
    })
  }
  
  function renderProductcom() {
    $.ajax({
      type: "get",
      url: "http://192.168.16.81:9090/api/getproductcom",
      data: {
        productid: productid
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('com',info);
        $('.com-lists ul').html(htmlStr);
      }
    })
  }
  renderBrand()
  renderProductlist()

})