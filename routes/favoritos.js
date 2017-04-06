var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = require('./../controller/file'); //importando documento file de  controller

/* GET home page. */
router.get('/', function(req, res, next) {
	file.read(function(data){ //lendo dados json do arquivo products
		res.render('favoritos', { title: 'Sweet Feelings', data: data});//renderizando pagina e enviando parâmetros title e dados json
	});
});

module.exports = router;
