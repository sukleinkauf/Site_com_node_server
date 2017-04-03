var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
	fs.readFile(__dirname + '/../db/products.json', 'utf8', function(err, data){ //lendo dados json do arquivo products
		data= JSON.parse(data)
		res.render('index', { title: 'Sweet Feelings', data: data});//renderizando pagina e enviando parâmetros title e dados json
		res.end();
	});
});

module.exports = router;
