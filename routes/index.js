var express = require('express');
var router = express.Router();
var mysql   = require('../connect')

router.get('/index', function(req, res, next) {
	if (!req.session.id_users) {
		res.redirect('/')
	}
    res.render('index', 
    	{   title: 'Express', 
    	    data : req.session.id_users 
    });
});


router.get('/profile', function(req, res, next) {
	if (!req.session.id_users) {
		res.redirect('/')
	}
    res.render('profile', 
    	{   title: 'Express', 
    	    data : req.session.id_users 
    });
});


module.exports = router;
