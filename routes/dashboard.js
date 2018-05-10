const express = require('express');
const router = express.Router();
const request = require('request');
const bodyParser = require('body-parser');

var app = express();

//Body Parser
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'OI Login!' });
});

router.post('/', function(req, res, next) {
    var userEmail = req.body.e_mail;
    var userPassword = req.body.password;

    console.log("Email: " , userEmail);
    console.log("Password: ", userPassword);

    //Get Login-------------------------------------------------------------------------------------
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

    request.post(loginAPI, function (err, res, body) {
        var loginMsg = res.body['msg'];
        var userId = res.body['user_id'];
        var patientIdArray = res.body['patient_ids'];
    
        console.log("Login: ", loginMsg);
        console.log("Doctor Id: ", userId);
        console.log("Patient Ids: ", patientIdArray);

        // Get All Points for each patient-------------------------------------------------------------------------------------
        // for (var i = 0, patientId; i < patientIdArray.length; i++) {
            var patientId = patientIdArray[0];

            var getAllPointsApi = {
                uri: 'https://orthoinsights.herokuapp.com/get_all_points',
                method: 'POST',
                json: {
                    "user_id": patientId
                },
            };

            request.post(getAllPointsApi, function (err, res, body) {

                var allPoints = res.body;
                // console.log(allPoints);
                var sensor1 = [];
                var sensor2 = [];
                var timestamp = [];

                function appendSensor1Points(allPoints){
                    sensor1.push(allPoints.sensor1);
                };
                allPoints.forEach(appendSensor1Points);

                function appendSensor2Points(allPoints){
                    sensor2.push(allPoints.sensor2);
                };
                allPoints.forEach(appendSensor2Points);

                function appendTimestampPoints(allPoints){
                    timestamp.push(allPoints.timestamp);
                };
                allPoints.forEach(appendTimestampPoints);
                
                
                console.log("Patient: ", patientId);
                console.log("Sensor 1: " , sensor1.slice(0,10));
                console.log("Sensor 2: " , sensor2.slice(0,10));
                console.log("Timestamp: " , timestamp.slice(0,10));

                router.post('/login', function(req, res, next){

                    var dashboardBody = {
                        email: userEmail,
                        password: userPassword,
                        loginMsg: loginMsg,
                        user_id: user_id,
                        patientMsg: patientMsg,
                        patientIdArray: patientIdArray,
                        patientId: patientId,
                        sensor1: sensor1.slice(0,20),
                        sensor2: sensor2.slice(0,20),
                        timestamp: timestamp.slice(0,20)
                    };
                    
                    res.render('dashboard', dashboardBody);

                    // if (loginMsg == "success"){
                    //     res.render('dashboard', dashboardBody);
                    //     console.log("Login Successful: ", loginMsg);
                    // } else{
                    //     res.render('login',{loginFail: true});
                    //     console.log("Login Failed: ", loginMsg);
                    // };
                });
            });

            
        // };
        // END Get All Points-------------------------------------------------------------------------------------
    });
    // END Get Login-------------------------------------------------------------------------------------
});

// router.post('/login', function(req, res, next){

//     var dashboardBody = {
//         email: res.locals.userEmail,
//         password: res.locals.userPassword,
//         loginMsg: res.locals.loginMsg,
//         user_id: res.locals.user_id,
//         patientMsg: res.locals.patientMsg,
//         patientIdArray: res.locals.patientIdArray,
//         patientId: res.locals.patientId,
//         sensor1: res.locals.sensor1,
//         sensor2: res.locals.sensor2,
//         timestamp: res.locals.timestamp
//     };
    
//     if (res.locals.loginMsg == "success"){
//         res.render('dashboard', dashboardBody);
//         console.log("Login Successful: ", loginMsg);
//     } else{
//         res.render('login',{loginFail: true});
//         console.log("Login Failed: ", loginMsg);
//     };
// });

module.exports = router;