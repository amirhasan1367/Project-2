var db = require("../models");
//var ticketVerifier = require("../models/ticket_verifier");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });
 // Get all Tickets
  app.get("/api/tickets", function(req, res) {
    db.Ticket.findAll({}).then(function(dbTicket) {
      res.json(dbTicket);
    });
  });

  // Create a new ticket
  app.post("/api/tickets", function(req, res) {
    db.Ticket.create(req.body).then(function(dbTicket) {
    res.json(dbTicket);
    // var isTicketVerified = ticketVerifier.verifyTicket(ticketNumber)
    // res.json(isTicketVerified);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
