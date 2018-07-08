$(function(){
  function renderShop() {
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getgsshop",
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('tmp1',info);
        $('.shop').html(htmlStr);
       
      }
    })
  }
  function renderArea() {
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getgsshoparea",
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('tmp2',info);
        $('.area').html(htmlStr);
      }
    })
  }
  function renderProduct(shopid,areaid) {
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getgsproduct",
      data: {
        shopid : shopid || 1,
        areaid : areaid || 1 
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('tpl',info);
        $('.product').html(htmlStr);
        $('.nav-sub li:first-child').find('span').text($(".shop .icon a").text());
        $('.nav-sub li:nth-child(2)').find('span').text($(".area .icon a").text().slice(0,2));
      }
    })
  }
  renderShop()
  renderArea()
  renderProduct(2,2)
  
  //导航栏点击事件
  //二级菜单显示
  $('.nav-sub li:first-child').click(function(){
    $('.area').slideUp();
    $('.price').slideUp();
    $('.shop').slideToggle();
  });
  $('.nav-sub li:nth-child(2)').click(function(){
    $('.shop').slideUp();
    $('.price').slideUp();
    $('.area').slideToggle();
  });
  $('.nav-sub li:nth-child(3)').click(function(){
    $('.shop').slideUp();
    $('.area').slideUp();
    $('.price').slideToggle();
  });
  //点击二级菜单,加对勾(icon类),获取id重新渲染页面
  $('.shop').on('click','li',function(){
    $(this).toggleClass('icon').siblings().removeClass('icon');
    $('.shop').slideUp();
    var shopid = $(this).data('shopid');
    var areaid = $(".area .icon").data('areaid');
    console.log(shopid,areaid)
    renderProduct(shopid,areaid)
  });
  $('.area').on('click','li',function(){
    $(this).toggleClass('icon').siblings().removeClass('icon');
    $('.area').slideUp();
    var shopid = $(".shop .icon").data('shopid');
    var areaid = $(this).data('areaid');
    console.log(shopid,areaid)
    renderProduct(shopid,areaid)
  })
})