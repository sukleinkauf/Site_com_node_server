

function menu(){
	$('#nav-icon1').click(function(){
		$(this).toggleClass('open');
	});
}
function abrir_fechar(){
	$('[data-toggle="offcanvas"]').click(function () {
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
