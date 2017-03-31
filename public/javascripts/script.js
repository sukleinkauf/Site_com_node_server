var trigger = $('.hamburger'),
	cont =0;
	overlay = $('.overlay'),
	isClosed = false;
	db="http://localhost:5000/db/produtos"
	db2="http://localhost:5000/db/encomendas"

function abrir_fecharmenu(){
	$('[data-toggle="offcanvas"]').click(function () { //função que abre e fecha menu
		$('#wrapper').toggleClass('toggled');
	});
}

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
					output += '<figcaption><p><i class="fa fa-fw fa-thumbs-o-up"></i><i class="fa fa-fw fa-info"></i><i class="fa fa-fw fa-heart"></i><i class="fa fa-fw fa-shopping-cart" >';
					output += '</i></a></p></figcaption></figure></div>'
					output += '</div>';
					output += '</div>';

				}
			});

		output += '</div>';
		$('#filter-records').html(output);
	});
}


function cart(cart){

	var cart = $(cart).parents('p').data("id");

	$.get(db2, function(dados){
		for(var i=0;i<dados.length;i++){	
			if (dados[i].id==cart){
				var produto = dados[i].id
				cont=cont+1;
				$('.contagem').html('');
				$('.contagem').append('<p>'+cont+'</p>')				
				// compras(produto);
			}
		};
	});
}

// function compras(produto){
// 	console.log(produto);
// 	var data;
// 	$.get(db, function(dados){
// 		for(var i=0;i<dados.length;i++){
// 			// console.log(dados[i].id);
// 			if (dados[i].id==produto){
// 				data={
// 					nome:dados[i].nome,
// 					descrição:dados[i].descrição,
// 					preço:dados[i].preço,
// 					peso:dados[i].peso,
// 					categoria:dados[i].categoria,
// 					imag:dados[i].imag,
// 					id:dados[i].id};
// 			}	
// 		}
// 	ajax("POST",db2,data);
// 	});
// }

// function ajax(tipo, url, dados){//requisição ajax, conforme dados recebidos

// 	$.ajax({
// 		type: tipo,
// 		url: url,
// 		data: dados,
// 		success: function(){
// 			avisos(msg);
// 			tabelatoda();
// 		},
// 		error: function(){
// 			msg=("Ops! Algo deu errado, tente novamente!");
// 			avisosdois(msg);
// 		}
// 	})
	
// }
// function heart(coracao){
// 	var id = $(coracao).parents('p').data("id");
// 	var cor ="rgb(225,0,0,0)";
// 	console.log(id);
// 	if(($(coracao).css("color"))==cor){
// 		$(id).css({"color":"rgb(0,0,0,0)"});
// 	} else{
// 		$(id).css({"color":"rgb(225,0,0,0)"});
// 	}
// 	console.log($(coracao).css("color"));
// }

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
					'.jpg"/><figcaption><p><i class="fa fa-fw fa-thumbs-o-up"></i><a href="http://localhost:5000/produto?id='+dados[i].id+'""><i class="fa fa-fw fa-info"></i></a><i class="fa fa-fw fa-heart"></i><i class="fa fa-fw fa-shopping-cart"  id="'+dados[i].id+'"></i></p></figcaption></figure></div></div></div>');
			}else if(categoria==0){
				$('#tabela').append('<div class ="col-md-4"><h3 class="nomeprincipal">'+dados[i].nome+
					'</h3><div class="grid"><figure class="effect-kira"><img src="../images/'+dados[i].imag+
					'.jpg"/><figcaption><p data-id="'+dados[i].id+'"><i class="fa fa-fw fa-thumbs-o-up"></i><a href="http://localhost:5000/produto?id='+dados[i].id+'"><i class="fa fa-fw fa-info"></i></a><i class="fa fa-fw fa-heart"></i><i class="fa fa-fw fa-shopping-cart"></i></p></figcaption></figure></div></div></div>');
			}
		}
	});
}

function mudanav(){
	if($(window).scrollTop() > 50) {
		$(".navbar").addClass("fixednav");
		$(".logo").addClass("fixedlog");
	} else {
		$(".navbar").removeClass("fixednav");
		$(".logo").removeClass("fixedlog");
    }
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
	// $('#tabela').on("click", ".fa-heart", function(){
	// 	heart(this);
	// 	// heart(event.target.id);
	// });
	$('#tabela').on("click", ".fa-shopping-cart", function(){
		cart(this);
	});
	$('#text-search').keyup(function(){
		procura(this);
	});

	 $(window).on("scroll", function() {
		mudanav();
	});
}

$(document).ready(function () {
	actions();
	filtros("0");
	pesquisa();

});

