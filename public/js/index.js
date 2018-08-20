// Get references to page elements
/* var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description"); */

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

  peopleCount: function(count){
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/peopleCount",
      data: JSON.stringify(count)
    });
  },
  rideCapacity: function(capacity){
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/rideCapacity",
      data: JSON.stringify(capacity)
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



// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
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

var handleRideCheckin = function () {
  event.preventDefault();

  var queue = {
    rideId: $(this).val(),
  };
  console.log("what is the value: " + parseInt($(this).val()));

  API.rideCheckin(queue).then(function () {
    console.log("you're in queue")
    //window.location.href = "http://localhost:5000/rides";
    API.peopleCount (queue).then(function(people){
      console.log("peope in line for this ride: " + people);
    })
  
  });

};

/* var peopleCount = function(){
  event.preventDefault();

  var queue = {
    rideId: $(this).val(),
    
  }

  API.peopleCount (queue).then(function(people){
    console.log("peope in line for this ride: " + people);
  })
} */



// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$checkIn.on("click", handleRideCheckin);
//$checkIn.on("click", peopleCount)

/* $exampleList.on("click", ".delete", handleDeleteBtnClick);
 */