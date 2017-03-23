var trigger = $('.hamburger'),
	overlay = $('.overlay'),
	isClosed = false;

function hamburger_cross() { //função que muda classe do icone 

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

function abrir_fecharmenu(){
	$('[data-toggle="offcanvas"]').click(function () { //função que abre e fecha menu
		$('#wrapper').toggleClass('toggled');
	});  
}

function filtros(){
	$.getJSON('./db/products.json', function(json) {
		json = JSON.parse(json);
		for(var i = 0; i<json.length;i++){
			$('#tabela').append('img(src= '+'"../images/"'+json[x].imag+'.jpg')
		}
	});
}

function actions () {
	abrir_fecharmenu();

	trigger.click(function () {
		hamburger_cross();      
	}); 

	$('#bolo').click(function(){
		filtros(this);
	});
	$('#oloformato').click(function(){
		filtros(this);
	});
	$('#cupcake').click(function(){
		filtros(this);
	});
	$('#doces').click(function(){
		filtros(this);
	});
	$('#torta').click(function(){
		filtros(this);
	});
}

$(document).ready(function () {
	actions();

});
