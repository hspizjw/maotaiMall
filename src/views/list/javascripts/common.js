islogin();
function islogin(){
  if(getCookie()){
    $("nav ul li").eq(1).css({"display":"block"}).next().css({"display":"none"});
    $("nav ul li .user").html(getCookie());
  }else{
    $("nav ul li").eq(1).css({"display":"none"}).next().css({"display":"block"});
  }
}
function getCookie(){
  var str = document.cookie ;
  if(str){
    str.replace( /\s/g, "" );
    var arr = str.split(";");
    for( var i = 0 ; i < arr.length ; i++ ){
        var item = arr[i].split("=");
        return item[1]
        console.log(item[1])
    }
    return [];
  }else{
    return 0 ;
  }
}
/*退出登录*/
$("nav .loginout").click(function () {
  //$.cookie('id','1'); //存cookie
  $.removeCookie('naem') //删除cookie
})
function think(selector1, selector2, val, html) {
  if(val.replace(/\s/g,"")){
    $.ajax({
      type:"get",
      url:'https://i.emaotai.cn/smartsales-search-application/api/v1/smartsales/search/suggest?keyword='+val+'&type=item&appCode=1&_t=1537182437248',
      success:function (msg) {
        if(msg){
          $(selector1).html(html);
          for (var i = 0; i < msg.data.length; i++){
            $(selector1).html("<a>"+msg.data[i].keyword+"</a>"+$(selector1).html());
          }
        }
        else{
        }
      }
    })
  }
  if(val==""){
    $(selector1).html(html);
    $(selector2).slideUp()
  }
}
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

