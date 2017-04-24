// variaveis de banco de dados
var db = {
	produtos:"/db/produtos/",
	encomendas:"/db/encomendas/",
	favorito: '/catalogo/',
	productselect:'/produto/'
}

//================== Estilos ========================

//função que abre e fecha menu
function abrir_fecharmenu(){
	$('[data-toggle="offcanvas"]').click(function () { 
		$('#wrapper').toggleClass('toggled');
	});
};

function tooltip(){
	$('[data-toggle="tooltip"]').tooltip(); 
};

// função que muda navbar superior conforme movimento do mouse
function mudanav(){ 
	if($(window).scrollTop() > 50) {
		$(".navbar").addClass("fixednav");
		$(".logo").addClass("fixedlog");
	} else {
		$(".navbar").removeClass("fixednav");
		$(".logo").removeClass("fixedlog");
    }
};

//================= Pesquisa =======================

//função que abre a caixa de pesquisa
function pesquisa(){ 
	$("#search").click(function(){
		$("input").toggle();	
	});
};

// função que procura produto em dados json
function procura(campo){ 
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
					output += '<a href="'+db.productselect+this.id+'"><img src="../images/'+this.imag+
					'.jpg"/ class="imagemtabelapesquisa"></a></figure>'
					output += '</div>';
					output += '</div>';

				}
			});

		output += '</div>';
		$('#filter-records').html(output);//inclui a variavel contendo o resultado da pesaquisa na div selecionada. 
	});
};

//================= Carrinho de compras =======================
var cont=0;

//contagem do carrinho
function cartnumber(){ 

	cont=cont+1;
	$('.contagem').html('');
	$('.contagem').append('<p>'+cont+'</p>')				
};

//contagem do carrinho
function cart2number(){ 

	cont=cont-1;
	$('.contagem').html('');
	$('.contagem').append('<p>'+cont+'</p>')				

};

//chama função ajax passando id como parametro na url para mudar estado de preferencia do produto
function favorite(id){ 
	ajax("GET", db.favorito+id);
};

//requisição ajax, conforme dados recebidos
function ajax(tipo, url){
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

//pinta o coração de vermelho e muda estado de preferencia no produto
function heart(elem){ 

	$(elem).removeClass("fa-heart-o");
	$(elem).addClass("fa-heart");
	// $(elem).tooltip({ title: "O produto está se sentindo amado!" });
};

//coração vazio
function heart2(elem){ 

	$(elem).removeClass("fa-heart");
	$(elem).addClass("fa-heart-o");
	// $(elem).tooltip({ title: "Amando esse produto? Demonstre, a vida é curta" });
};

//============================ Funções de uso geral(limpeza, formato dinheiro e etc.) =================================

//função que limpa a tabela de catalogo
function tableclean(){ 
	$("#tabela").html(""); 
	$("#favorites").html(""); 
};

//função que seta os zeros depois da virgula no valor
function setvalue(value){
	var valor=(parseFloat(value).toFixed(2));
	return valor;
}

function aviso(msg){
	$('#aviso').fadeIn('fast', function(){
	});
	$( "#textoaviso" ).html("<h3>"+msg+"</h3>");
	$('#aviso').fadeOut(2500, function(){
	});
}
//============================ Impressão do catalogo =================================

//função que lê os dados e print o catalogo conforme filtro
function filtros(categoria){ 
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
				cartnumber();
			}
			console.log(tooltip);
			if(dados.produtos[i].categoria==categoria){
					$('#tabela').append('<div class ="col-md-4 produto-catalogo"><h3 class="nomeprincipal">'+dados.produtos[i].nome+
						'</h3><p class="valor">R$ '+valor.toString().replace(".", ",")+'</p><div class="grid"><figure class="effect-kira"><img src="../images/'+dados.produtos[i].imag+
						'.jpg"/><figcaption><p data-id="'+dados.produtos[i].id+'" data-valor="'+valor+
						'"><i class="fa fa-fw fa-thumbs-o-up"></i><a href="'+db.productselect+dados.produtos[i].id+'"><i class="fa fa-fw fa-info"></i></a><i class="fa fa-fw '
						+coracao+'"data-toggle="tooltip" data-placement="bottom" title: "'
						+tooltip+'" ></i></p></figcaption></figure></div></div></div>');
			}else if(categoria==0){
				$('#tabela').append('<div class ="col-md-4 produto-catalogo"><h3 class="nomeprincipal">'+dados.produtos[i].nome+
						'</h3><p class="valor">R$ '+valor.toString().replace(".", ",")+'</p><div class="grid"><figure class="effect-kira"><img src="../images/'+dados.produtos[i].imag+
						'.jpg"/><figcaption><p data-id="'+dados.produtos[i].id+'" data-valor="'+valor+
						'"><i class="fa fa-fw fa-thumbs-o-up"></i><a href="'+db.productselect+dados.produtos[i].id+'"><i class="fa fa-fw fa-info"></i></a><i class="fa fa-fw '
						+coracao+'"data-toggle="tooltip" data-placement="bottom" title: "'
						+tooltip+'" ></i></p></figcaption></figure></div></div></div>');
			}
		}
	});
};

//============================ Impressão do catalogo =================================

//função que imprime a tabbela de produtos favoritos
function paginafavorites(soma){
	tableclean();
	var totalinicial=0

	$.get(db.produtos, function(dados){

		for(var i = 0; i<dados.produtos.length;i++){
			var valor=setvalue(dados.produtos[i].valor);

			if(dados.produtos[i].preferido=="sim"){
				totalinicial=totalinicial+dados.produtos[i].valor
				$('#favorites').append('<tr data-id="'+dados.produtos[i].id
				+'"><td><img src="../images/'+dados.produtos[i].imag+'.jpg" class="imagemtabela"/>'
				+'</td><td>'+dados.produtos[i].id
				+'</td><td>'+dados.produtos[i].nome
				+'</td><td>'+dados.produtos[i].descrição
				+'</td><td>R$ '+dados.produtos[i].peso
				+'</td><td>R$ '+valor.toString().replace(".", ",")
				+'</td><td class="select-quantitade"><div class="input-group number-spinner"><span class="input-group-btn data-dwn"><button class="btn btn-default btn-quantidade" data-dir="dwn" data-id="'+dados.produtos[i].id
				+'"><span class="glyphicon glyphicon-minus"></span></button>'
				+'</span><input type="text" class="form-control text-center inputnumber quantidade" value="1" min="1" max="40"'
				+'><span class="input-group-btn data-up">'
				+'<button class="btn btn-default btn-quantidade mais" data-dir="up"  data-id="'+dados.produtos[i].id+'"><span class="glyphicon glyphicon-plus"></span></button></span></div>'
				+'</td><td class="total-produto">'+valor.toString().replace(".", ",")
				+'</td><td>'
				+'<i class="fa fa-heart fa-3x" aria-hidden="true"></i>'
				+'</tr>');
			}
		}
		totalinicial=setvalue(totalinicial).toString().replace(".", ",");
		$("#total").append('<h3 class="totalvalor">Total: '+totalinicial+'</h3>');
	});
}

//função que limpa os espaços de soma de valores na tabela
function limpasomas(linhatotal){
	$(linhatotal).html("");
	$("#total").html("");
}
 
 //função que seta total da compra nos produtos favoritos
function totalcompra(){

	var total = 0;
	$(".total-produto").each(function(){
		total=parseFloat(total)
  		total = total+parseFloat($(this).text());
  		console.log(total)
  		// console.log(parseFloat($(this).text()))
  		total = setvalue(total).toString().replace(".", ",");
	});
	$("#total").append('<h3 class="totalvalor">Total: '+total+'</h3>');

}

//seta o valor calculado na linha de total do produto
function setvalorproduto(soma,elem){
	var linha= $(elem).parents(".select-quantitade");
	var linhatotal=$(linha).siblings(".total-produto")
	limpasomas(linhatotal);
	var soma=setvalue(soma).toString().replace(".", ",");
	$(linhatotal).append(soma);

	totalcompra();
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
		// valorTotal(valor, "+")
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

	});

	$('#favorites').on("click", ".fa-heart", function(){
		var id = $(this).parents('tr').data("id");
		$("#total").html("");
		heart2(this);
		cart2number();
		favorite(id);
		paginafavorites();

	});
	$('.descript').on("click", ".fa-heart-o", function(){
		var id = $(this).data("id");
		heart(this);
		cartnumber();
		favorite(id);
	})

	$('.descript').on("click", ".fa-heart", function(){
		var id = $(this).data("id");
		heart2(this);
		cart2number();
		favorite(id);
	})

	$('#text-search').keyup(function(){
		procura(this);
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

	$("#core").mousemove(function(){
	 	tooltip();
	});

	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 15 // Creates a dropdown of 15 years to control year
	});
	$('.enviarmsg').click(function(){
		aviso("Mensagem enviada com Sucesso!");
	});
};

$(document).ready(function () {
	actions();
	filtros("0");
	pesquisa();
	tooltip();
	paginafavorites();
	tooltip();
});

