var express = require('express');
var session = require('express-session');
var router  = express.Router();
var mysql   = require('../connect');

router.post('/login', function(req, res, next) {
	let username = req.body.username;
	let password = req.body.password;
    let sql = "SELECT * FROM users WHERE username ='" + username + "' and password = '" + password + "' ";
    mysql.query(sql, function(err, result){
    	if (result.length == 1) {
    		req.session.id_users = result[0];
    		req.session.username = username;
    		console.log(req.session.username);
    		console.log(req.session.id_users);
    		res.redirect('/index') ;
    	}
    	else{
    		res.send("<script>alert('ไม่พบบัญชีนี้กรุณาตรวจสอบอีกครั้ง!');window.history.back()</script>");
    	}
    })
     
    
});

router.post('/register', function(req, res, next){
	let username = req.body.username;
	let email    = req.body.email;
	let password = req.body.password;
    console.log(req.body);
    res.redirect('/')
})

module.exports = router;