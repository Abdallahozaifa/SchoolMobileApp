/**
 * @fileOverview Server file that handles all the requests
 * @author Hozaifa Abdalla
 * @version 1.0.0
 * @module server js
 */

/* LIBRARY IMPORTS */
var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
var timer = require('./server_modules/timer');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var schedule = require('node-schedule');

/* Seconds | Minutes | Hour | Day of Month | Month | Day of Week */
schedule.scheduleJob('00 5 2 14 8 1', function() {
    console.log('The answer to life, the universe, and everything!');
});

schedule.scheduleJob('00 6 2 14 8 1', function() {
    console.log('The answer to life, the universe, and everything!');
});



/* Express Body Parser*/
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('notification-request', function(data) {
        console.log(data);
        // timer.setTimer("2017-08-13", "13:27:00", 1000, function(status) {
        //     if (status == "Success") {
        //         client.emit('notification', 'Your exam is coming up!');
        //     }
        // });
    });
});

var accessToken = '1050~xJKSKyi7ZrBkbaOqIxy4X0gyfXDQX7ujmCLm7OwFtlmgFvAOgWlcH6zYVah1nex4';
// app.use('/css', express.static('css'));

//curl -H "Authorization: Bearer 1050~xJKSKyi7ZrBkbaOqIxy4X0gyfXDQX7ujmCLm7OwFtlmgFvAOgWlcH6zYVah1nex4" https://psu.instructure.com/api/v1/courses
var processRequest = function(url, callback) {

    var options = {
        url: url,
        headers: {
            'Authorization': 'Bearer 1050~xJKSKyi7ZrBkbaOqIxy4X0gyfXDQX7ujmCLm7OwFtlmgFvAOgWlcH6zYVah1nex4'
        }
    };

    request(options, function(err, res, body) {
        if (!err && res.statusCode == 200) {
            callback(body);
        }
        else {
            callback(res);
        }
    });
};

var getCourses = function(callback) {
    processRequest('https://psu.instructure.com/api/v1/courses', function(courseArr) {
        var courseArr = JSON.parse(courseArr);
        callback(courseArr);
    });
};


/**/
var getClassMaterial = function(url, callback) {
    processRequest(url, function(assignments) {
        callback(assignments);
    });
};


// timer.setTimer("2017-02", time.timeOfDay);
// /api/v1/users/:user_id/courses/:course_id/assignments
/* Obtains all the courses */
// getCourses(function(courseArr) {
//     /* Iterates through all the courses */
//     courseArr.forEach(function(course) {
//         var courseID = course.id;
//         /* Obtains all the assignments */
//         getClassMaterial('https://psu.instructure.com/api/v1/courses/' + courseID + '/assignments/', function(assignments) {
//             console.log("-------------" + course.name + "---------------");
//             var assignments = JSON.parse(assignments);
//             /* Iterates through all the assignments */
//             assignments.forEach(function(assignment) {
//                 console.log("Assignment Name: %s", assignment.name);
//                 var time = timer.convertTimeFormat(assignment["due_at"]);
//                 if (time != null) {
//                     console.log("Assignment Due Date: <%s, %s>", time.date, time.timeOfDay);
//                     timer.setTimer(time.date, time.timeOfDay);
//                 }
//             });
//         });
//         console.log("\n");
//     });
// });


/**
 * GET Request handler for '/'
 * Main Page of app.
 * @function
 * @param {string} - The string url for the handler
 * @param {callback} - The callback function
 * @module server js
 */
// app.get('/about', function(req, res) {
//     fs.readFile('about.html', 'utf8', function(err, data) {
//         if (!err) res.send(data);
//         else return console.log(err);
//     });
// });

/**
 * Server function for listening for request on the port 8080
 * @function
 * @param {string} - The string url for the port
 * @param {callback} - The callback function
 * @module beacon js
 */
// var server = app.listen(process.env.PORT || '8080', '0.0.0.0', function() {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log('running at http://' + host + ':' + port + "/");
// });
server.listen(process.env.PORT || '8080', '0.0.0.0', function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('running at http://' + host + ':' + port + "/");
});
