var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = require('./../controller/file'); //importando documento file de  controller


router.get('/:id', function(req, res) {
	file.read(function(data){
		var id = req.params.id
		console.log(id)
		res.json(data);	//printando json de encomendas em pagina do servidor para manipular com javascript
	});
});

module.exports = router;
