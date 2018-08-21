// Get references to page elements
/* var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description"); */
$(document).ready(function () {
  var $submitBtn = $("#submit");
  var $checkIn = $(".checkIn");
  /* var $exampleList = $("#example-list"); */

  var $ticketEntry = $("#ticketEntry")

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveExample: function (example) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/examples",
        data: JSON.stringify(example)
      });
    },
    //My code ----------------------------------------
    ticketUpdate: function (ticket) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "PUT",
        url: "api/ticketverify",
        data: JSON.stringify(ticket)
      });
    },
    rideCheckin: function (ride) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/ridescheckin",
        data: JSON.stringify(ride)
      });
    },

    peopleCount: function (count) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/peopleCount",
        data: JSON.stringify(count)
      });
    },
    rideCapacity: function (capacity) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/ridesCapacity",
        data: JSON.stringify(capacity)
      });
    },
    confirmationNo: function (conf) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/confirmation",
        data: JSON.stringify(conf)
      });
    },
    //My code ----------------------------------------

    /*   getExamples: function () {
        return $.ajax({
          url: "api/examples",
          type: "GET"
        });
      },
      deleteExample: function (id) {
        return $.ajax({
          url: "api/examples/" + id,
          type: "DELETE"
        });
      } */
  };



  // this function verifies valid tickets
  var handleFormSubmit = function (event) {
    event.preventDefault();

    var ticket = {
      ticket_no: $ticketEntry.val().trim(),
      used: true
    };

    if (!(ticket.ticket_no)) {
      alert("Please enter a valid ticket number!");
      return;
    }

    $ticketEntry.val("");

    API.ticketUpdate(ticket).then(function () {
      console.log("your entry is submitted, wait for your turn")
      window.location.href = "http://localhost:5000/rides";
    });

  };

//Global variables
  var totalPeople = 0;
  var totalCapacity = 0;
  var totalRunTime = 0;
  var rideName;
  var confNo = Math.ceil(Math.random() * 10000);;

  //this function calcs the wait time
  var waitTimeCalculator = function () {

    if (totalPeople == 0 || totalCapacity == 0 || totalRunTime == 0 || rideName == "" || confNo == 0 ) {
      return false
    }
    //var confNo = Math.ceil(Math.random() * 10000);
    console.log("this the new function logging " + totalPeople + "and" + totalCapacity);
    //alert ("Your total wait time is:  " + Math.ceil(Math.ceil(((totalPeople / totalCapacity) * totalRunTime))/60) + " minutes")
    $("#confText").html("<p>Your reservation for <strong>" + rideName + "</strong> is completed</p>" +
      "<p>Your total wait time is:  " + Math.ceil(Math.ceil(((totalPeople / totalCapacity) * totalRunTime)) / 60) + " minutes</p>" +
      "<p>Your confirmation number is: " + confNo + "</p>");
    handleConfirmation(rideName, confNo);
  }



  //this function checks in people into ries and counts number of people in the queue
  var handleRideCheckin = function () {
    event.preventDefault();

    var queue = {
      rideId: $(this).val(),
      //id: $(this).val(),
    };
    console.log("what is the value: " + parseInt($(this).val()));

    //this resets this value
    totalPeople = 0

    API.rideCheckin(queue).then(function () {
      console.log("you're in queue")
      //window.location.href = "http://localhost:5000/rides";
      API.peopleCount(queue).then(function (people) {
        console.log("peope in line for this ride: " + people);
        /*         API.rideCapacity(queue).then(function (ride) {
                  console.log("here is your ride capacity: " + ride);
            
                }) */
        totalPeople = people;
        console.log("1st log" + totalPeople)

        waitTimeCalculator();

        return totalPeople;
      })

    });


  };






  //This function finds the ride capacity for wait time calc purposes
  var rideCapacity = function (Capacity1) {
    event.preventDefault();

    var queue = {
      id: $(this).val(),

    }

    //reset the value
    totalCapacity = 0

    API.rideCapacity(queue, Capacity1).then(function (ride) {
      console.log("here is your ride capacity: " + ride[0].Capacity);
      console.log("here is your ride run time: " + ride[0].RunTimeSec);

      totalRunTime = ride[0].RunTimeSec;
      totalCapacity = ride[0].Capacity;
      rideName = ride[0].Name;
      console.log("2nd log: " + totalCapacity)

      waitTimeCalculator();

      return totalCapacity && totalRunTime && rideName;
    })



  }

  var handleConfirmation = function (conf) {
    //event.preventDefault();

    var confirmation = {
      rideName: rideName,
      confNo: confNo
    };

    API.confirmationNo(confirmation).then(function (conf) {
      if (confNo == 0 ) {
        return false
      }
      confNo = conf.confNo;
      console.log("success! " + conf.confNo);
      //waitTimeCalculator();

      return confNo;

    });

  };

  // Add event listeners to the submit and delete buttons
  $submitBtn.on("click", handleFormSubmit);
  $checkIn.on("click", handleRideCheckin);
  $checkIn.on("click", rideCapacity);
  //$checkIn.on("click", peopleCount)

  /* $exampleList.on("click", ".delete", handleDeleteBtnClick);
   */
})
