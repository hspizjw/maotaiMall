/*判断是否登陆*/
islogin();
function islogin(){
  if (JSON.parse(window.localStorage.getItem('userInfo'))) {
      userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      $("nav ul li").eq(1).css({"display":"block"}).next().css({"display":"none"});
      $("nav ul li .user").html(userInfo.username);
  }else{
    $("nav ul li").eq(1).css({"display":"none"}).next().css({"display":"block"});
  }
}
/*退出登录*/
$("nav .loginout").click(function () {
  window.localStorage.removeItem('userInfo')
})

/*顶部广告点击关闭*/
$(".shut").click(function () {
  $(".indextop").css({"display":"none"});
})

//页面搜索框自动联想
var html = $(".think_con").html();
$(".search .search_iptval").keyup(function () {
  $(".ser_think").slideDown();
  var search = $(".search_iptval").val();
  think( ".think_con", ".search_con .ser_think" ,search, html);
})
//失去焦点时关闭联想
.blur(function () {
  $(".search_con .ser_think").slideUp()
})
//点击关闭联想
$(".ser_think span").click(function () {
  $(".search_con .ser_think").slideUp()
})
//侧边栏划过显示
$(".sidebar a").on("mouseenter", $(this), function () {
  $(this).find("div").stop().animate({"right":"35"},100)
}).on("mouseleave", $(this), function () {
  $(this).find("div").stop().animate({"right":"-138"},100)
})
//侧边栏回顶部
$(".bottom .backtop").click(function () {
  $("body,html").animate({"scrollTop":"0"},2000)
})
//侧边栏点击购物车 显示内容
var flag = true;
$(".sidebar a:first-child").on("click", $(this), function () {
  if(flag){
    $(".sidebar").animate({"right":"0"}, 500, function () {
      flag = false ;
    })
  }else{
    $(".sidebar").animate({"right":"-285"}, 500, function () {
      flag = true;
    })
  }
})
//点击关闭 关闭侧边栏
$(".hidden .head a").click(function () {
    $(".sidebar").animate({"right":"-285"}, 500, function () {
      flag = true;
    });
})

