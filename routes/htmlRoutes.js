var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render('index', {name:'Some person with a reallyl reallly long name', age:25, location:'Washington D.C.'});
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
  });

  // Load example page and pass in an example by id
  app.get("/signup.handlebars", function(req, res) {
      res.render("signup");
    // db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
    //   res.render("example", {
    //     example: dbExample
    //   });
    // });
  });

  app.get("/login.handlebars", function(req, res) {
    res.render("login");
  // db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //   res.render("example", {
  //     example: dbExample
  //   });
  // });
});

app.get("/users", function(req, res) {
  res.render("users");
// db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
//   res.render("example", {
//     example: dbExample
//   });
// });
});

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
