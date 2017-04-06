var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = require('./../controller/file');//importando documento file de  controller


/* GET products listing. */
router.get('/produto', function(req, res) {
	var id = req.query.id;//pegando id do produto enviado por url
	fs.readFile(__dirname + '/../db/products.json', 'utf8', function(err, data){
		data = JSON.parse(data);
		for(var i=0;i<data.produtos.length;i++){
			if(data.produtos[i].id==id){
				var item=data.produtos[i];
				console.log(data.produtos[i])
			}
		}
		res.render('produto', {item: item, data:data});//renderizando página e passando parametros data e id
	});
});

module.exports = router;
