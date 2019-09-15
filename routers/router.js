const express = require('express');

var Student = require('../model/student.js');

var router = express.Router();

/*------------------学生------------------------*/
router.get('/students',(req,res)=>{
	Student.find()
		.then(students=>{
			res.render('index.html',{
				students: students
			})
		},err=>{
			res.status(500).send('Server error.');
		})
});

/*------------------添加------------------------*/
router.get('/students/new',(req,res)=>{
	res.render('new.html');
})

router.post('/students/new',(req,res)=>{
	new Student(req.body).save()
		.then(()=>{
			res.redirect('/students');
		},err=>{
			res.status(500).send('Server error.');
		})
})
/*------------------编辑------------------------*/
router.get('/students/edit',(req,res)=>{
	Student.findById(req.query.id.replace(/"/g, ''))
		.then((student)=>{
			res.render('edit.html',{
				student: student
			})
		},err=>{
			res.status(500).send('Server error.');
		})
})
router.post('/students/edit',(req,res)=>{
	Student.findByIdAndUpdate(req.body.id.replace(/"/g, ''),req.body)
		.then(()=>{
			res.redirect('/students');
		},err=>{
			res.status(500).send('Server error.');
		})
})
/*------------------删除------------------------*/
router.get('/students/delete',(req,res)=>{
	Student.findByIdAndDelete(req.query.id.replace(/"/g, ''))
		.then(()=>{
			res.redirect('/students');
		},err=>{
			res.status(500).send('Server error.');
		})
})

module.exports = router;
