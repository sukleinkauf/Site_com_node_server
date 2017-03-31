var fs = require('fs');

module.exports ={
	read: function(callback){
		fs.readFile(__dirname + "/../" + "db/products.json", 'utf8',function(err, data){
			if(err)
				return console.log(err);
			data = JSON.parse(data);
			callback(data);
		});
	},
	readEncomendas: function(callback){
		fs.readFile(__dirname + "/../" + "db/encomendas.json", 'utf8',function(err, data){
			if(err)
				return console.log(err);
			data = JSON.parse(data);
			callback(data);
		});
	},
	// checkProduto: function(data, params){
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