var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = require('./../controller/file');//importando documento file de  controller


router.get('/:prod', function(req, res) {
	// var id = req.query.id;//pegando id do produto enviado por url
	fs.readFile(__dirname + '/../db/products.json', 'utf8', function(err, data){
		data = JSON.parse(data);
		var produto = file.readselect(req.params.prod, data.produtos);
		var valorparcela=file.valorcartao(produto.valor);
		var valor=(parseFloat(produto.valor).toFixed(2)).toString().replace(".", ",");

		res.render('produto', {produto: produto, parcela: valorparcela, valor: valor});//renderizando página e passando parametros data e id
	});
});

module.exports = router;
