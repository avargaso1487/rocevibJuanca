jQuery(function($) {'use strict',

	//#main-slider
	$(function(){
		$('#main-slider.carousel').carousel({
			interval: 8000
		});
	});


	// accordian
	$('.accordion-toggle').on('click', function(){
		$(this).closest('.panel-group').children().each(function(){
		$(this).find('>.panel-heading').removeClass('active');
		 });

	 	$(this).closest('.panel-heading').toggleClass('active');
	});

	//Initiat WOW JS
	new WOW().init();

	// portfolio filter
	$(window).load(function(){'use strict';
		var $portfolio_selectors = $('.portfolio-filter >li>a');
		var $portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector : '.portfolio-item',
			layoutMode : 'fitRows'
		});
		
		$portfolio_selectors.on('click', function(){
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector });
			return false;
		});
	});

	// Contact form
	var form = $('#main-contact-form-2');
	$("#submit").click(function(event){
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			type: 'POST',
			data: $('#main-contact-form-2').serialize(), 				
			url: 'sendemail.php',
			beforeSend: function(){
					form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
				},
			success: function(respuesta){
				form_status.html('<p class="text-success">' + respuesta.message + '</p>').delay(3000).fadeOut();
			},
			error: function(respuesta){
				
			}
		});
	});
	
	var form2 = $('#main-contact-form-1');
	$("#submit2").click(function(event){
		var form2_status = $('<div class="form2_status"></div>');
		$.ajax({
			type: 'POST',
			data: $('#main-contact-form-1').serialize(), 				
			url: 'sendemail_reserva.php',
			beforeSend: function(){
					form2.prepend( form2_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
				},
			success: function(respuesta){
				console.log(respuesta);
				form2_status.html('<p class="text-success">' + respuesta.message + '</p>').delay(3000).fadeOut();
			},
			error: function(respuesta){
			console.log("error");
			}
		});
	});

	
	//goto top
	$('.gototop').click(function(event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $("body").offset().top
		}, 500);
	});	

	//Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});	
});