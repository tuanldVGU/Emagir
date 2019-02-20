var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next){
	res.render('index',{title:"Welcome to Emagir"});
});

router.get('/aboutme', function(req,res,next){
	res.render('aboutme',{title:"About me"});
});

router.get('/t3game', function(req,res,next){
	res.render('t3game',{title:"Emagir tic tac toe"});
});

module.exports = router;