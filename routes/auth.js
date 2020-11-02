var express = require('express')
var session = require('express-session')
var router  = express.Router()
var mysql   = require('../connect')



router.get('/', function(req, res, next) {
    res.render('login', { message: {} })
})



router.get('/register', function(req, res, next) {
    res.render('register', { message: {}})
})



router.get('/logout', function(req, res, next){
    if(req.session.id_users) {
        req.session.destroy(function() {
            res.redirect('/')
        });
    }
    else{
        res.redirect('/')
    }
})



router.post('/login', function(req, res, next) {
	let username = req.body.username
	let password = req.body.password
    let sql = "SELECT * FROM users WHERE username ='" + username + "' and password = '" + password + "' "
    mysql.query(sql, function(err, result){
    	if (result.length == 1) {
    		req.session.id_users = result[0]
    		req.session.username = username
    		console.log(req.session.username)
    		console.log(req.session.username)
    		res.redirect('/index') 
    	}
    	else{
    		//res.send("<script>alert('ไม่พบบัญชีนี้กรุณาตรวจสอบอีกครั้ง!');window.history.back()</script>")
            res.render('login', {message : "This account could not be found, please check again!!"})
    	}
    })
})



router.post('/register', function(req, res, next){
    let message  = '';
	let username = req.body.username
	let email    = req.body.email
	let password = req.body.password
    let confirm_password = req.body.confirm_password
    mysql.query('SELECT username FROM users WHERE username = ?', [username], function(err, result){
        if(result.length > 0) {
            res.send("<script>alert('username นี้ ถูกใข้ไปแล้ว');window.history.back()</script>")
        }
        else if (username == 0) {
            res.send("<script>alert('ไม่พบข้อมูล username');window.history.back()</script>")
        }
        else if (email == 0) {
            res.send("<script>alert('ไม่พบข้อมูล email');window.history.back()</script>")
        }
        else if (password == 0) {
            res.send("<script>alert('ไม่พบข้อมูล password');window.history.back()</script>")
        }
        else if (password.length < 8) {
             res.send("<script>alert('password ต้องมีอย่าน้อย 8 ตัวขึ้นไป');window.history.back()</script>")
        }
        else if (password !== confirm_password) {
            console.log(password);
            console.log(confirm_password);
            res.send("<script>alert('password ไม่ตรงกัน');window.history.back()</script>")
        }
        else{
            let sql  = "INSERT INTO users SET ? "
            let data = {username, email, password} 
            mysql.query(sql, data, function(err, result){
                if (err) {
                    res.send(err)
                }
                else{
                    console.log(req.body)
                    res.redirect('/')
                }
            })
        }
    })
})

module.exports = router;