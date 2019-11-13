var express = require('express');
var session = require('express-session')
var path =require('path');

var app = express();

let Student_Controller = require('./routes/studentInfo');
let Index = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({secret:"camusrebel",resave:true, saveUninitialized:true }));
app.use('/assets',express.static(path.join(__dirname, 'assets')));

app.use('/', Student_Controller);
app.all('/studentInfo', Student_Controller);
app.use('/studentInfo/*',Student_Controller);
app.use('/search',Student_Controller);
app.use('/*',Student_Controller);



module.exports = app;

app.listen(8080, () => console.log(`Example app listening on port 8080!`))