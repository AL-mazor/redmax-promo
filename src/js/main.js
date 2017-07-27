$(function() {

	$scrollTop = $('.scroll-top');
	winHeight = $(window).height();
	$popUpMain = $('.pop-up-main');
	$popUpWelcome = $('.pop-up-welcome');
	$popUpOverlay = $('.pop-up-overlay');
	$burger = $('.burger');
	var animationEvent = whichAnimationEvent();
	

	// Show & Hide Pop Up
	$('.btn-pop-up-welcome').click(function(event) {
		showPopUp($popUpWelcome);
	});
	
	$('.btn-pop-up').click(function(event) {
		showPopUp($popUpMain);
	});

	$('.pop-up--close').click(function(event) {
		$popUp = $(this).parent();
		hidePopUp($popUp);
	});

	$burger.click(function(event) {
		$header = $('.header');
		$burger.toggleClass('burger-active');
		// if ($header.hasClass('header-scrolling')) {
		// 	$header.removeClass('header-scrolling')
		// }
		$header.toggleClass('header-active');
	});


	// Smooth Scrolling
	$('header a[href^="#"]').click(function(e) {
		var target = $(this).attr('href');
		$('html, body').animate({scrollTop: $(target).offset().top}, 800);
		$('.header').removeClass('header-active');
		$burger.removeClass('burger-active');
		e.preventDefault;
	});
	
	$(window).resize(function(e) {
		winHeight = $(window).height();
		//console.log(winHeight);
	});

	checkElementsStatus();
	$(window).on('scroll', function() {		
		checkElementsStatus();
	});

	function checkElementsStatus() {
		$topOffset = $(window).scrollTop();
		// Header animation
		if($topOffset>150) {
			$('header').addClass('header-scrolling');
		} else if($topOffset==0) {
			$('header').removeClass('header-scrolling');
		};
		
		// Animate scroll btn on window scroll
		if (window.matchMedia('(min-width: 992px').matches) {
			setTimeout(function() {
				if($topOffset > winHeight) {
					showScrollBtn();
				} else {
					hideScrollBtn();
				}
			}, 10);
		}
	}

	// Scrolling Scroll top button
	$scrollTop.click(function(e) {
		$('html, body').animate({scrollTop: $('body').offset().top}, 800);
	});

	// Scroll Top Btn animate
	function showScrollBtn() {
		if (window.matchMedia('(min-width: 992px').matches) {
			$topOffset = $(window).scrollTop();
			if($topOffset > winHeight) {
				$scrollTop.fadeIn('300');
			}
		}
	}

	function hideScrollBtn() {
		$scrollTop.fadeOut('300');
	}

	// Pop up animation
	function showPopUp(popUp) {
		hideScrollBtn();
		$popUpOverlay.fadeIn('200');
		$.merge(popUp, $popUpOverlay).on('mousewheel', function() {return false;})
		popUp.addClass('pop-up-bounceIn').show();
		popUp.one(animationEvent, function () {
			popUp.removeClass('pop-up-bounceIn');
		});
	}

	function hidePopUp(popUp) {
		// console.log(popUp);
		popUp.addClass('pop-up-bounceOut');
		popUp.one(animationEvent, function () {
			popUp.removeClass('pop-up-bounceOut').hide();
		});
		$popUpOverlay.fadeOut('500');
		showScrollBtn();
	}


	// Function from David Walsh: http://davidwalsh.name/css-animation-callback
	function whichAnimationEvent(){
	  var t,
	      el = document.createElement("fakeelement");

	  var animations = {
	    "animation"      : "animationend",
	    "OAnimation"     : "oAnimationEnd",
	    "MozAnimation"   : "animationend",
	    "WebkitAnimation": "webkitAnimationEnd"
	  }

	  for (t in animations){
	    if (el.style[t] !== undefined){
	      return animations[t];
	    }
	  }
	}

});