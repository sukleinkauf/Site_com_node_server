var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = require('./../controller/file');

/* GET products listing. */
router.get('/', function(req, res) {
	file.readEncomendas(function(data){
		res.json(data);	
	});
});

module.exports = router;
