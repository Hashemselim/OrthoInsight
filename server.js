//Dependencies
const express = require('express');
const path = require('path');
const router = require('router');
const request = require('request');
const bodyParser = require('body-parser');
var hbs = require('express-handlebars');

var routes = require('./routes/login');

var app = express();

const public = __dirname + '/public/';

//Views Engine
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layouts', layoutDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Body Parser
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', routes);


//CSS FILES
app.get('/css',function(req, res){
    res.sendFile(public + 'css/index.css');
});

app.get('/logo',function(req, res){
    res.sendFile(public + 'img/orthoinsight.png');
});

app.get('/ianpic',function(req, res){
    res.sendFile(public + 'img/ianpic.png');
});

app.get('/womanicon1',function(req, res){
    res.sendFile(public + 'img/woman-1.png');
});

app.get('/womanicon2',function(req, res){
    res.sendFile(public + 'img/woman-2.png');
});
app.get('/womanicon3',function(req, res){
    res.sendFile(public + 'img/woman-3.png');
});

app.get('/doctoricon',function(req, res){
    res.sendFile(public + 'img/doctor-01.png');
});

app.get('/profileicon',function(req, res){
    res.sendFile(public + 'img/profile-icon.png');
});

app.get('/clock',function(req, res){
    res.sendFile(public + 'img/clock-purple.png');
});
app.get('/clock2',function(req, res){
    res.sendFile(public + 'img/clock.png');
});

app.get('/calendar',function(req, res){
    res.sendFile(public + 'img/calendar.png');
});
app.get('/calendar2',function(req, res){
    res.sendFile(public + 'img/calendar2.png');
});

//JS FILES
app.get('/data',function(req, res){
    res.sendFile(public + 'js/data.js');
});


// app.listen(5000,function(){
//     console.log("Server running at Port 5000");
// });

var port = process.env.PORT || 5000;

module.exports = app;