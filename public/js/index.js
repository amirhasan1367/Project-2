// Get references to page elements
/* var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description"); */

var $submitBtn = $("#submit");
var $checkIn = $("#checkIn");
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
  //My code ----------------------------------------

  getExamples: function () {
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
  }
};

// refreshExamples gets new examples from the db and repopulates the list
/* var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
}; */

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

var handleRideCheckin = function (event) {
  event.preventDefault();

  var queue = {
    rideId: $(this).value,
  };
  console.log("what is the value: " + parseInt($(this).value));

  API.rideCheckin(queue).then(function () {
    console.log("you're in queue'")
    //window.location.href = "http://localhost:5000/rides";

  });

};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$checkIn.on("click", handleRideCheckin)
/* $exampleList.on("click", ".delete", handleDeleteBtnClick);
 */