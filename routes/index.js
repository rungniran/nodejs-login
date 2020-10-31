var express = require('express');
var router = express.Router();


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


router.get('/', function(req, res, next) {
    res.render('login', { title: 'Express' });
});


router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Express' });
});



router.get('/logout', function(req, res, next){
    if(req.session.id_users) {
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
    else{
    	res.redirect('/')
    }
});
module.exports = router;
