var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = require('./../controller/file');//importando documento file de  controller


/* GET products listing. */
router.get('/produto', function(req, res) {
	var id = req.query.id;//pegando id do produto enviado por url
	fs.readFile(__dirname + '/../db/products.json', 'utf8', function(err, data){
		data = JSON.parse(data);
		for(var i=0;i<data.length;i++){
			if(data[i].id==id){
				var produto=data[i];
			}
		}
		res.render('produto', {produto: produto, data:data});//renderizando página e passando parametros data e id
	});
});

module.exports = router;
