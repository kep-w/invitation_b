//css3动效添加方法
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    }
});
var IndexPage=function(){
	// this.initImgList=[];
	this.initImgList=[
		'bg.jpg',
	 	'logo.png',
	 	'mcbg.png',
	 	'loading_bg.png',
	 	'p1_bg.jpg',
	 	'p1_text1.png',
	 	'p1_text2.png',
	 	'p2_bg.jpg',
	 	'p2_left_arrow.png',
	 	'p2_right_arrow.png',
	 	'p2_sub_top1.png',
	 	'p2_sub_top2.png',
	 	'p2_light.png',
	 	'p2_text1.png',
	 	'p2_text2.png',
	 	'p2_text3.png',
	 	'p2_text4.png',
	 	'p2_1_bg.jpg',
	 	'p2_1_img1.png',
	 	'p2_1_img2.png',
	 	'p2_1_text1.png',
	 	'p2_1_top1.png',
	 	'p2_2_bg.jpg',
	 	'p2_2_img1.png',
	 	'p2_2_img2.png',
	 	'p2_2_text1.png',
	 	'p2_3_bg.jpg',
	 	'p2_3_img1.jpg',
	 	'p2_3_text1.png',
	 	'p2_3_text2.png',
	 	'p3_bg.jpg',
	 	'p3_location.png',
	 	'p3_text1.png',
	 	'p3_text2.png',
	 	'p4_bg.jpg',
	 	'p4_text1.png',
	 	'p4_text2.png',
	 	'p5_bg.jpg',
	 	'p5_text1.png',
	 	'p6_bg.jpg',
	 	'p6_text1.png',
	 	'p6_text2.png',
	 	'p7_bg.jpg',
	 	'p7_text1.png',
	 	'p7_text2.png',
	 	'p7_text3.png',
	 	'star.png',
	 	'up.png'
	];
	this.title = "新BMW3系媒体试驾活动邀请函";
	this.summary = "邀请函";
	this.shareThumbnail = "http://game.showgc.com/game/bmw/dev/img/share.jpg";
	this.page5_font3;
}
IndexPage.prototype={
	init:function(){
		this.getShareConfig();
		var _that=this;
		this.initBind();
		this.audioAutoPlay("musicfx");
		//图片预加载
		var loader=new ImagesLoader();
		loader.loadImages(this.initImgList,'dev/img/'); // 图片地址
		loader.process(function(){
			_that.loadEdg(this.processNum);
			$(".processNum").text(this.processNum+"%");
	 	});
		loader.complete(function(){
			$(".swiper-container").addClass('active')
			$('.loadPage').slideUp(400);//显示第一页
			$("#musicControl").delay(400).fadeIn(100);//显示音乐控件
			$(".arrow").delay(3000).fadeIn();
        	$(".p1_text2").delay(1000).hide().fadeIn(3000);
        	$(".mate").hide();
		});
		loader.start();
		this.pageInit();
	},
	initBind:function(){
		var _that = this;
		$(".mate").on("touchmove",function(event){
			event.preventDefault();
		}, false)
		//音乐播放按钮事件绑定
		$("#mc_play").click(function(){
			_that.playMusic();
		});
		$(".subLink").click(function(){
			var _target=$(this).data("target");
			$(".otherBanner").removeClass('active')
			$(".otherBanner."+_target).addClass('active');
			$(".arrow").hide().stop(true,true);
			switch (_target) {
				case "fashion":
					$(".p2_1_text1").animateCss("fadeInUp");
					$(".p2_1_img1").animateCss("fadeInLeftBig");
					$(".p2_1_img2").animateCss("fadeInRightBig");
					$(".lightAcross").animateCss("fadeInLeftBig");
					break;
				case "prospect":
					$(".p2_2_text1").animateCss("fadeInUp");
					$(".p2_2_img1").animateCss("fadeInLeftBig");
					$(".p2_2_img2").animateCss("fadeInRightBig");
					break;
				case "acme":
					$(".p2_3_text1").animateCss("fadeInUp");
					$(".p2_3_img1").animateCss("fadeInLeftBig");
					$(".p2_3_text2").animateCss("fadeInRightBig");
					break;
			}
		});
		$(".back").click(function(){
			$(this).parents(".otherBanner").removeClass("active");
		    $(".arrow").hide();
    		$(".arrow").delay(3000).fadeIn();
		});
		// setInterval(function(){
		// 	$(".start").fadeOut(600).fadeIn(450);
		// },400);
	},
	playMusic:function(){
		if ($('#mc_play').hasClass('on')){
	        $('#mc_play audio').get(0).pause();
	        $('#mc_play').attr('class','stop');
	    }else{
	        $('#mc_play audio').get(0).play();
	        $('#mc_play').attr('class','on');
	    }
	    $('#music_play_filter').hide();
	},
	audioAutoPlay:function(id){
		var audio = document.getElementById(id);
	    audio.play();
	    document.addEventListener("WeixinJSBridgeReady", function () {
	            audio.play();
	    }, false);
	},
	getShareConfig:function(){
		var _that=this;
		//微信sdk配置信息
        var _config={
        	debug: false,
        	jsApiList:[
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'onVoicePlayEnd',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
        	],
        	url: window.location.href
        };
           
		//获取微信配置信息
        $.ajax({
            "url":"http://game.showgc.com/getJsConfig",
            "type":"post",
            "dataType":"json",
            "data":$.param(_config),
            "xhrFields": {
		        withCredentials: true
		    },
		    cache:false,
			crossDomain: true,
            "success":function(data){
                data.debug = false;
                //配置微信sdk
                wx.config(data);
                //监听微信sdk ready事件
                wx.ready(function(){
                    _that.setShare();
                });
            },
            "error":function(){}
        });
	},
	pageInit:function(){
		var _that=this;
		var mySwiper = new Swiper ('.swiper-container', {
			direction: 'vertical',
		    loop: false,
		    lidesPerView: 1,
	        paginationClickable: false,
	        spaceBetween: 1,
	        mousewheelControl: true,
	        // pagination: '.swiper-pagination',
	        onSlideChangeStart:function(swiper){
	        	// console.log("start")
	        	var _index=swiper.activeIndex+1;
	        	if(_index!=7){
	        		$(".arrow").hide();
	        		$(".arrow").delay(3000).fadeIn();
	        	}
	        	switch (_index) {
	        		case 1:
	        			$(".p1_text2").delay(1000).hide().fadeIn(3000);		
	        			break;
	        		case 2:
	        			$(".p2_text1").animateCss("fadeInDown");
	        			$(".sub1").hide().delay(700).fadeIn(2000);
	        			$(".sub2").hide().delay(700).fadeIn(2000);
	        			$(".sub3").hide().delay(700).fadeIn(2000);
	        			break;
	        		case 3:
	        			$(".p3_text1").animateCss("fadeInRightBig");
	        			$(".p3_text2").animateCss("fadeInLeftBig");
	        			break;
	        		case 4:
	        			$(".p4_text1").animateCss("fadeInLeftBig");
	        			$(".p4_text2").animateCss("fadeInUp");
	        			break;
	        		case 5:
	        			window.clearInterval(_that.page5_font3);
	        			$(".p5_text1").animateCss("fadeInLeftBig");
	        			function fontAnimate(){
	        				$(".p5_star1").stop(true, true);
	        				$(".p5_star1").css({"left":"16%","top":"58%"});
		    				$(".p5_star1").animate({left:'23%',top:'53%'},1300,"linear");
		    				$(".p5_star1").animate({left:'35%',top:'53%'},1500,"linear");
		    				$(".p5_star1").animate({left:'34.5%',top:'57.5%'},1000,"linear");
		    				$(".p5_star1").animate({left:'43%',top:'53%'},1500,"linear");
		    				$(".p5_star1").animate({left:'57%',top:'53%'},1500,"linear");
		    				$(".p5_star1").animate({left:'62%',top:'57%'},1200,"linear");
	        			}
	        			fontAnimate();
	        			_that.page5_font3=setInterval(function(){
	        				fontAnimate();
	        			},8100);
	        			break;
	        		case 6:
	        			window.clearInterval(_that.page5_font3);
	        			$(".p5_star1").stop(true, true);
	        			$(".p6_text1").animateCss("fadeInLeftBig");
	        			$(".p6_text2").animateCss("fadeInUp");
	        			break;
	        		case 7:
	        			$(".arrow").hide().stop(true,true);
	        			$(".p7_text1").animateCss("bounceIn");
	        			$(".p7_text2").animateCss("fadeInLeftBig");
	        			$(".p7_text3").animateCss("fadeInRightBig");
	        			break;
	        		default:
	        			// statements_def
	        			break;
	        	}
	        }
	  	});  
	},
	//分享参数设置
	setShare:function(){
		var _that=this;
        var _title=_that.title,
        _link=document.location.href, 
        _desc=_that.summary,
        _img=_that.shareThumbnail;
        var shareObj={
        	title:_title,
            link: _link, // 分享链接
            desc: _desc,
            imgUrl: _img, // 分享图标
            success: function () {
                // _that.shareSucc();
            },
            cancel:function(){}
        }
        //分享到朋友圈
        wx.onMenuShareTimeline(shareObj);
        //分享给朋友
        wx.onMenuShareAppMessage(shareObj);
        //分享到QQ
        wx.onMenuShareQQ(shareObj);
        // 分享到QQ空间
        wx.onMenuShareQZone(shareObj);
        // 分享到腾讯微博
        wx.onMenuShareWeibo(shareObj);
	},
	//loading剧毒条
	loadEdg:function(percent){
		var deg = 0;//角度
		var circle1 = -135;
		var circle2 = -315;
		var degNow = 0;
		deg=360*(percent/100);
		if(deg>360){
			window.clearInterval(timer);
		}else{
			if(deg<=180){
				degNow = circle1+deg;
				//右边圆
				$(".rightcircle").css({
			        '-webkit-transform': 'rotate(' + degNow + 'deg)',
			        '-moz-transform': 'rotate(' + degNow + 'deg)',
			        '-ms-transform': 'rotate(' + degNow + 'deg)',
			        '-o-transform': 'rotate(' + degNow + 'deg)',
			        'transform': 'rotate(' + degNow + 'deg)'
			    });
			}else{
				degNow = circle2+deg;
				$(".leftcircle").css({
			        '-webkit-transform': 'rotate(' + degNow + 'deg)',
			        '-moz-transform': 'rotate(' + degNow + 'deg)',
			        '-ms-transform': 'rotate(' + degNow + 'deg)',
			        '-o-transform': 'rotate(' + degNow + 'deg)',
			        'transform': 'rotate(' + degNow + 'deg)'
			    });
			}
		}
	}
}
$().ready(function(){
	var indexPage=new IndexPage();
	indexPage.init();
});


