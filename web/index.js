const express = require('express');
const router = express.Router();
const hbs = require('express-handlebars');
 
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render( __dirname + '/views/index.hbs', { title: 'Node Tutorial' });
});
 
router.post('/', function(req, res){
    //Grab the request body
    var body = req.body;
    
    var res_body = {
    e_mail: body.e_mail,
    password: body.password
    };
    
    res.render('home', res_body);
});

app.listen(3001,function(){
    console.log("Server running at Port 3001");
  });
 
module.exports = router;