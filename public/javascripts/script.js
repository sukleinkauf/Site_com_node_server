// variaveis de banco de dados
var	db="http://localhost:5000/db/produtos",
	db2="http://localhost:5000/db/encomendas";

function abrir_fecharmenu(){
	$('[data-toggle="offcanvas"]').click(function () { //função que abre e fecha menu
		$('#wrapper').toggleClass('toggled');
	});
}

function pesquisa(){ //função que abre a caixa de pesquisa
	$("#search").click(function(){
		$("input").toggle();	
	});
}
function tooltip(){
    $('[data-toggle="tooltip"]').tooltip(); 
}
function procura(campo){ // função que procura produto em dados json
	$.get(db, function(dados){
		
		var searchField = $(campo).val(); //salva valor digitado em variavel
		if(searchField === '')  {
			$('#filter-records').html('');//se vazio, a div não mostra nenhum  conteudo
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
					output += '<figcaption><p><p data-id="'+this.id+'"><i class="fa fa-fw fa-thumbs-o-up"></i><a href="http://localhost:5000/produto?id='+this.id+'"><i class="fa fa-fw fa-info"></i></a>';
					output += '</a></p></figcaption></figure></div>'
					output += '</div>';
					output += '</div>';

				}
			});

		output += '</div>';
		$('#filter-records').html(output);//inclui a variavel contendo o resultado da pesaquisa na div selecionada. 
	});
}

var cont=0;
function cart(cart){ //contagem do carrinho

	var cart = $(cart).parents('p').data("id");

	console.log(cart)
	$.get(db, function(dados){
		for(var i=0;i<dados.length;i++){	
			if (dados[i].id==cart){
				var produto = dados[i].id
				cont=cont+1;
				$('.contagem').html('');
				$('.contagem').append('<p>'+cont+'</p>')				
			}
		};
	});
}

function heart(elem){ //coração vermelho

	// var cart = $(cart).parents('p').data("id");

	console.log(elem)
	$(elem).removeClass("fa-heart-o");
	$(elem).addClass("fa-heart");
}
function heart2(elem){ //coração vazio

	// var cart = $(cart).parents('p').data("id");

	console.log(elem)
	$(elem).removeClass("fa-heart");
	$(elem).addClass("fa-heart-o");
}

function tableclean(){ //função que limpa a tabela de catalogo
	$("#tabela").html(""); 
}

function filtros(categoria){ //função que lê os dados e print o catalogo conforme filtro
	tableclean();
	$.get(db, function(dados){	
		for(var i = 0; i<dados.length;i++){
		
			if(dados[i].categoria==categoria){
				$('#tabela').append('<div class ="col-md-4"><h3 class="nomeprincipal">'+dados[i].nome+
					'</h3><div class="grid"><figure class="effect-kira"><img src="../images/'+dados[i].imag+
					'.jpg"/><figcaption><p><i class="fa fa-fw fa-thumbs-o-up"></i><a href="http://localhost:5000/produto?id='+dados[i].id+'""><i class="fa fa-fw fa-info"></i></a><i class="fa fa-fw fa-heart-o"></i></p></figcaption></figure></div></div></div>');
			}else if(categoria==0){
				$('#tabela').append('<div class ="col-md-4"><h3 class="nomeprincipal">'+dados[i].nome+
					'</h3><div class="grid"><figure class="effect-kira"><img src="../images/'+dados[i].imag+
					'.jpg"/><figcaption><p data-id="'+dados[i].id+'"><i class="fa fa-fw fa-thumbs-o-up"></i><a href="http://localhost:5000/produto?id='+dados[i].id+'"><i class="fa fa-fw fa-info"></i></a><i class="fa fa-fw fa-heart-o"></i></p></figcaption></figure></div></div></div>');
			}
		}
	});
}

function mudanav(){ // função que muda navbar superior conforme movimento do mouse
	if($(window).scrollTop() > 50) {
		$(".navbar").addClass("fixednav");
		$(".logo").addClass("fixedlog");
	} else {
		$(".navbar").removeClass("fixednav");
		$(".logo").removeClass("fixedlog");
    }
};
function abrirjanelaprodutos(){
	var nome =$('#nome').val();
	var email =$('#email').val();
	var quantidade =$('#quantidade').val();
	window.open("http://localhost:5000/encomendas?nome="+nome+"&email="+email+"&quantidade="+quantidade);

}

function carousel(){
	$('#myCarousel').carousel({
		interval: 40000
	});

	$('.carousel .item').each(function(){
		var next = $(this).next();
		if (!next.length) {
			next = $(this).siblings(':first');
		}
		next.children(':first-child').clone().appendTo($(this));
		if (next.next().length>0) {
			next.next().children(':first-child').clone().appendTo($(this)).addClass('rightest');
		}else {
			$(this).siblings(':first').children(':first-child').clone().appendTo($(this));
		}
	});
}

function actions () {//ações que chamam as funções
	abrir_fecharmenu();

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
	$('#tabela').on("click", ".fa-heart-o", function(){
		heart(this);
	});
	$('#tabela').on("click", ".fa-heart", function(){
		heart2(this);
	});
	$('#tabela').on("click", ".fa-shopping-cart", function(){
		cart(this);
	});

	$('#text-search').keyup(function(){
		procura(this);
	});

	$('#saveencomenda').click(function(){
		abrirjanelaprodutos();
	});

	$(window).on("scroll", function() {
		mudanav();
	});
}

$(document).ready(function () {
	actions();
	filtros("0");
	pesquisa();
	carousel();
	tooltip();
});

