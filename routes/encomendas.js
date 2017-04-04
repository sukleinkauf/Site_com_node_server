var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = require('./../controller/file');//importando documento file de  controller


/* GET products listing. */
router.get('/', function(req, res) {
	fs.readFile(__dirname + '/../db/encomendas.json', 'utf8', function(err, data){ 

		// data = JSON.parse(data);
		// var params = req.query;//pegando id do produto enviado por url
		// var checkname=0;

		// checkname = file.checkProduto(data,params);
		// if(checkname==true){
		// 	data.push(params);
		// 	var dataJson = JSON.stringify(data); 
		// 	file.write(dataJson, res);
		// }else{
		// 	alert("Atenção! Produto já encomendado. Tem certeza que deseja continuar?");
		// }

		res.render('encomendas', {data});//renderizando página e passando parametros data e id
	});
});

module.exports = router;
