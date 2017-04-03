var fs = require('fs');

module.exports ={
	read: function(callback){ //função de leitura de json de produtos
		fs.readFile(__dirname + "/../" + "db/products.json", 'utf8',function(err, data){
			if(err)
				return console.log(err);
			data = JSON.parse(data); //transforma json em objeto javascript
			callback(data);
		});
	},
	readEncomendas: function(callback){ //função de leitura de json de encomendas
		fs.readFile(__dirname + "/../" + "db/encomendas.json", 'utf8',function(err, data){
			if(err)
				return console.log(err);
			data = JSON.parse(data); //transforma json em objeto javascript
			callback(data);
		});
	},
	// checkProduto: function(data, params){
	// 	data = JSON.parse(data);
	// 	for(var i=0;i<data.length;i++){
	// 		if(data[i].id==params){
	// 			return i;

	// 		}
	// 	}
	// },

	// write: function(dataJson, res){
	// 	fs.writeFile(__dirname + "/../" + 'db/products.json', dataJson, function(err){
	// 		if(err)
	// 			return console.log(err);
	// 		res.json({'msg': 'Usuário inserido com sucesso!'});
	// 	});
	// }
}