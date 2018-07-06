$(function(){
  function render() {
    $.ajax({
      type: "get",
      url: "http://192.168.16.81:9090/api/getcouponproduct",
      data: {
        couponid: getSearch('couponId')
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('tmp',info);
        $('.main ul').html(htmlStr);
        var htmlStr1 = template('tpl',info);
        $('.win ul').html(htmlStr1);
      }
    })
  }
  render();
  //点击优惠券图片让模态框显示
  $(".main").on("click",'.forBig',function(){
    $('.modal').show();
  })
  //ajax全局变量,请求完成时执行以下代码
  $(document).ajaxStop(function(){
    //模态框中的轮播图

    var lis = document.querySelectorAll(".win li");
    var liWidth = lis[0].offsetWidth || 256;
    console.log(liWidth);
    var prv = lis.length-1;
    var now = 0;
    var next = 1;
    lis[prv].style.transform = "translate("+ (-liWidth) +"px)";
    lis[now].style.transform = "translate(0px)";
    lis[next].style.transform = "translate("+ liWidth +"px)";
    //点击左按钮
    $('.fl-icon').click(function(){
      prv = now;
      now = next; 
      next++;
      if(next>lis.length-1){
        next=0
      }
      console.log(prv,now,next)
      lis[prv].style.transition = "all 1s";
      lis[now].style.transition = "all 1s";
      lis[next].style.transition = "none";
      lis[prv].style.transform = "translate("+ (-liWidth) +"px)";
      lis[now].style.transform = "translate(0px)";
      lis[next].style.transform = "translate("+ liWidth +"px)";
    })
    //点击右按钮
    $('.fr-icon').click(function(){
      next = now;
      now = prv; 
      prv--;
      if(prv<0){
        prv=lis.length-1;
      }
      console.log(prv,now,next)
      lis[prv].style.transition = "none";
      lis[now].style.transition = "all 1s";
      lis[next].style.transition = "all 1s";
      lis[prv].style.transform = "translate("+ (-liWidth) +"px)";
      lis[now].style.transform = "translate(0px)";
      lis[next].style.transform = "translate("+ liWidth +"px)";
    })
    //点击隐藏
    $(".modal").click(function(e){
      $(this).hide();
    })
    //阻止事件捕获
    $('.win').click(function(e){
      e.stopPropagation()
    })
  })

})