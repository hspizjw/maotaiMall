/*
*获取查看产品的编号
*/
function getproid(){
  var loc = location.href;
  var index = loc.indexOf("=");
  var pro_id = decodeURI(loc.substr(index+1));
  return pro_id;
}

/*点击加入购物车*/
$(".buyway .addinto").click(function () {
  savestorage();
  location.href = "../car/car.html";
})

/*
*本地存储数据
*/
function savestorage () {
  var id = getproid();
  var num = $(".addnum input").val();
  var price =  $(".product_right .money_num").html();
  var addcar_info = {
      "id":id,
      "num":num,
      "price":price
    }
  var storage = JSON.parse(window.localStorage.getItem("product"));
  if(!storage){
    window.localStorage.setItem("product", JSON.stringify([addcar_info]));
  }else {
    for(var i = 0 ; i < storage.length ; i++){
      if(storage[i].id==id){
        storage[i].num = (parseInt(storage[i].num) + num*1);
        window.localStorage.setItem("product", JSON.stringify(storage))
        return 0 ;
      }
    }
    storage.push(addcar_info);
    console.log(storage)
    window.localStorage.setItem("product", JSON.stringify(storage))
  }
}

/*通过ajax请求json数据，渲染页面*/
getajax(getproid())
function getajax (id) {
  $.ajax({
    type: "get",
    url:"../data/data.json",
    success:function (msg) {
      for(var i = 0 ; i < msg.length ; i++){
        if(msg[i].proid==id){
          var imgpath = msg[i].prodes;
          $(".small img").prop("src",imgpath.proimg[0].smallimg);
          $(".bigimg").prop("src",imgpath.proimg[0].bigimg);
          $(".product_right h2").html(imgpath.proname);
          $(".product_right h3").html("【"+imgpath.proname+"】");
          $(".product_right .money_num").html(imgpath.proprice);
          $(".size_option a").html(imgpath.taste);
          $(".limit span:nth-of-type(2)").html(imgpath.prolimit);
          $(".limit span:nth-of-type(3)").html(imgpath.savenum);
          $(".des_brand span:nth-of-type(2)").html(imgpath.probrand);
          $(".pro_name span:nth-of-type(2)").html(imgpath.proname);
          for(var j = 0 ; j < 4 ; j++){
            $(".littlemenu li:nth-of-type("+(j+1)+") img").prop("src",imgpath.proimg[j].botimg);
          }
          for(var j = 0 ; j < imgpath.desimg.length ; j++){
            $(".imgcontain").prepend("<img src='"+imgpath.desimg[j]+"'/>")
          }
          $(".littlemenu li").click(function(){//点击切换图片
            var index = $(this).index();
            $(".small img").prop("src",imgpath.proimg[index].smallimg);
            $(".bigimg").prop("src",imgpath.proimg[index].bigimg);
          })
        }
      }   
    }
  })
}

/*放大镜效果*/
//鼠标移入移出small盒子 显示或隐藏大图显示区big 和 mask
$("#small").on({"mouseenter":function(){
    $("#big").show();
    $("#mask").show();
    //$("#layer").show();
  },"mouseleave":function(){
    $("#big").hide();
    $("#mask").hide();
   //$("#layer").hide();
},"mousemove":function(e){
  var e = e || event;
  var x = e.pageX  - $("#small").offset().left - $("#mask").width()/2;
  var y = e.pageY  - $("#small").offset().top - $("#mask").height()/2;
  var mx = $("#small").width() - $("#mask").width();
  var my = $("#small").height() - $("#mask").height();
  //边界处理
  x = x<=0 ? 0 : x>=mx ? mx : x;
  y = y<=0 ? 0 : y>=my ? my : y;
  //大图宽度/小图宽度 = 大图偏移 / mask的偏移
  var bigimageX = -x * $(".bigimg").width() / $("#small").width();
  var bigimageY = -y * $(".bigimg").height() / $("#small").height();
  $("#mask").css({
    "left":x,
    "top":y,
  })
  $("#bigimg").css({
    "left" : bigimageX+"px",
    "top" : bigimageY+"px"
  })
  }
})

/*请求行政区数据,渲染*/
function address (addr, selector) {
  $.ajax({
  type:"get",
  url:"https://restapi.amap.com/v3/config/district?key=d648fb9a07d3426a6fcd4af119321b28&keywords="+addr+"&subdistrict=1&extensions=base",
  success:function (msg) {
    for (var i = 0; i < msg.districts[0].districts.length; i++) {
      $(selector).html("<a><dd>"+msg.districts[0].districts[i].name+"</dd></a>"+$(selector).html())
    }
  }
})
}
/*配送地址选择*/

//点击显示
//开关，为true时显示 false时隐藏
var addr_switch = true;
$(".addr .please_sec").click(function () {
  if(addr_switch){
    $(".addr_table").css({"display":"block"})
    $(".pro_box").css({"display":"block"}).siblings().css({"display":"none"})
    $(".addr_table .sec_pro").css({'border-color': 'rgb(204, 51, 65)',"border-bottom":"1px solid #fff"}).siblings().css({'border-color': '#e1e1e1','height':'24','border-bottom':'none'})
    addr_switch = false;
  }else{
    $(".addr_table").css({"display":"none"})
    addr_switch = true;
  }
})
//选择省
$(".pro_box a").on("click", $(this), function () {
  var pro = $(this).find("dd").html();
  $(".entytext span:first-child").html(pro)
  //加载市级数据,渲染
  address(pro, ".cit_box .citbox_con");
  $(".pro_box").css({"display":"none"}).next().css({"display":"block"});
  $(".addr_table .sec_ci").css({'border-color': 'rgb(204, 51, 65)',"border-bottom":"1px solid #fff"}).prev().css({'border-color': '#e1e1e1','height':'24','border-bottom':'none'})
})
//选择市
$(".cit_box").on("click", "dd" ,function (e) {
  var e = e || event;
    var city = $(this).html();
    $(".entytext span:first-child").html($(".entytext span:first-child").html()+'&nbsp;'+city);
    address(city, ".cou_box .coubox_con");
    $(".cit_box").css({"display":"none"}).next().css({"display":"block"});
    $(".addr_table .sec_cou").css({'border-color': 'rgb(204, 51, 65)',"border-bottom":"1px solid #fff"}).prev().css({'border-color': '#e1e1e1','height':'24','border-bottom':'none'})
})

//选择县
$(".coubox_con").on("click", "dd", function () {
    var country = $(this).html();
    $(".entytext span:first-child").html($(".entytext span:first-child").html()+'&nbsp;'+country);
    $(".addr_table").css({"display":"none"});
    addr_switch = true;
})

/*商品数量选择*/
var num = parseInt( $(".buy input").val() );
$(".buy .addnum a:first-child").click(function () {
  --num;
  if(num>=1){
    $(".buy input").val(num);
  }
  if(num<1){
    num = 1;
  }
})
$(".buy .addnum a:last-child").click(function () {
  ++num;
  var max_num = $(".limit span:nth-of-type(2)").html();
  if(num<=max_num){
    $(".buy input").val(num);
  }
  if(num>max_num){
    num = max_num;
    $(".black").css({"display":"block"})
  }
})
/*点击确定关闭超额提示*/
$(".black").on("click","span", function(e){
  var e = e ||event;
  e.stopPropagation();
  $(".black").animate({"opacity":0},500,function(){
    $(".black").css({"display":"none"});
  });
})
/* 商品介绍选项卡效果 */
$(".des_menu li").on("click", function() {
  $(this).addClass("current").siblings().removeClass("current");
  $(".main_con"+($(this).index()+1)+"").css({"display":"block"}).siblings().css({"display":"none"});
})




