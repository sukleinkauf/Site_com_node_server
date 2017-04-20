var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = require('./../controller/file'); //importando documento file de  controller

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('fimcompra', { title: 'Sweet Feelings'});//renderizando pagina e enviando parâmetros title e dados json
});

module.exports = router;