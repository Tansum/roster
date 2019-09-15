const express = require('express');

var Course = require('../model/course.js');

var router = express.Router();

/*------------------课程------------------------*/
router.get('/',(req,res)=>{
	Course.find()
		.then(courses=>{
			res.render('coursesInfo.html',{
				user: req.session.user,
				courses: courses
			})
		},err=>{
			res.status(500).send('Server error.');
		})
});

/*------------------添加------------------------*/
router.get('/new',(req,res)=>{
	res.render('newCourse.html');
})

router.post('/new',(req,res)=>{
	new Course(req.body).save()
		.then(()=>{
			res.redirect('/courses');
		},err=>{
			res.status(500).send('Server error.');
		})
})
/*------------------编辑------------------------*/
router.get('/edit',(req,res)=>{
	Course.findById(req.query.id.replace(/"/g, ''))
		.then((course)=>{
			res.render('editCourse.html',{
				course: course
			})
		},err=>{
			res.status(500).send('Server error.');
		})
})
router.post('/edit',(req,res)=>{
	Course.findByIdAndUpdate(req.body.id.replace(/"/g, ''),req.body)
		.then(()=>{
			res.redirect('/courses');
		},err=>{
			res.status(500).send('Server error.');
		})
})
/*------------------删除------------------------*/
router.get('/delete',(req,res)=>{
	Course.findByIdAndDelete(req.query.id.replace(/"/g, ''))
		.then(()=>{
			res.redirect('/courses');
		},err=>{
			res.status(500).send('Server error.');
		})
})

module.exports = router;
