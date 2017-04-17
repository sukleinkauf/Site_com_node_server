var fs = require('fs');

module.exports ={
	read: function(callback){ //função de leitura de json de produtos
		fs.readFile(__dirname + "/../" + "db/products.json", 'utf8',function(err, data){
			if(err)
				return console.log(err);
			var data = JSON.parse(data); //transforma json em objeto javascript
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
	readProduto:function(params, data){
		for(var i=0;i<data.length;i++){
			if(data[i].id==params){
				return i;
			}
		}
	},
	readselect:function(params, data){
		for(var i=0;i<data.length;i++){
			if(data[i].id==params){
				return data[i];
			}
		}
	},
	valorcartao:function(valor){
		var valorparcela = valor/2;
		return valorparcela;
	},
	write: function(data, res){
		fs.writeFile(__dirname + "/../" + 'db/products.json', data, 'utf-8', function(err){
			if(err)
				return console.log(err);
		});
	}
}