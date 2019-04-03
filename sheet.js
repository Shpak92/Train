 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDzqf2WHIgEBoFxvFepc5XDGSlMSI3jNdY",
    authDomain: "train-schedule-45b13.firebaseapp.com",
    databaseURL: "https://train-schedule-45b13.firebaseio.com",
    projectId: "train-schedule-45b13",
    storageBucket: "train-schedule-45b13.appspot.com",
    messagingSenderId: "958520006434"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

//Button for adding train schedule
$("#add-employee-btn").on("click", function(event) {
    event.preventDefault();
 
// Grabs user input
var trnName = $("#train-name-input").val().trim();
var trnDestination = $("#destination-input").val().trim();
var trnStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
var trnFreq = $("#frequency-input").val().trim();

//Holding the train data
var newTrain = {
    name: trnName,
    destination: trnDestination,
    start: trnStart,
    frequency: trnFreq,
};
// Uploads employee data to the database
database.ref().push(newTrain);

// Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

// Clears all of the text-boxes
$("#train-name-input").val(" ");
$("#destination-input").val(" ");
$("#start-input").val(" ");
$("#frequency-input").val(" ");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
console.log(childSnapshot.val());

//Stores everything in a variable 
var trnName = childSnapshot.val().name;
var trnDestination = childSnapshot.val().destination;
var trnStart = childSnapshot.val().start;
var trnFreq = childSnapshot.val().frequency;

 // Consolog the variables 
 console.log(trnName);
 console.log(trnDestination);
 console.log(trnStart);
 console.log(trnFreq);

//Calculate the minutes away 
var time = 3;
var firstTime ="3:30";
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);
var timeDIff =  moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + Timediff);
var tRemainder = timeDiff % time;
console.log(tRemainder);
var tMinutesTillTrain = time - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);




  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trnName ),
    $("<td>").text(trnDestination),
    $("<td>").text(trnStart),
    $("<td>").text(trnFreq),
    $("<td>").text(tMinutesTillTrain),
  );
// Append the new row to the table
$("#train-table > tbody").append(newRow);


});  


