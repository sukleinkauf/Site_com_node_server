var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = require('./../controller/file');//importando documento file de  controller


/* GET products listing. */
router.get('/', function(req, res) {
	var params = req.query;//pegando id do produto enviado por url
	console.log(params)
	res.render('encomendas', {});//renderizando página e passando parametros data e id
});

module.exports = router;
