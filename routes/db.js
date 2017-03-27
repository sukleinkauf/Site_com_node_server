var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = require('./../controller/file');

/* GET products listing. */
router.get('/', function(req, res) {
	file.read(function(data){
		var dataJson = JSON.stringify(data) //transforma variavel em Json
		res.json(data);	
	});
});

module.exports = router;
