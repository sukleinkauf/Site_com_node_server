var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = require('./../controller/file');

/* GET products listing. */
router.get('/', function(req, res) {
	fs.readFile(__dirname + '/../db/products.json', 'utf8', function(err, data){
		data = JSON.parse(data);
		res.render('index-catalogo'); //renderizando pagina e enviando para view index-catalogo os dados json
	});
});

router.get('/:fav', function(req, res) {
	fs.readFile(__dirname + '/../db/products.json', 'utf8', function(err, data){
	 	var data = JSON.parse(data);
	 	var posArr = file.readProduto(req.params.fav, data.produtos);
	 	var item = data.produtos[posArr];

	 	if(item.preferido == "não"){
	 		item.preferido = "sim";
	 		console.log("esse produto não era preferido");
	 	}else{
	 		item.preferido = "não";
	 		console.log("esse produto era preferido");
	 	}

	 	data.produtos.splice(posArr, 1);
		data.produtos.push(item);
		var newDB = JSON.stringify(data);
		file.write(newDB, res);
	});
});
module.exports = router;
