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
  //Reference the firebase database to pull back information
  database.ref().on("child_added", function (childSnapshot) {
    var newTrain = childSnapshot.val().trainName;
    var newLocation = childSnapshot.val().destination;
    var newFirstTrain = childSnapshot.val().firstTrain;
    var newFrequency = childSnapshot.val().frequency;

    //Convert inputed moment and subtract a year to ensure input will be first train
    var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");
    //Create moment for current time
    var currentTime = moment();
    //Calculate difference between current time and start time
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");
    //Calculate time difference til next train
    var tRemainder = diffTime % newFrequency;
    //Calculate minutes until next train
    var tMinutesTillTrain = newFrequency - tRemainder;
    //Next train data
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var catchTrain = moment(nextTrain).format("HH:mm");
    //Display the data in the table
    $("#all-display").append('<tr><td>' + newTrain + '</td><td>' + newLocation + '</td><td>' + newFrequency + '</td><td>' + catchTrain + '</td><td>' + tMinutesTillTrain + '</td></tr>');
    //Clear input fields
    $("#trainName, #destination, #firstTrain, #interval").val("");
    return false;



    

  })





})



