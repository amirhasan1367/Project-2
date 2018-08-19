var db = require("../models");
var authController = require('../controllers/authcontroller.js');


//var ticketVerifier = require("../models/ticket_verifier");

module.exports = function (app) {

  // Get all Tickets
  app.get("/api/tickets", function (req, res) {
    db.Ticket.findAll({}).then(function (dbTicket) {
      res.json(dbTicket);
    });
  });

  // Create a new ticket
  app.post("/api/newticket", function (req, res) {
    db.Ticket.create(req.body).then(function (dbTicket) {
      res.json(dbTicket);
      // var isTicketVerified = ticketVerifier.verifyTicket(ticketNumber)
      // res.json(isTicketVerified);
    });
  });

  // PUT for ticket verification
  app.put("/api/ticketverify", function (req, res) {
    db.Ticket.count({
      where: {
        ticket_no: req.body.ticket_no,
        used: false
      }
    }).then(function (count) {
      console.log('hey what is the count')
      console.log(count)
      if (count === 1) {
        db.Ticket.update(
          req.body,
          {
            where: {
              ticket_no: req.body.ticket_no
            }
          }).then(function (dbTicket) {
            res.json(dbTicket);
            //return res.redirect('/rides');

          });
      }
      else {
        console.log('This is not a valid ticket!')
        //res.json({ 'error': 'invalid ticket' })
        return res.redirect('back');
      }
    })
  });

  //POST for rides check-in
  app.post("/api/ridescheckin", function (req, res) {
    db.Queue.create(req.body).then(function (dbQueue) {
      res.json(dbQueue);
    })
  });

  app.get('/rides', function (req, res) {
    res.render("views/rides")
  })

  app.post("/api/findticket", function (req, res) {
    db.Ticket.findAll({
      where: {
        ticket_no: req.body.ticket_no
      }
    }).then(function (dbTicket) {
      if (!dbTicket) {
        res.json(JSON.stringify({ 'error': 'invalid ticket' }))
      }
      else {
        res.json(dbTicket);
      }
    });
  });

  // Get all Rides
  app.get("/api/rides", function (req, res) {
    db.Ride.findAll({}).then(function (dbRide) {
      res.json(dbRide);
    });
  });

  // Create a new Ride
  app.post("/api/newride", function (req, res) {
    db.Ride.create(req.body).then(function (dbRide) {
      res.json(dbRide);
    });
  });

  /*   app.post("/api/customers", function (req, res) {
      db.Tickets.update(ticketId = body.TicketId, customerId = body.CustomerId)
      db.Customers.create(req.body)
      }).then(function (dbTicket) {
       
    }); */


  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};
