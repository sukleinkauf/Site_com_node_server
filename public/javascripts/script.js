

function menu(){
	$('#nav-icon1').click(function(){  //função que muda botão
		$(this).toggleClass('open');
	});
}
function abrir_fechar(){
	$('[data-toggle="offcanvas"]').click(function () { //função que abre e fecha menu
		$('#wrapper').toggleClass('toggled');
	});  
}

function actions () {
	menu();
	abrir_fechar(); 
}

$(document).ready(function () {
	actions();

});
