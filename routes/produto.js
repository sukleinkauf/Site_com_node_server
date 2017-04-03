var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = require('./../controller/file');//importando documento file de  controller


/* GET products listing. */
router.get('/produto', function(req, res) {
	var id = req.query.id;//pegando id do produto enviado por url
	fs.readFile(__dirname + '/../db/products.json', 'utf8', function(err, data){
		res.render('produto', {data: data, id:id});//renderizando página e passando parametros data e id
	});
});

module.exports = router;
