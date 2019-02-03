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

        var database = firebase.database();

        currentTime = moment().format('HH:mm');

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

            var firstTimeConverted = moment(snapVal.firstTime, "HH:mm").subtract(1, 'year');

            var difference = moment().diff(moment(firstTimeConverted), "minutes");

            var remainder = difference % snapVal.frequency;

            var minutesUntil = snapVal.frequency - remainder;

            var nextTrain = moment(currentTime, 'HH:mm').add(minutesUntil, 'minutes');

            nextTrain = nextTrain.format('HH:mm');

            var name = $("<td>").text(snapVal.trainName);
            var dest = $("<td>").text(snapVal.destination);
            var freq = $("<td>").text(snapVal.frequency + " mins");
            var next = $("<td>").text(nextTrain);
            var mins = $("<td>").text(minutesUntil + " mins");
        
            var train = $("<tr>").append(name, dest, freq, next, mins);

            tbody.append(train);

        });
    });