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
