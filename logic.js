$(document).ready(function() {

//Add firebase information to JS
var firebaseConfig = {
    apiKey: "AIzaSyDDOOuwdcsWAdwB4iRg582IilXc9ZYeUhg",
    authDomain: "train-scheduler-9fc0d.firebaseapp.com",
    databaseURL: "https://train-scheduler-9fc0d.firebaseio.com",
    projectId: "train-scheduler-9fc0d",
  };
//Initialize firebase
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();

  //Create on-click function for submit button
  $("#addTrain").on("click", function(event) {
      event.preventDefault();

      // Collect values from user input
      var trainName = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrain = $("#firstTrain").val();
      var frequency = $("#interval").val().trim();


      //Push variable data to database
      database.ref().push({
          trainName: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
      });
  });

  database.ref().on("child_added", function (childSnapshot) {
    var newTrain = childSnapshot.val().trainName;
    var newLocation = childSnapshot.val().destination;
    var newFirstTrain = childSnapshot.val().firstTrain;
    var newFrequency = childSnapshot.val().frequency;

    var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");

    var currentTime = moment();

    var diffTime = moment().diff(moment(startTimeConverted), "minutes");

    var tRemainder = diffTime % newFrequency;

    var tMinutesTillTrain = newFrequency - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var catchTrain = moment(nextTrain).format("HH:mm");

    $("#all-display").append('<tr><td>' + newTrain + '</td><td>' + newLocation + '</td><td>' + newFrequency + '</td><td>' + catchTrain + '</td><td>' + tMinutesTillTrain + '</td></tr>');
    
    $("#trainName, #destination, #firstTrain, #interval").val("");
    return false;



    

  })





})



