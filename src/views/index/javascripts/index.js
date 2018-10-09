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


/*搜索框自动联想功能*/
//selector1要添加a标签的div
//selector2联想框  没有数据时收起
//val搜索框中的内容
//原来联想框中的内容
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

/*吸顶效果*/
$(window).scroll(function () {
  var stop = $(document).scrollTop();
  if(stop > 280){
    $(".fixed_search").slideDown(500).css({"position":"fixed","top":"0"})
  }else{
    $(".fixed_search").slideUp(500).css({"position":"absolute"})
  }
})
/*吸顶自动联想*/
var htmlfix = $(".fixed_search .fix_think").html();
$(".fixed_search .search_ipt_con").keyup(function () {
  $(".fix_think").slideDown();
  var search = $(".fixed_search .search_ipt_con").val();
  think( ".fix_think", ".fix_think" ,search, htmlfix);
})
//失去焦点时关闭联想
$(".fixed_search .search_ipt_con").blur(function () {
  $(".fix_think").slideUp()
})
//点击关闭联想
$(".fix_think span").click(function () {
  $(".fix_think").slideUp()
})

/*banner轮播图 */
//自动轮播
var i = 0 ;
setInterval(function () {
  $(".banner_ul li").eq(i).css({"display" : "block"}).siblings().css({"display":"none"});
  $(".dot a").eq(i).css({"background":"#CC3341"}).siblings().css({"background":"rgba(255,255,255,.5)"});
  i++;
  if(i >= 4){
    i=0;
  }
} , 3000)
//点击dot切换图片
$(".dot a").on("click", $(this), function (e) {
  var e = e || event ;
  e.stopPropagation();
  var index = $(this).index();
  $(this).css({"background":"#CC3341"}).siblings().css({"background":"rgba(255,255,255,.5)"});
  $(".banner_ul li").eq(index).css({"display" : "block"}).siblings().css({"display":"none"});
  return false;
})

//banner上部菜单点击效果
$(".pro_class ul li").click(function () {
  $(this).find("a").css({"color":"#cc3341"}).end().siblings().find("a").css({"color":"#333"})
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
//侧边栏回顶部
$(".bottom .backtop").click(function () {
  $("body,html").animate({"scrollTop":"0"},2000)
})


//点击关闭 关闭侧边栏
$(".hidden .head a").click(function () {
    $(".sidebar").animate({"right":"-285"}, 500, function () {
      flag = true;
    });
})

/*茅台品牌馆点击*/
//向左
var left = 0; 
$(".ban_bot .leftbtn").click(function () {
  if((left+135) <= 0 ){
    left = left + 135;
    $(".ban_bot ul").animate({"left":left},200);
  }
})
//向右
$(".ban_bot .rightbtn").click(function () {
  if((left-135)>=(-1080))
    left = left - 135;
    $(".ban_bot ul").animate({"left":left},200);
})

/*
*茅台王子酒，茅台迎宾酒、赖茅酒的页面跳转传参
*/
$(".ban_bot .title1").click(function () {
  geturl("../details/details.html", "id", "1");
})
$(".ban_bot .title2").click(function () {
  geturl("../details/details.html", "id", "2");
})
$(".ban_bot .title3").click(function () {
  geturl("../details/details.html", "id", "3");
})
/*拼接url,并跳转*/
function geturl(url, key, value) {
  url = url +"?"+key+"="+value;
  location.href = url;
}
/*特惠专区商品点击*/
discountinfo(1, ".discount ul li p", ".discount ul li span" )
function discountinfo(id, sec1, sec2) {
  $.ajax({
    type:"get",
    url:"../data/data.json",
    success: function (msg) {
      for( var i = 0 ; i < msg.length; i++){
        if(msg[i].proid == id){
          let  path = msg[i].prodes;
          $(sec1).html(path.proname);
          $(sec2).html("￥"+path.proprice);
        }
      }
    }
  })
}
 $(".discount ul li").click(function () {
  location.href = "../details/details.html?id=1";
 })
/*茅台迎宾酒*/
discountinfo(2, ".one_pro .right ul li p", ".one_pro .right ul li span" )
$(".one_pro .right ul li").click(function () {
  location.href = "../details/details.html?id=2";
 })
/*赖茅*/
discountinfo(3, ".first .right ul li p", ".first .right ul li span" )
$(".first .right ul li").click(function () {
  location.href = "../details/details.html?id=3";
 })
/*习酒*/
discountinfo(4, ".second .right ul li p", ".second .right ul li span" )
$(".second .right ul li").click(function () {
  location.href = "../details/details.html?id=4";
 })
