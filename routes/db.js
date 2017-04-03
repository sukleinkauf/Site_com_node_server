var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = require('./../controller/file'); //importando documento file de  controller


router.get('/', function(req, res) {
	file.read(function(data){
		res.json(data);	//printando json de produtos em pagina do servidor para manipular em javascript com as informações
	});
});

module.exports = router;
