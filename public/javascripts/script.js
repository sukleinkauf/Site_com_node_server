var trigger = $('.hamburger'),
	overlay = $('.overlay'),
	isClosed = false;

function hamburger_cross() { //trocando classe de menu
	
	if (isClosed == true) {          
		overlay.hide();
		trigger.removeClass('is-open');
		trigger.addClass('is-closed');
		isClosed = false;
	} else {   
		overlay.show();
		trigger.removeClass('is-closed');
		trigger.addClass('is-open');
		isClosed = true;
	}
}


function actions () {

	trigger.click(function () {
		hamburger_cross();
	});
  
	$('[data-toggle="offcanvas"]').click(function () {
		$('#wrapper').toggleClass('toggled');
	});  
}


$(document).ready(function () {
	actions();
});
