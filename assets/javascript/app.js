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

        $("#submit").on("click", function(event) {
            event.preventDefault();

            console.log("hey");
        
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

            var name = $("<td>").text(snapVal.trainName);
            var dest = $("<td>").text(snapVal.destination);
            var freq = $("<td>").text(snapVal.frequency);
        
            var train = $("<tr>").append(name, dest, freq);

            tbody.append(train);

        });
    });