var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET products listing. */
router.get('/', function(req, res) {
	fs.readFile(__dirname + '/../db/products.json', 'utf8', function(err, data){
		// data = JSON.parse(data);
		file.write(dataJson, res);
	});
});

module.exports = router;
