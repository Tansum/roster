const express = require('express');
const md5 = require('md5');
var User = require('../model/user.js');

var router = express.Router();

/*-----------注册---------------*/
router.get('/register',(req,res)=>{
	res.render('register.html');
})

router.post('/register',(req,res,next)=>{
	let body = req.body;
	User.findOne({
		email: body.email
	})
	.then(data=>{
		if(data) {
			return res.status(200).json({
				err_code: 1,
				msg: 'Email already exists.'
			})
		}
		//加密
		body.password = md5(md5(body.password))
		new User(body).save()
		.then(user=>{
			// req.session.user = user;
			res.status(200).json({
				err_code: 0,
				msg: 'Ok.'
			})
		},
		err=>{
			return next(err)
		})
	},
	err=>{
		return next(err)
	})
})


/*-----------登录---------------*/
router.get('/login',(req,res)=>{
	res.render('login.html');
})
router.post('/login',(req,res,next)=>{
	let body = req.body;
	User.findOne({
		email: body.email,
		password: md5(md5(body.password))
	})
	.then(user=>{
		if(!user){
			return res.status(200).json({
				err_code: 1,
				message: 'Email or password is invalid.'
			})
		}
		req.session.user = user;
		res.status(200).json({
			err_code: 0,
			message: 'Ok'
		})
	},
	err=>{
		return next(err)
	})
	
})

/*-----------退出---------------*/
router.get('/logout',(req,res)=>{
	req.session.user = null;
	res.redirect('/students');
})


module.exports = router;
