//Values for 1 hr. 1 point every minute. 
var sensor1Min = [];
var sensor2Min = [];
var timestampMin = [];


for (var i=0; i<60; i++){
    sensor1Min[i] = Math.floor(Math.random() * 6) + 0;
    sensor2Min[i] = Math.floor(Math.random() * 6) + 0;
};


var timestamp = new Date();
var oneHourAgo = new Date(timestamp - (60 * 60000));

console.log(timestamp.toUTCString());
console.log(oneHourAgo.toUTCString());

for (var i=0; i<60; i++){

    var time = new Date(oneHourAgo);
    time.setMinutes(oneHourAgo.getMinutes() +i);

    timestampMin[i] = time.getTime();
};

// var hour = 12
// var minute = 0;
// for (var i=0; i<60; i++){
//     if (i<=58 & i<=8){
//         minute = minute + 1;
//         var time = hour + ":" + "0" + minute;
//     }else if (i<=58 & i>=9){
//         minute = minute + 1;
//         var time = hour + ":" + minute;
//     }else if(i=59){
//         hour = hour + 1;
//         minute = 0;
//         var time = hour + ":" + minute;
//     }
//     timestampMin[i] = time;
// };


console.log("Sensor 1: " + sensor1Min);
console.log("Sensor 2: " + sensor2Min);
console.log("Time: " + timestampMin);

exports.sensor1Min = sensor1Min.slice(39,59);
exports.sensor2Min = sensor2Min.slice(39,59);
exports.timestampMin = timestampMin.slice(39,59);