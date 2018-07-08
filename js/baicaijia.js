$(function(){
  function renderTitle() {
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getbaicaijiatitle",
      dataType: 'json',
      success: function(info){
        console.log(info);
        var htmlStr = template('tmp',info);
        $(".nav ul").html(htmlStr);

        //数据请求成功后动态设置ul的宽度
        var ul = document.querySelector(".nav ul");
        var li = document.querySelectorAll(".nav ul li");
        console.log(li);
        var ulWidth = 0;
        li.forEach(function(v,i){
          ulWidth += v.offsetWidth;
        });
        var liWidth = li[0].offsetWidth;
        ul.style.width = ulWidth + 60 + 'px';//li不等宽计算有误差,加上余量
        //实现导航栏区域滚动
        //1. 给ul注册touch相关的三个事件（注意清除浮动，不然触发不到touchmove事件）
        //2. 在touchstart中
            //1. 记录开始的位置
        //2. 在touchmove中
            //1. 记录移动的距离
            //2. 清除过渡
            //3. 让ul跟着移动
        //3. 在touchend中
            //1. 记录移动的距离
            //3. 添加过渡
            //4. 执行动画
        var startX = 0;
        var currentX = 0; //记录ul当前坐标
        var ul_box = document.querySelector(".nav .ul_box");
        ul.addEventListener('touchstart',function(e){
          startX = e.touches[0].clientX;
        })
        ul.addEventListener('touchmove',function(e){
          var distanceX = e.touches[0].clientX - startX;
          console.log(distanceX)
          ul.style.transtion = 'none';
          ul.style.transform = "translateX("+(currentX+distanceX)+"px)";
        })
        // touchend
        // 1. 更新 currentY, 在原有currentY基础上加上本次移动的距离,记录当前 ul 的位置
        // 2. 判断是否需要回弹
        ul.addEventListener('touchend',function(e){
          var distanceX = e.changedTouches[0].clientX - startX;
          currentX += distanceX;  // 将本次移动的距离更新到 currentY 中
          if(currentX<-(ul.offsetWidth-ul_box.offsetWidth)) {
            currentX = -(ul.offsetWidth-ul_box.offsetWidth)
          }
          if(currentX > 0) {
            currentX = 0;
          }
          ul.style.transtion = 'all 1s';
          ul.style.transform = "translateX("+currentX+"px)";
        })
      }
    })
  }
  function renderProducts(titleid) {
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getbaicaijiaproduct",
      data: {
        titleid : titleid
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
  renderProducts(0)
  //点击导航栏,实现'table栏切换'
  $('.nav ul').on('click','li',function(){
    $(this).addClass('current').siblings().removeClass('current');
    renderProducts($(this).data('id'));
  });
  // $('.nav ul').on('mouseup','li',function(){
  //   $(this).removeClass('bgc');
  //   console.log(123);
  // });
})

;$(function(){
  /*
  * iScroll使用注意事项
  * 1. 必须要有很长的子元素, 要有一个有宽高的父容器
  * 2. 父容器只能有一个子元素, 如果有多个, 其他将会被忽略
  * 3. (1) 需要在 onload 中, onload 可以保证图片加载完了, 进行 IScroll 初始化,
  *        那么计算子盒子宽高时, 才是准确的
  *    (2) 需要清除浮动, 保证计算准确
  * */
})