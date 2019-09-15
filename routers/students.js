const express = require('express');

var Student = require('../model/student.js');

var router = express.Router();

/*------------------学生------------------------*/
router.get('/',(req,res)=>{
	Student.find()
		.then(students=>{
			res.render('studentsInfo.html',{
				user: req.session.user,
				students: students
			})
		},err=>{
			res.status(500).send('Server error.');
		})
});

/*------------------添加------------------------*/
router.get('/new',(req,res)=>{
	res.render('newStudent.html');
})

router.post('/new',(req,res)=>{
	new Student(req.body).save()
		.then(()=>{
			res.redirect('/students');
		},err=>{
			res.status(500).send('Server error.');
		})
})
/*------------------编辑------------------------*/
router.get('/edit',(req,res)=>{
	Student.findById(req.query.id.replace(/"/g, ''))
		.then((student)=>{
			res.render('editStudent.html',{
				student: student
			})
		},err=>{
			res.status(500).send('Server error.');
		})
})
router.post('/edit',(req,res)=>{
	Student.findByIdAndUpdate(req.body.id.replace(/"/g, ''),req.body)
		.then(()=>{
			res.redirect('/students');
		},err=>{
			res.status(500).send('Server error.');
		})
})
/*------------------删除------------------------*/
router.get('/delete',(req,res)=>{
	Student.findByIdAndDelete(req.query.id.replace(/"/g, ''))
		.then(()=>{
			res.redirect('/students');
		},err=>{
			res.status(500).send('Server error.');
		})
})

module.exports = router;
