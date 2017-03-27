var trigger = $('.hamburger'),
	overlay = $('.overlay'),
	isClosed = false;
	db="http://localhost:5000/db/produtos"

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
function tableclean(){ //função que limpa a tabela
	$("#tabela").html(""); 
}

function filtros(categoria){
	tableclean();
	console.log(categoria)
	$.get(db, function(dados){	
		for(var i = 0; i<dados.length;i++){
		
			if(dados[i].categoria==categoria){
				$('#tabela').append('<div class ="col-md-4"><h3 class="nomeprincipal">'+dados[i].nome+
					'</h3><div class="grid"><figure class="effect-kira"><img src="../images/'+dados[i].imag+
					'.jpg"/><figcaption><p><a href="https://www.facebook.com/"><i class="fa fa-fw fa-thumbs-o-up"></i></a><a href="#"><i class="fa fa-fw fa-info"></i></a><a href="#"><i class="fa fa-fw fa-heart"></i></a><a href="#"><i class="fa fa-fw fa-share"></i></a></p></figcaption></figure></div></div>');
			}else if(categoria==0){
				$('#tabela').append('<div class ="col-md-4"><h3 class="nomeprincipal">'+dados[i].nome+
					'</h3><div class="grid"><figure class="effect-kira"><img src="../images/'+dados[i].imag+
					'.jpg"/><figcaption><p><a href="https://www.facebook.com/"><i class="fa fa-fw fa-thumbs-o-up"></i></a><a href="#"><i class="fa fa-fw fa-info"></i></a><a href="#"><i class="fa fa-fw fa-heart"></i></a><a href="#"><i class="fa fa-fw fa-share"></i></a></p></figcaption></figure></div></div>');
			}
		}
	});
}

function actions () {
	abrir_fecharmenu();

	trigger.click(function () {
		hamburger_cross();      
	}); 

	$('#bolo').click(function(){
		filtros("Bolo");
	});
	$('#boloformato').click(function(){
		filtros("Boloformato");
	});
	$('#cupcake').click(function(){
		filtros("Cupcake");
	});
	$('#doces').click(function(){
		filtros("Doces");
	});
	$('#torta').click(function(){
		filtros("Torta");
	});
}

$(document).ready(function () {
	actions();
	filtros("0");

});
