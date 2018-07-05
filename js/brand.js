$(function(){
  
  function render() {
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
        $('.category-title').html(htmlStr);
      }
    })
  }
  render();

})