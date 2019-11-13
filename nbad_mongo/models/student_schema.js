var mongoose  =  require('mongoose');
// var Schema = mongoose.schema;

var StudentSchema = mongoose.Schema({
	firstName: {type:String,required:true},
	lastName: {type:String,required:true},
	degree: String,
	program: String

});

module.exports = mongoose.model('student',StudentSchema);

