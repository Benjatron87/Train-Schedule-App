$(document).ready(function() {

    var config = {
            apiKey: "AIzaSyAwMZV5mvS7cxbWuA8aMYHMWpOWVjE58oM",
            authDomain: "benj-click8117.firebaseapp.com",
            databaseURL: "https://benj-click8117.firebaseio.com",
            projectId: "benj-click8117",
            storageBucket: "benj-click8117.appspot.com",
            messagingSenderId: "490308782929"
        }
        
        firebase.initializeApp(config)

        let arr = []

        var database = firebase.database();

        let currentTime = moment().format('HH:mm');

        $("#submit").on("click", function() {
        
            var trainName = $("#train-name").val().trim();
            var firstTime = $("#first-time").val().trim();
            var frequency = $("#frequency").val().trim();
            var destination = $("#destination").val().trim();

            database.ref().push({
                trainName: trainName,
                firstTime: firstTime,
                frequency: frequency,
                destination: destination
            })

        })

            database.ref().on("child_added", function(snapshot) {

                var tbody = $("#current-trains");

                var snapVal = snapshot.val();

                arr.push(snapVal);
            });

            setInterval(function(){

                var tbody = $("#current-trains");

                tbody.empty();

                let currentTime = moment().format('HH:mm');

                for(let i = 0; i < arr.length; i++){

                    var firstTimeConverted = moment(arr[i].firstTime, "HH:mm").subtract(1, 'year');

                    var difference = moment().diff(moment(firstTimeConverted), "minutes");

                    var remainder = difference % arr[i].frequency;

                    var minutesUntil = arr[i].frequency - remainder;

                    var nextTrain = moment(currentTime, 'HH:mm').add(minutesUntil, 'minutes');

                    nextTrain = nextTrain.format('HH:mm');

                    var name = $("<td>").text(arr[i].trainName);
                    var dest = $("<td>").text(arr[i].destination);
                    var freq = $("<td>").text(arr[i].frequency + " mins");
                    var next = $("<td>").text(nextTrain);
                    var mins = $("<td>").text(minutesUntil + " mins");
                
                    var train = $("<tr>").append(name, dest, freq, next, mins);

                    tbody.append(train);
                }

            }, 500)

        });     