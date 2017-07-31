$(function() {
	//Form Validation
	$input = $(".input-field-validation").find("input");
	$input.keyup(function(){
		$this = $(this);
		var email = $this.val();
		$inputCheck = $this.siblings(".input-field--check");
			if(email != 0) {
	           	if(isValidEmailAddress(email)) {
	           		$inputCheck.css({"background-image": "url('img/check-ok.svg')"});
	          	} else {
	          		$inputCheck.css({"background-image": "url('img/check-error.svg')"});
	               }
	        } else {
	              $inputCheck.css({
	                  "background-image": "none"
	              });        
	          }
	      });

	$('form').each( function() {
		$form = $(this);
		console.log(this);
		$(this).validate({
			// debug: true,
			// ignore: '.ignore',
			rules: {
				name: 'required',
				email: {
					required: true,
					email: true
				}
			},

			showErrors: function () {
				return false;
			},

		 	submitHandler: function(form) {
		 		// form = $(this);
		 		$('html').css('cursor', 'wait');
		 		// $(this).find('.btn-submit').prop('disabled', true);
		 		// console.log(this);
		 		// console.log(form);

	 			// console.log($(form).serialize());
	 			// e.preventDefault();
		 		$.ajax({
		 			url: form.action,
		 			type: form.method,
		 			data: $(form).serialize(),
		 			// contentType: false,   
		 			// processData:false,
		 			success: function () {
		 				// alert('sent');
		 				// goog_report_conversion('http://redmax-promo.com/');
		 				// console.log('sent');
		 				// console.log(response);
		 				$('html').css('cursor', 'default');
		 				// $(this).find('.btn-submit').prop('disabled', false);
		 			},
		 			error: function () {
		 				$('html').css('cursor', 'default');
	              		$('#submit-btn').prop('disabled', false);
		 				// alert("Doesn't send");
		 			}

		 		}); 
		 	}
		});
	});

});

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}
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
		$($popUpOverlay).on('сlick', function() {return false;})
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

if (window.innerWidth >= 991) {
	$(function () {
	new WOW({
	  offset:       200,          
	  mobile:       true      
	}).init();
	});
};

"use strict";
$(function() {
    $(".youtube").each(function() {
        $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

        $(this).append($('<div/>', {'class': 'play'}));

        $(document).delegate('#'+this.id, 'click', function() {
            var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
            if ($(this).data('params')) iframe_url+='&'+$(this).data('params');

            var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() })

            $(this).replaceWith(iframe);
        });
    });
 });
$(function () {
	// Feedbacks Slider
	var sliderReviews = new Swiper('.feedback-slider', {
		spaceBetween: 160,
		slidesPerView: 3,
		//centeredSlides: true,
		//slidesPerGroup: 1,
		//parallax: true,
		loop: true,
		//slidesOffsetBefore: 200,
		//pagination: '.pagination',
		//paginationClickable: true,
		//paginationHide: false,
		//bulletClass: 'pagination--item',
		//bulletActiveClass: 'pagination--item-active',
		nextButton: '.slider-btn-next',
		prevButton: '.slider-btn-prev',
		breakpoints: {
			1480: {
				spaceBetween: 80
			},
			1199: {
				slidesPerView: 2,
				spaceBetween: 60
			},
			991: {
				slidesPerView: 1
			}
		}
		//slidesOffsetBefore: 100,
		//slidesOffsetAfter: 100
		//width: 1000
	});
	var pricesSlider = null;

	checkSliderInit();
	
	$(window).resize(function(event) {
		checkSliderInit();
	});

	

function checkSliderInit() {
	if (window.matchMedia('(max-width: 767px) and (orientation: portrait)').matches) {
		if (jQuery.type(pricesSlider) !== 'object') {
			//console.log(pricesSlider);
			pricesSlider = new Swiper('.price-package-list', {
				slidesPerView: 1,
				spaceBetween: 10,
				initialSlide: 1,
				//loop: true,
				centeredSlides: true,
				breakpoints: {

				}
			});

			//pricesSlider.slideTo(1, 0);
		console.log(jQuery.type(pricesSlider) === 'object');
		//console.log(pricesSlider.params);
		} else {
			pricesSlider.update(true);
		}
	//}
	} else {
		if (jQuery.type(pricesSlider) === 'object') {
			//console.log(pricesSlider);
			console.log('kk');
			pricesSlider.destroy(false, true);
			console.log(jQuery.type(pricesSlider));
			console.log(pricesSlider);
			//console.log(pricesSlider);
			//pricesSlider.destroy();
		} else {
			console.log('no');
			//console.log(jQuery.type(pricesSlider) === 'Object');
		}
	}

	
}

});
