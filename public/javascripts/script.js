var trigger = $('.hamburger'),
	overlay = $('.overlay'),
	isClosed = false;
	db="http://localhost:5000/db/produtos"
	db2="http://localhost:5000/db/encomendas"

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
		if(searchField === '')  {
			$('#filter-records').html('');
			return;
		}

		var regex = new RegExp(searchField, "i");//salva o meu conteudo uma variavel não sendo case-sensitive
		var output = '<div class="row">';
			$(dados).each(function(){	//procura por letra no nome;		

				if ((this.nome.search(regex) != -1)) {//procura uma string para um valor especificado e retorna a posição da correspondência; se não encontra ele retorna -1
					output += '<div class ="col-md-4">';
					output += '<h3 class="nomeprincipal">'+this.nome+'</h3><div class="grid">';
					output += '</h3><div class="grid"><figure class="effect-kira"><img src="../images/'+this.imag+
					'.jpg"/>';
					output += '<figcaption><p><a href="https://www.facebook.com/"><i class="fa fa-fw fa-thumbs-o-up"></i></a><a href="#"><i class="fa fa-fw fa-info"></i></a><a href="#"><i class="fa fa-fw fa-heart"></i></a><a href="#"><i class="fa fa-fw fa-shopping-cart">';
					output += '</i></a></p></figcaption></figure></div>'
					output += '</div>';
					output += '</div>';

				}
			});

		output += '</div>';
		$('#filter-records').html(output);
	});
}

function cart(numero){
	var cont =0;
	$.get(db2, function(dados){
		for(var i=0;i<dados.length;i++){	
			if (dados[i].id==numero){
				cont=cont+1;
				console.log(cont);
				$('[data-toggle="tooltip"]').tooltip();
				$('.contagem').html('');
				$('.contagem').html('<p>'+cont+'</p>')				
			}
		};
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
					'.jpg"/><figcaption><p><i class="fa fa-fw fa-thumbs-o-up"></i><i class="fa fa-fw fa-info"></i><i class="fa fa-fw fa-heart"></i><i class="fa fa-fw fa-shopping-cart" data-toggle="tooltip" data-placement="bottom" title="Produto Adicionado ao carrinho!" id="'+dados[i].id+'"></i></p></figcaption></figure></div></div></div>');
			}else if(categoria==0){
				$('#tabela').append('<div class ="col-md-4"><h3 class="nomeprincipal">'+dados[i].nome+
					'</h3><div class="grid"><figure class="effect-kira"><img src="../images/'+dados[i].imag+
					'.jpg"/><figcaption><p><i class="fa fa-fw fa-thumbs-o-up"></i><i class="fa fa-fw fa-info"></i><i class="fa fa-fw fa-heart"></i><i class="fa fa-fw fa-shopping-cart" data-toggle="tooltip" data-placement="bottom" title="Produto Adicionado ao carrinho!" id="'+dados[i].id+'"></i></p></figcaption></figure></div></div></div>');
			}
		}
	});
}
function mudanav(){
	if($(window).scrollTop() > 50) {
		$(".navbar-fixed-top").addClass("fixednav");
		$(".logo").addClass("fixedlog");
	} else {
		$(".navbar-fixed-top").removeClass("fixednav");
		$(".logo").removeClass("fixedlog");
    }
};


function heart(btn){
	$(btn).addClass("pintar");
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
		heart(this)
		// heart(event.target.id);
	});
	$('#tabela').on("click", ".fa-shopping-cart", function(){
		cart(event.target.id)
	});
	$('#text-search').keyup(function(){
		procura(this);
	});

	 $(window).on("scroll", function() {
		mudanav()
	});
}

$(document).ready(function () {
	actions();
	filtros("0");
	pesquisa();

});

