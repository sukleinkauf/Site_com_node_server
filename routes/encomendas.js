var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = require('./../controller/file');

/* GET products listing. */
router.get('/', function(req, res) {
	fs.readFile(__dirname + '/../db/products.json', 'utf8', function(err, data){
		data = JSON.parse(data);
		res.render('encomendas', {data: data});
	});
});

module.exports = router;
