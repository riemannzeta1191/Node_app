var fs = require('fs');
var express = require('express');
var parser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var student = require(__dirname + '/../models/student');
var studentdb = require(__dirname + '/../models/student_schema');

var router = express.Router();

var urlencodedParser = parser.urlencoded({ extended: false })

var db = 'mongodb://localhost:27018/student';
mongoose.connect(db,{useNewUrlParser: true});



router.get('/',function(req,resp){
		resp.render("index");
});


router.get('/studentInfo',function(req,resp){
	if (req.session.student  && req.session.student != undefined){
		var session_data = req.session.student;
		console.log(session_data);
	    resp.render("main",{theStudent:session_data})
    }   
    else {
    	resp.render('index');
    }

}); 
var count = 0;



router.post('/studentInfo', urlencodedParser,async function(req,resp,next){
	var newstudent = new student(req.body.firstname,req.body.lastname,req.body.degree,req.body.program);
    firstName = newstudent.firstname;
    lastName = newstudent.lastname;
    program = newstudent.program;
    degree = newstudent.degree;
  
    studentData = await search_name(firstName,lastName);
    if (studentData.length==0){
    	
    	var data = new studentdb({firstName:firstName,lastName:lastName,program:program,degree:degree});
    	
    	data.save(function (err,d){
    		if (err) return console.error(err);
    		console.log(d);
    	})
    }
    else {
    	studentData = await search_name(firstName,lastName)
    	if (studentData){
    		 updated = {firstName:req.body.firstname,lastName:req.body.lastname,degree:req.body.degree,program:req.body.program};
             var data = await studentdb.findOneAndUpdate({firstName:studentData.firstName,lastName:studentData.lastName,
          degree:studentData.degree,program:studentData.program}, updated);
             
    	}
    }
    
	sess_data = req.session.student;
	
	if (sess_data===undefined){
	req.session.student = newstudent;
}
	
	next()
}, function(req,resp,next){
	if (req.method === "GET") {
			res.end("GET method not supported");	
	} 
    
	else if (!req.session.student.hasOwnProperty("counter")) {
		req.session.student["counter"] = count;
		req.session.student["counter"] += 1;
		
	}
	else {
	     sess_data["counter"]	+= 1;
	}

	resp.render('main',{theStudent: req.session.student});


});


router.post('/search',urlencodedParser,async function(req,resp,next){
           
            var query = req.body.query;
			if (query.length != 0){
			var students = await search_name(query);
			if (students != undefined){
				resp.render('details',{studentData:students});
			}
			else{
				throw new Error("obj not found"); 
			}
		}
			else{
				resp.redirect('index')
			}
});



async function search_name(firstname,lastname){
	let students;

	if (lastname==undefined){		
	try{
		students = await studentdb.find({firstName:firstname});
		return students;
	}
	catch(err){		
		return;
	}	
}
	else{
		
		try{
		students = await studentdb.find({firstName:firstname,lastName:lastname});
		return students;
	}
	catch(err){	
		return;
	}	
}};


module.exports = router;


 
