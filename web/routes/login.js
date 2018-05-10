const express = require('express');
const router = express.Router();
const request = require('request-promise');
const bodyParser = require('body-parser');
const moment = require('moment');

var app = express();
var data = require('./data.js');

//Body Parser
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'OI Login!' });
});

router.post('/', function(req, res, next) {
    userEmail = req.body.e_mail;
    userPassword = req.body.password;

    console.log("Email: " , userEmail);
    console.log("Password: ", userPassword);

    var loginAPI = {
        uri: 'https://orthoinsights.herokuapp.com/login',
        method: 'POST',
        json: {
            "e_mail": userEmail,
            "password": userPassword
        },
    };

    var loginMsg = "";
    var user_id = "";

    request(loginAPI)
        .then(function (body) {
            var loginMsg = body['msg'];
            var userId = body['user_id'];
            var patientIdArray = body['patient_ids'];

            console.log("Login: ", loginMsg);
            console.log("Doctor Id: ", userId);
            console.log("Patient Ids: ", patientIdArray);

            var patientId = patientIdArray[0];

            var getAllPointsApi = {
                uri: 'https://orthoinsights.herokuapp.com/get_all_points',
                method: 'POST',
                json: {
                    "user_id": patientId
                },
            };
            
            request(getAllPointsApi)
                .then(function(body){
                    var allPoints = body;
                    // console.log(allPoints);
                    var sensor1 = [];
                    var sensor2 = [];
                    var timestamp= [];

                    function appendSensor1Points(allPoints){
                        sensor1.push(allPoints.sensor1);
                    };
                    allPoints.forEach(appendSensor1Points);

                    function appendSensor2Points(allPoints){
                        sensor2.push(allPoints.sensor2);
                    };
                    allPoints.forEach(appendSensor2Points);

                    function appendTimestampPoints(allPoints){
                        var timestampClean = new Date(allPoints.timestamp)
                        
                        var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                        var year = timestampClean.getFullYear();
                        var month = months[timestampClean.getMonth()];
                        var date = timestampClean.getDate();
                        var time = timestampClean.getTime();
                        var hour = timestampClean.getHours();
                        var min = timestampClean.getMinutes();
                        var sec = timestampClean.getSeconds();
                        // var time = (hour + "" + min + "" + sec);

                        // timestamp.push(timestampClean.toDateString());
                        timestamp.push(time);
                    };
                    allPoints.forEach(appendTimestampPoints);
                    
                    console.log("Patient: ", patientId);
                    console.log("Sensor 1: " , sensor1.slice(1,10));
                    console.log("Sensor 2: " , sensor2.slice(1,10));
                    console.log("Timestamp: " , timestamp.slice(1,10));

                    //DUMMY DATA PASSED INTO WEBPAGE
                    var dashboardBody = {
                        email: userEmail,
                        password: userPassword,
                        loginMsg: loginMsg,
                        userId: userId,
                        patientIdArray: patientIdArray,
                        patientId: patientId,
                        sensor1: data.sensor1Min,
                        sensor2: data.sensor2Min,
                        timestamp: data.timestampMin
                    };

                    // var dashboardBody = {
                    //     email: userEmail,
                    //     password: userPassword,
                    //     loginMsg: loginMsg,
                    //     userId: userId,
                    //     patientIdArray: patientIdArray,
                    //     patientId: patientId,
                    //     sensor1: sensor1.slice(1,10),
                    //     sensor2: sensor2.slice(1,10),
                    //     timestamp: timestamp.slice(1,10)
                    // };
        
                    if (loginMsg == "success"){
                        res.render('dashboard', dashboardBody);
                        console.log("Login Successful: ", loginMsg);
                    } else{
                        res.render('login',{loginPass: true});
                        console.log("Login Failed: ", loginMsg);
                    };
                })
                .catch(function (err) {
                    console.log("Failed Get All Points Requets Pull")
                    res.render('login',{loginError: true});
                });
        })
        .catch(function (err) {
            console.log("Failed Login Requests Pull")
            res.render('login',{loginPass: true});
        });
});

module.exports = router;