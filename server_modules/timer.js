/**
 * @fileOverview Timer module.
 * @author Hozaifa Abdalla
 * @version 1.0.0
 * @module Timer js
 */

/****************************************
 *             TIMER MODULE             *
 ****************************************/
(function() {
    var setTimer = function(date, time, notificationTime, callback) {
        var countDownDate = new Date(date + " " + time).getTime();

        // Update the count down every 1 second
        var x = setInterval(function() {

            // Get todays date and time
            var now = new Date().getTime();

            // Find the distance between now an the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // If the count down is over, write some text 
            if (distance == 0) {
                clearInterval(x);
                callback("Success");
                // console.log("Time to send Notification");
            }
            else {
                callback("Not Ready")
                // console.log("Current Time: %s:%s:%s", new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
                // Output the result in an element with id="demo"
                console.log(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
            }
        }, notificationTime);
    };

    var convertTimeFormat = function(timeStr) {
        if (timeStr == null)
            return;
        var timeArr = timeStr.split("T");
        var date = timeArr[0];
        var timeOfDay = timeArr[1].split("Z")[0];
        return {
            date: date,
            timeOfDay: timeOfDay
        };
    };
    exports.setTimer = setTimer;
    exports.convertTimeFormat = convertTimeFormat;
}).call(this);
