// variaveis de banco de dados
var db = {
	produtos:"http://localhost:5000/db/produtos/",
	encomendas:"http://localhost:5000/db/encomendas/",
	favorito: 'http://localhost:5000/catalogo/',
	productselect:'http://localhost:5000/produto/'
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
				var valor=setvalue(this.valor);	

				if ((this.nome.search(regex) != -1)) {//procura uma string para um valor especificado e retorna a posição da correspondência; se não encontra ele retorna -1
					output += '<div class ="col-md-3">';
					output += '<h3 class="nomeprincipal">'+this.nome+'</h3><p class="valorsearch"> R$ '+valor.toString().replace(".", ",")
					+'</p><div class="grid">';
					output += '<img src="../images/'+this.imag+
					'.jpg"/ class="imagemtabelapesquisa"></figure>'
					output += '</div>';
					output += '</div>';

				}
			});

		output += '</div>';
		$('#filter-records').html(output);//inclui a variavel contendo o resultado da pesaquisa na div selecionada. 
	});
};

var cont=0;
function cartnumber(){ //contagem do carrinho

	cont=cont+1;
	$('.contagem').html('');
	$('.contagem').append('<p>'+cont+'</p>')				
};

function cart2number(){ //contagem do carrinho

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

function favorite(id){
	ajax("GET", db.favorito+id);
};

function ajax(tipo, url){//requisição ajax, conforme dados recebidos
	$.ajax({
		url: url,
		type: tipo,
		dataType: "json",
		success: function(result){
			console.log(result);
		},
		error: function(){
			
		}
	});
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
						'"><i class="fa fa-fw fa-thumbs-o-up"></i><a href="'+db.productselect+dados.produtos[i].id+'"><i class="fa fa-fw fa-info"></i></a><i class="fa fa-fw '+coracao+'"data-toggle="tooltip" data-placement="bottom" title: "'+tooltip+'" ></i></p></figcaption></figure></div></div></div>');
			}else if(categoria==0){
				$('#tabela').append('<div class ="col-md-4"><h3 class="nomeprincipal">'+dados.produtos[i].nome+
					'</h3><div class="grid"><figure class="effect-kira"><img src="../images/'+dados.produtos[i].imag+
					'.jpg"/><figcaption><p data-id="'+dados.produtos[i].id+'" data-valor="'+valor+
					'"><i class="fa fa-fw fa-thumbs-o-up"></i><a href="'+db.productselect+dados.produtos[i].id+'"><i class="fa fa-fw fa-info"></i></a><i class="fa fa-fw '+coracao+'"data-toggle="tooltip" data-placement="bottom" title: "'+tooltip+'" ></i></p></figcaption></figure></div></div></div>');
			}
		}
	});
};

//numbers.forEach 
//var total = 0; 
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
				+'"><td><img src="../images/'+dados.produtos[i].imag+'.jpg" class="imagemtabela"/>'
				+'</td><td>'+dados.produtos[i].id
				+'</td><td>'+dados.produtos[i].nome
				+'</td><td>'+dados.produtos[i].descrição
				+'</td><td>R$ '+dados.produtos[i].peso
				+'</td><td>R$ '+valor.toString().replace(".", ",")
				+'</td><td class="select-quantitade"><div class="input-group number-spinner"><span class="input-group-btn data-dwn"><button class="btn btn-default btn-quantidade" data-dir="dwn" data-id="'+dados.produtos[i].id
				+'"><span class="glyphicon glyphicon-minus"></span></button>'
				+'</span><input type="text" class="form-control text-center inputnumber quantidade" value="0" min="1" max="40"'
				+'><span class="input-group-btn data-up">'
				+'<button class="btn btn-default btn-quantidade mais" data-dir="up"  data-id="'+dados.produtos[i].id+'"><span class="glyphicon glyphicon-plus"></span></button></span></div>'
				+'</td><td class="total">'
				+'</td><td>'
				+'<i class="fa fa-heart fa-3x" aria-hidden="true"></i>'
				+'</tr>');
			}
		}
	});
}
function setvalorproduto(soma,elem){
	var linha= $(elem).parents(".select-quantitade");
	var linhatotal=$(linha).siblings(".total")
	$(linhatotal).html("");
	var soma=setvalue(soma).toString().replace(".", ",");
	$(linhatotal).append('<div><p>'+soma+'</p></div>');
}

//encontra o valor do produto no banco de dados, utilizando id do produto e multiplica pela quantidade selecionada
function valorxquantidade(qtn , elem){ 
	var soma= 0;
	var codigo = $(elem).parents('tr').data("id");

	$.get(db.produtos, function(dados){
		for(var i = 0; i<dados.produtos.length;i++){
			if(dados.produtos[i].id==codigo){
				soma = dados.produtos[i].valor*qtn;
			}
		}
		setvalorproduto(soma, elem);
	});
}

 //função que muda quantidade de produto na tabela de favoritos
function contagem(elem) { 
	
	var qtn= $(elem).siblings(".quantidade").val();
	if($(elem).hasClass('data-up')){
		qtn++;
	}else{
		if(qtn > 0){
			qtn--;
		}
	}
	$(elem).siblings(".quantidade").val(qtn);
	valorxquantidade(qtn, elem);
};

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
		var id = $(this).parents('p').data("id");
		var valor =$(this).parents('p').data("valor");
		heart(this);
		cartnumber();
		favorite(id);
		valorTotal(valor, "+")
	});
	$('#tabela').on("click", ".fa-info", function(){
		var id =$(this).parents('p').data("id");
		productselect(id);
	});
	$('#tabela').on("click", ".fa-heart", function(){
		var id = $(this).parents('p').data("id");
		heart2(this);
		cart2number();
		favorite(id);
		var valor =$(this).parents('p').data("valor");
		valorTotal(valor, "-")
	});

	$('#favorites').on("click", ".fa-heart", function(){
		var id = $(this).parents('tr').data("id");
		heart2(this);
		cart2number();
		favorite(id);
		// var valor =$(this).parents('tr').data("valor");
		// valorTotal(valor, "-")
		paginafavorites();

	});
	$('.descript').on("click", ".fa-heart-o", function(){
		var id = $(this).data("id");
		console.log(id);
		heart(this);
		cartnumber();
		favorite(id);
	})
	$('.descript').on("click", ".fa-heart", function(){
		var id = $(this).data("id");
		console.log(id);
		heart2(this);
		cart2number();
		favorite(id);
	})

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
	$('#favorites').on('mousedown', '.data-up, .data-dwn', function(){
		contagem(this)
	});
	// $('.datepicker').pickadate({
	// 	selectMonths: true, // Creates a dropdown to control month
	// 	selectYears: 15 // Creates a dropdown of 15 years to control year
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

