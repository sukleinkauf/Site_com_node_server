var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = require('./../controller/file');

/* GET products listing. */
router.get('/produto', function(req, res) {
	var id = req.query.id;
	fs.readFile(__dirname + '/../db/products.json', 'utf8', function(err, data){
		res.render('produto', {data: data, id:id});
	});
});

module.exports = router;
