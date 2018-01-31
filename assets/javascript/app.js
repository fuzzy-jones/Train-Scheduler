var config = {
    apiKey: "AIzaSyDfZyKrYdEWR7nBh1ovIBMrRthEYZy-AXo",
    authDomain: "train-scheduler-ac984.firebaseapp.com",
    databaseURL: "https://train-scheduler-ac984.firebaseio.com",
    projectId: "train-scheduler-ac984",
    storageBucket: "train-scheduler-ac984.appspot.com",
    messagingSenderId: "188346645088"
};

firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = 0;

$("#submit").on("click", function(event) {

    event.preventDefault();

    // store the values of the inputs inside the defined global variables
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();

    // empty all inputs after submit is clicked
    $("#train-name").val(' ');
    $("#destination").val(' ');
    $("#first-train").val(' ');
    $("#frequency").val(' ');

    // pushing the value inputs of the variables to the firebase database
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

// database reference on child added, snapshot function???
database.ref().on("child_added", function(snapshot) {

    // console log all snapshot values
    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);

    // display text in the html table
    $("#train-name-display").text(snapshot.val().trainName);
    $("#destination-display").text(snapshot.val().destination);
    $("#frequency-display").text(snapshot.val().frequency);
    // $("#next-arrival-display").text(snapshot.val().nextArrival);
    // $("#minutes-away-display").text(snapshot.val().minutesAway);

// handle errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
