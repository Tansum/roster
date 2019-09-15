var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/SC-Info', {useNewUrlParser: true});

var courseSchema = new mongoose.Schema({
	name: {				//课程名称
		type: String,
		required: true
	},
	character: {		//课程性质
		type: Number,
		enum: [0,1],	//0：选修 1：必修
		default: 0
	},
	credit: {			//学分
		type: Number,
		default: 2
	},
	periods: {			//学时
		type: Number,
		default: 32
	},
	info: {				//课程信息
		type: String
	}
})
// 直接导出模型构造函数
module.exports = mongoose.model('Course', courseSchema);