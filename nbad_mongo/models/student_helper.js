var mongoose = require('mongoose');
var student = require(__dirname + '/student.js');
var studentdb = require(__dirname + '/student_schema.js');
console.log(student);


var db = 'mongodb://localhost:27018/student';
mongoose.connect(db,{useNewUrlParser: true});

var student_list = []

var student1 = new studentdb({'firstName':'Jade','lastName':'Sanders','degree':'MS','program':'Anthropology'});
var student2 = new studentdb({'firstName':'Jade','lastName':'Anthony','degree':'MS','program':'Ornithology'});
var student3 = new studentdb({'firstName':'Wolfgang','lastName':'Pauli','degree':'PhD','program':'Physis'});
var student4 = new studentdb({'firstName':'Evariste','lastName':'Galois','degree':'BS','program':'Mathematics'});

student_list.push(student1,student2,student3,student4);
student_list.forEach(function(item){
	item.save(function (err, student) {
      if (err) return console.log(err);
      console.log(student.firstName + " saved to student collection.");
    });

});
