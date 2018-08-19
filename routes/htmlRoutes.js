var db = require("../models");
var path = require("path");

module.exports = function(app) {

  //handlebar rendered routes
  // Load index page
/*   app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  }); */

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Regular html rendered routes

  // index route loads login.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // rides route loads cms.html
  app.get("/rides", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/rides.html"));
  });

  app.get("/ridesticket", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/ridesticket.html"));
  });




  //Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};




