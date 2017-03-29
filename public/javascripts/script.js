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

function pesquisa(){
	$("#search").click(function(){
		$("input").toggle();	
	});
}
function procura(campo){
	$.get(db, function(dados){
		
		var searchField = $(campo).val();
		console.log(searchField);
		if(searchField === '')  {
			$('#filter-records').html('');
			return;
		}

		var regex = new RegExp(searchField, "i");
		var output = '<div class="row">';
		var count = 1;
			$(dados).each(function(){			

				if ((this.nome.search(regex) != -1)) {
					output += '<div class ="col-md-4">';
					output += '<h3 class="nomeprincipal">'+this.nome+'</h3><div class="grid">';
					output += '</h3><div class="grid"><figure class="effect-kira"><img src="../images/'+this.imag+
					'.jpg"/>';
					output += '<figcaption><p><a href="https://www.facebook.com/"><i class="fa fa-fw fa-thumbs-o-up"></i></a><a href="#"><i class="fa fa-fw fa-info"></i></a><a href="#"><i class="fa fa-fw fa-heart"></i></a><a href="#"><i class="fa fa-fw fa-share">';
					output += '</i></a></p></figcaption></figure></div>'
					output += '</div>';
					output += '</div>';

				}
			});

		output += '</div>';
		$('#filter-records').html(output);
	});
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
	$.get(db, function(dados){	
		for(var i = 0; i<dados.length;i++){
		
			if(dados[i].categoria==categoria){
				$('#tabela').append('<div class ="col-md-4"><h3 class="nomeprincipal">'+dados[i].nome+
					'</h3><div class="grid"><figure class="effect-kira"><img src="../images/'+dados[i].imag+
					'.jpg"/><figcaption><p><a href="https://www.facebook.com/"><i class="fa fa-fw fa-thumbs-o-up"></i></a><a href="#"><i class="fa fa-fw fa-info"></i></a><a href="#"><i class="fa fa-fw fa-heart"></i></a><a href="#"><i class="fa fa-fw fa-share"></i></a></p></figcaption></figure></div></div></div>');
			}else if(categoria==0){
				$('#tabela').append('<div class ="col-md-4"><h3 class="nomeprincipal">'+dados[i].nome+
					'</h3><div class="grid"><figure class="effect-kira"><img src="../images/'+dados[i].imag+
					'.jpg"/><figcaption><p><a href="https://www.facebook.com/"><i class="fa fa-fw fa-thumbs-o-up"></i></a><a href="#"><i class="fa fa-fw fa-info"></i></a><i class="fa fa-fw fa-heart" id="'+dados[i].id+'"></i><a href="#"><i class="fa fa-fw fa-share"></i></a></p></figcaption></figure></div></div></div>');
			}
		}
	});
}
function heart(cora){

	console.log(cora)
	var id =$(cora).parents('tr').data("id");
	
	$(id).toggleClass("red");
};

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
	$('#tabela').on("click", ".fa-heart", function(){
		heart(this);
	});
	$('#text-search').keyup(function(){
		procura(this);
	});
}

$(document).ready(function () {
	actions();
	filtros("0");
	pesquisa();

});
