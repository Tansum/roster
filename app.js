const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

var app = express();

app.engine('html',require('express-art-template'));
app.set('views',path.join(__dirname,'/views/'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public/',express.static(path.join(__dirname,'/public/')));
app.use('/node_modules/',express.static(path.join(__dirname,'/node_modules/')));

app.use(session({
  secret: 'guess',
  resave: false,
  saveUninitialized: false
}))

app.use('/students',require('./routers/students.js'));
app.use('/courses',require('./routers/courses.js'));
app.use('/',require('./routers/main.js'));

app.use((req,res)=>{
	res.render('404.html')
})

app.use((err,req,res,next)=>{	//必须为4个参数
	res.status(500).json({
		err_code: 500,
		message: err.message
	})
})

app.listen(3000,()=>{
	console.log('running……');
})
