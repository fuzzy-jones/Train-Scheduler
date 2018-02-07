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
    $("#train-name").val('');
    $("#destination").val('');
    $("#first-train").val('');
    $("#frequency").val('');

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

    // store the snapshot value in a new variable called sv
    var sv = snapshot.val();

    // set it one year back
    var firstTrainConverted = moment(sv.firstTrain, "HH:mm").subtract(1, "years");
    
    // moment js is stored in new variable
    var currentTime = moment();

    // difference between current time and first train
    var timeDifference = moment().diff(moment(firstTrainConverted), "minutes");

    // time between the difference and the frequency
    var timeApart = timeDifference % sv.frequency;

    // time until next train
    var minutesUntilTrain = sv.frequency - timeApart;

    // when the next train arrives
    var nextTrain = moment().add(minutesUntilTrain, "minutes");



    // display text in the html table body
    $("tbody").append("<tr><td>" + sv.trainName + "</td><td>" + sv.destination + "</td><td>" + sv.frequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + minutesUntilTrain + "</td></tr>");

// handle errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
