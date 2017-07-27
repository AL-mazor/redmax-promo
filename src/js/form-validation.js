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