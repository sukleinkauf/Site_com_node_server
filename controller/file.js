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
	// includeid: function(params, data){
	// 	var tam=data.length;
	// 	var id=data[tam-1].id+1;
	// 	console.log("teste");
	// 	Object.defineProperty(params, "id", {
	// 		get: function () { return id; },
	// 		set: function (value) { id = value; },
	// 		enumerable: true
	// 	});
	// 	return params;
	// },
	readProduto:function(params, data){
		for(var i=0;i<data.length;i++){
			if(data[i].id==params){
				return i;
			}
		}
	},
	// deleteItem:function(posArr, data){
	// 	var item = data[posArr];
	// 	item.preferido = 'Sim';
	//  	data.splice(posArr, 1);
		
	// 	return data;
	// },
	write: function(data, res){
		fs.writeFile(__dirname + "/../" + 'db/products.json', data, 'utf-8', function(err){
			if(err)
				return console.log(err);
		});
	}
}