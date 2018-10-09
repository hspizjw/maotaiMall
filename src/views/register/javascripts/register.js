window.onload = function () {
	if (JSON.parse(window.localStorage.getItem('userInfo'))) {
		userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
	}
	console.log(userInfo);
}
var userInfo = {};
var username = '';
var password = '';
var login_username = false;
var login_pwd = false;
var phoneNum = '';
var code = '';
var pwd = '';
var pwdCon = '';
var time = 60;
var flag = true;
var phoneFlag = false;
var pwdFlag = false;
var codeFlag = false;
var phoneReg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/;

$('#tab-login').click(function () {
	userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
	$('.tab').css('display', 'none');
	$('.form-tab').css('background', '#ccc')
	$('#tab-register').css('background' , '#ccc');
	$('#tab-login').css('background', '#fff');
	$('.tab-register-box').css('display', 'block');
	$('.tab-login-box').css('display', 'none');
	
})
$('#tab-register').click(function () {
	$('.tab').css('display', 'none');
	$('.form-tab').css('background', '#ccc')
	$('#tab-login').css('background' , '#ccc');
	$('#tab-register').css('background', '#fff');
	$('.tab-login-box').css('display', 'block');
	$('.tab-register-box').css('display', 'none');
})

$('.phoneNum').on('input', function () {
	phoneNum = $('.phoneNum').val();
	if (!phoneReg.test(phoneNum)) {
		// alert('请输入正确的手机号！')
		phoneFlag = false
		$('.phoneDes').css('visibility', 'visible')
	} else {
		phoneFlag = true
		$('.phoneDes').css('visibility', 'hidden')
	}
})

$('.codeBtn').on('click', function () {
	if (phoneNum == '') {
		alert('请输入手机号');
		return
	}
	if (!flag) {
		return false;
	}
	var code = ma()
	var timer = setInterval(function () {
		flag = false;
		if (time == 0) {
			clearInterval(timer);
			$('.codeBtn').html('点击重新发送');
			time = 60;
			flag = true;
			return;
		}
		time--;
		var str = time + 's后重新发送';
		$('.codeBtn').html(str)
	}, 1000)
	console.log(code)
})

$('.code').on('input', function () {
	code = $('.code').val();
	if (code = $('.codeInput').val()) {
		codeFlag = true
		$('.codeDes').css('visibility', 'hidden')
	} else {
		codeFlag = false
		$('.codeDes').css('visibility', 'visible')
	}
})

$('.password').on('input', function () {
	pwd = $('.password').val();
	if (!pwdReg.test(pwd)) {
		pwdFlag = false
		// alert('请输入符合规则的密码！')
		$('.pwdDes').css('visibility', 'visible')
	} else {
		pwdFlag = true
		$('.pwdDes').css('visibility', 'hidden')
	}
})

$('.passwordConfirm').on('input', function () {
	pwdCon = $('.passwordConfirm').val();
	if (pwd != pwdCon) {
		pwdFlag = false
		// alert('密码不一致，请再次确认！')
		$('.pwdConDes').css('visibility', 'visible')
	} else {
		pwdFlag = true
		$('.pwdConDes').css('visibility', 'hidden')
	}
})

// register
$('.registerSubmit').on('click', function () {
	if (pwdFlag && phoneFlag) {
    var userInfo = {
      'username': phoneNum,
      'password': pwd
    }
    window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
		alert('注册成功，请登录！')
    $(location).prop('href', 'register.html')
    console.log(userInfo);

		$('.tab').css('display', 'none');
		$('.form-tab').css('background', '#ccc')
		$('#tab-register').css('background' , '#ccc');
		$('#tab-login').css('background', '#fff');
		$('.tab-register-box').css('display', 'block');
		$('.tab-login-box').css('display', 'none');

	} else {
		alert('请填写完整信息！')
	}
})


$('.usernameInput').on('input', function () {
	username = $('.usernameInput').val()
	if (username != userInfo.username) {
		login_username = false
		$('.userDes').css('visibility', 'visible')
	} else {
		login_username = true
		$('.userDes').css('visibility', 'hidden')
	}
})

$('.passwordInput').on('input', function () {
	password = $('.passwordInput').val()
	if (password != userInfo.password) {
		login_pwd = false
		$('.passwordDes').css('visibility', 'visible')
	} else {
		login_pwd = true
		$('.passwordDes').css('visibility', 'hidden')
	}
})

$('.loginBtn').on('click', function () {
	if (login_pwd && login_username) {
    $(location).prop('href', '../index/index.html')
	} else {
		alert('用户名或密码错误')
	}
})

// round
function round(min,max){
	var round = Math.round( Math.random()*(max - min) + min);
		return round;
}
//  get code 
function ma(){
	var str = "0123456789qwertyuioplkjhgfdsazxcvbnmZXCVBNMLKJHGFDSAQWERTYUIOP";
	var num = "";
	for( var i = 0 ; i < 4; i++ ){
		num += str.charAt(round( 0 , 62 ))+" " ;
	}
	return num ;
}

function setCookie(key,value,day){
	if(day){
		var now = new Date();
		now.setDate( now.getDate()+3 );
		document.cookie = key + "=" + value + ";expires =" + "now";
	}else{
		document.cookie = key + "=" + value;
	}
}


