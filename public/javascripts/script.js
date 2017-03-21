var trigger = $('.hamburger'),
	overlay = $('.overlay'),
	isClosed = false;

function hamburger_cross() {

	if (isClosed == true) {          
		overlay.hide();
		trigger.removeClass('is-open');
		trigger.addClass('is-closed');
		isClosed = false;
	} else{
		overlay.show();
		trigger.removeClass('is-closed');
		trigger.addClass('is-open');
		isClosed = true;
	}
}

function abrir_fechar(){
	$('[data-toggle="offcanvas"]').click(function () { //função que abre e fecha menu
		$('#wrapper').toggleClass('toggled');
	});  
}

function actions () {
	abrir_fechar();

	trigger.click(function () {
		hamburger_cross();      
	}); 
}

$(document).ready(function () {
	actions();

});
