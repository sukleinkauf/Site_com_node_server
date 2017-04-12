// variaveis de banco de dados
var db = {
	produtos:"http://localhost:5000/db/produtos/",
	encomendas:"http://localhost:5000/db/encomendas/",
	favorito: 'http://localhost:5000/catalogo/'
}

function abrir_fecharmenu(){
	$('[data-toggle="offcanvas"]').click(function () { //função que abre e fecha menu
		$('#wrapper').toggleClass('toggled');
	});
};

function pesquisa(){ //função que abre a caixa de pesquisa
	$("#search").click(function(){
		$("input").toggle();	
	});
};

function tooltip(){
    $('[data-toggle="tooltip"]').tooltip(); 
};

function procura(campo){ // função que procura produto em dados json
	$.get(db.produtos, function(dados){
		var searchField = $(campo).val(); //salva valor digitado em variavel
		if(searchField === '')  {
			$('#filter-records').html('');//se vazio, a div não mostra nenhum  conteudo
			return;
		}

		var regex = new RegExp(searchField, "i");//salva o meu conteudo uma variavel não sendo case-sensitive
		var output = '<div class="row">';
			$(dados.produtos).each(function(){	//procura por letra no nome;		

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
};

var cont=0;
function cartnumber(elem){ //contagem do carrinho

	cont=cont+1;
	$('.contagem').html('');
	$('.contagem').append('<p>'+cont+'</p>')				
};

function cart2number(cart){ //contagem do carrinho

	cont=cont-1;
	$('.contagem').html('');
	$('.contagem').append('<p>'+cont+'</p>')				

};
var total =0;
function valorTotal(valor, opera){

	if(opera == "+"){ 
		total =  total + valor;
	}
	if(opera == "-"){ 
		total = total -valor; 
	}
	// $('#total').append( 
}

function favorite(elem){
	var id = $(elem).parents('p').data("id");
	ajax("GET", db.favorito+id);
};
function favorite2(elem){
	var id = $(elem).parents('tr').data("id");
	ajax("GET", db.favorito+id);
};

function ajax(tipo, url){//requisição ajax, conforme dados recebidos
	$.ajax({
		dataType: "json",
		type: tipo,
		url: url,
		success: function(result){
		},
		error: function(){
		}
	})
}


function heart(elem){ //pinta o coração de vermelho e muda estado de preferencia no produto


	$(elem).removeClass("fa-heart-o");
	$(elem).addClass("fa-heart");
	$(elem).tooltip({ title: "O produto está se sentindo amado!" });
};

function heart2(elem){ //coração vazio

	$(elem).removeClass("fa-heart");
	$(elem).addClass("fa-heart-o");
	$(elem).tooltip({ title: "Amando esse produto? Demonstre, a vida é curta" });
};

function tableclean(){ //função que limpa a tabela de catalogo
	$("#tabela").html(""); 
	$("#favorites").html(""); 
};
function setvalue(value){
	var valor=(parseFloat(value).toFixed(2));
	return valor;
}

function filtros(categoria){ //função que lê os dados e print o catalogo conforme filtro
	tableclean();
	cont=0;
	var coracao=0;
	var tooltip = 0;
	$.get(db.produtos, function(dados){
		for(var i = 0; i<dados.produtos.length;i++){
			var valor=setvalue(dados.produtos[i].valor);
			if(dados.produtos[i].preferido== "não"){
				coracao ="fa-heart-o"
				tooltip ='"Amando esse produto? Demonstre, a vida é curta"'

			}else{
				coracao ="fa-heart"
				tooltip ='"O produto está se sentindo amado!"'
				valorTotal(dados.produtos[i].valor, "+")
				cartnumber();
			}
			if(dados.produtos[i].categoria==categoria){
					$('#tabela').append('<div class ="col-md-4"><h3 class="nomeprincipal">'+dados.produtos[i].nome+
						'</h3><div class="grid"><figure class="effect-kira"><img src="../images/'+dados.produtos[i].imag+
						'.jpg"/><figcaption><p data-id="'+dados.produtos[i].id+'" data-valor="'+valor+
						'"><i class="fa fa-fw fa-thumbs-o-up"></i><a href="http://localhost:5000/produto?id='+dados.produtos[i].id+
						'""><i class="fa fa-fw fa-info"></i></a><i class="fa fa-fw '+coracao+'"data-toggle="tooltip" data-placement="bottom" title: "'+tooltip+'" ></i></p></figcaption></figure></div></div></div>');
			}else if(categoria==0){
				$('#tabela').append('<div class ="col-md-4"><h3 class="nomeprincipal">'+dados.produtos[i].nome+
					'</h3><div class="grid"><figure class="effect-kira"><img src="../images/'+dados.produtos[i].imag+
					'.jpg"/><figcaption><p data-id="'+dados.produtos[i].id+'" data-valor="'+valor+
					'"><i class="fa fa-fw fa-thumbs-o-up"></i><a href="http://localhost:5000/produto?id='+dados.produtos[i].id+
					'"><i class="fa fa-fw fa-info"></i></a><i class="fa fa-fw '+coracao+'"data-toggle="tooltip" data-placement="bottom" title: "'+tooltip+'" ></i></p></figcaption></figure></div></div></div>');
			}
		}
	});
};

function valorproduto(valor, elem){
	var soma= 0;
	soma= valor*Number($(elem).val());
	console.log(soma);
	paginafavorites(soma)

}
// var total = 0; 
// //faço um foreach percorrendo todos os inputs com a class soma e faço a soma na var criada acima 
// $(".soma").each(function(){ 
// 	total = total + Number($(this).val()); 
// }); //mostro o total no input Sub Total $("#sub").val(total); });

function paginafavorites(soma){
	tableclean();
	$.get(db.produtos, function(dados){
		for(var i = 0; i<dados.produtos.length;i++){
			var valor=setvalue(dados.produtos[i].valor);
			if(dados.produtos[i].preferido=="sim"){
				$('#favorites').append('<tr data-id="'+dados.produtos[i].id
				+'"data-valor="'+valor
				+'"><td><img src="../images/'+dados.produtos[i].imag+'.jpg" class="imagemtabela"/>'
				+'</td><td>'+dados.produtos[i].id
				+'</td><td>'+dados.produtos[i].nome
				+'</td><td>'+dados.produtos[i].descrição
				+'</td><td>R$ '+dados.produtos[i].peso
				+'</td><td>R$ '+valor.toString().replace(".", ",")
				+'</td><td><input type="number" name="quantity" min="1" value="1" max="50" class="soma">'
				+'</td><td> '
				+'</td><td>'
				+'<i class="fa fa-heart fa-3x" aria-hidden="true"></i>'
				+'</tr>');
			}
		}
	});
}

// data-toggle="modal" data-target="#modaldesfavoritar"
function mudanav(){ // função que muda navbar superior conforme movimento do mouse
	if($(window).scrollTop() > 50) {
		$(".navbar").addClass("fixednav");
		$(".logo").addClass("fixedlog");
	} else {
		$(".navbar").removeClass("fixednav");
		$(".logo").removeClass("fixedlog");
    }
};

function abrirjanelaprodutos(){//setando parametros na url
	var produto = $('#lineModalLabel').data("value");
	var nome =$('#nome').val();
	var email =$('#email').val();
	var quantidade =$('#quantidade').val();
	window.open("http://localhost:5000/encomendas?nomeCliente="+nome+"&produto="+produto+"&email="+email+"&quantidade="+quantidade);
	window.close("")

};
// function maskmoney(){//máscara para campo de valor
// 	$("h3#valor").maskMoney({showSymbol:true, symbol:"R$", decimal:".", thousands:","});
// }
function carousel(){//trabalhando com carousel
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
};;

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
		cartnumber(this);
		favorite(this);
		var valor =$(this).parents('p').data("valor");
		valorTotal(valor, "+")
	});
	$('#tabela').on("click", ".fa-heart", function(){
		heart2(this);
		cart2number(this);
		favorite(this);
		var valor =$(this).parents('p').data("valor");
		valorTotal(valor, "-")
	});

	$('#favorites').on("click", ".fa-heart", function(){
		console.log("teste")
		heart2(this);
		cart2number(this);
		favorite2(this);
		// var valor =$(this).parents('tr').data("valor");
		// valorTotal(valor, "-")
		paginafavorites();

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

	$('#favorites').on('change', '.soma', function(){
		var valor = $(this).parents('tr').data("valor");
		valorproduto(valor,this);
	});
	// $("#quantity").on("change", function(){ 
	// 	console.log('haha');
	// });
};

$(document).ready(function () {
	actions();
	filtros("0");
	pesquisa();
	carousel();
	tooltip();
	paginafavorites();
	// maskmoney();
});

