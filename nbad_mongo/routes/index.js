var fs = require('fs');
var express = require('express');
// console.log(student);


var router = express.Router();


console.log(__dirname);
router.get('/*',function(req,resp){
		resp.send('The Universe is expanding!');
});


module.exports = router;