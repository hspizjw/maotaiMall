/*
*获取本地存储数据，渲染页面
*/
var storage = JSON.parse(window.localStorage.getItem("product"));
for(var i = 0 ; i < storage.length ; i++){
  var id = storage[i].id;
  var num = storage[i].num;
  getajax (id, num);
}

/*
*ajax调用数据
*/
function getajax (id, num) {
  $.ajax({
    type:"get",
    url:"../data/data.json",
    success:function (msg) {
      for(var i = 0 ; i < msg.length ; i++){
        if(msg[i].proid == id){
          var imgpath = msg[i].prodes;
          $(".list").prepend(`
        <div class="pro_list" id="${id}">
            <div class="pro_list_left">
              <input type="checkbox" checked="checked" />
              <a class="list_img">
                <img src="${imgpath.proimg[0].smallimg}">
              </a>
              <div class="list_pro_des">
                <a>${imgpath.proname}</a>
                <span>imgpath.taste</span>
                <div class="pro_back">
                  <img src="https://prod-oss.emaotai.cn/front-assets/assets/image/cart/7yes.png">
                  <span>支持7天无理由退换货</span>
                </div>
              </div>
            </div>
            <div class="pro_price">￥${imgpath.proprice}</div>
            <div class="pro_num">
              <a>-</a>
              <input type="text" value="${num}" />
              <a>+</a>
            </div>
            <div class="sum_price">￥${imgpath.proprice*num}</div>
            <div class="delete">
              <a>删除</a>
              <a>加入我的收藏</a>
            </div>
            </div>`);
        }
      }
    }
  })
} 

/*
*全选
*/
$(".all_check input").click(function () {
  var state = $(this).prop("checked");
  $(".pro_list_left input").prop("checked",state);
  $(".all_check input").prop("checked",state);
  change_sun_num ()
})
/*一个没选中则不全选,商品结束总价钱发生变化*/
$(".list").on("click", ".pro_list_left input", function () {
  change_sun_num ();

})

function change_sun_num () {
  let num = 0 ;
  let length = ($(".pro_list_left input").length) ;
  let sum_money = 0 ;
  var flag = true;
  for(var  i = 0 ; i < length ; i++ ){
    let ipt = $(".pro_list_left input").eq(i);
    if(ipt.prop("checked")==true){
      let val = ipt.parent().parent().find(".pro_num input").val();
      num += val*1;
      let money  = ipt.parent().parent().find(".pro_price").html().substr(1);
      sum_money += money * val ;
    }else{
      flag = false;
      $(".all_check input").prop("checked",false);
    }
  }
  if(flag){
    $(".all_check input").prop("checked",true);
  }
  $(".computed span:first-child").html(num)
  $(".computed span:last-child").html("￥"+sum_money)
}


/*
*点击删除单个
*/
$(".list").on("click",".delete", function () {
  let id = $(this).parent().prop("id");
  del_pro (id);
  history.go(0);
})
/*
*删除所选中的商品
*/
$(".set_left a").click(function () {
  let length = ($(".pro_list_left input").length) ;
  for(var  i = 0 ; i < length ; i++ ){
    let ipt = $(".pro_list_left input").eq(i);
    if(ipt.prop("checked")==true){
      let id = ipt.parent().parent().prop("id");
      del_pro (id);
    }
  }
  if($(".list").children().length==0){
    $(".all_check input").prop("checked",false);
  }
  history.go(0);
})

/*删除商品*/
function del_pro (id) {
  let localstorage = JSON.parse(window.localStorage.getItem("product"));
    for(var  i = 0 ; i < localstorage.length ; i ++){
      if(localstorage[i].id == id){
       localstorage.splice(i,1);
       window.localStorage.setItem("product", JSON.stringify(localstorage));
       $(this).parent().remove();
      }
   }
}
/*
*件数的增加减少
*/
//减少
$(".list").on("click", ".pro_num a:first-child", function () {
  let num = $(this).siblings("input").val();
  let localstorage = JSON.parse(window.localStorage.getItem("product"));
  let id = $(this).parent().parent().prop("id")
  --num;
  if(num<1){
    num=1;
  }
  $(this).siblings("input").val(num);
  for(var  i = 0 ; i < localstorage.length ; i ++){
      if(localstorage[i].id == id){
        localstorage[i].num = num ;
      }
  }
  let price = $(this).parent().siblings(".pro_price").html().substr(1);
  $(this).parent().siblings(".sum_price").html("￥"+(price*num))
  window.localStorage.setItem("product", JSON.stringify(localstorage));
  change_sun_num();
})
//增加
$(".list").on("click", ".pro_num a:last-child", function () {
  let num = $(this).siblings("input").val();
  let localstorage = JSON.parse(window.localStorage.getItem("product"));
  let id = $(this).parent().parent().prop("id")
  ++num;
  $(this).siblings("input").val(num);
  for(var  i = 0 ; i < localstorage.length ; i ++){
      if(localstorage[i].id == id){
        localstorage[i].num = num ;
      }
  }
  let price = $(this).parent().siblings(".pro_price").html().substr(1);
  $(this).parent().siblings(".sum_price").html("￥"+(price*num))
  window.localStorage.setItem("product", JSON.stringify(localstorage));
  change_sun_num();
})
/*
*总件数，总价钱
*/
getsumnum();
function  getsumnum(){
  let localstorage = JSON.parse(window.localStorage.getItem("product"));
  let num = 0 ;
  let money = 0 ;
  for(var  i = 0 ; i < localstorage.length ; i ++){
     num += localstorage[i].num*1;
     money += localstorage[i].num * localstorage[i].price;
  }
  $(".computed span:last-child").html("￥"+money);
  $(".computed span:first-child").html(num);
  setTimeout(function(){
   if($(".list").children().length==0){
    $(".all_check input").prop("checked",false);
  }
  },500)
}

