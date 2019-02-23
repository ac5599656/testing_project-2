require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let authRouter = require("./routes/auth.js");
let db = require("./models");
let session = require("express-session");
let flash = require("connect-flash");
let expressValidator = require("express-validator");
let path = require("path");
let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
let routes = require("./routes/index");
let auth = require("./routes/auth");
const app = express();
require("./config/passport");

// Handlebars
app.set("views", path.join(__dirname, "views"));
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Middleware
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(express.static("public"));

// Routes
// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);
app.use(cookieParser());

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(authRouter);

// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      let namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

var syncOptions = {
  force: false
};

//Gobal Variables
// app.use(function(req, res, next) {
//   res.locals.user = req.user || null;
//   next(req, res);
// });

app.use("/", routes);
app.use("/auth", auth);
require("./routes/external-api-routes")(app);
require("./routes/person-api-routes")(app);
require("./routes/post-api-routes")(app);
require("./routes/comment-api-routes")(app);
require("./routes/html-routes")(app);

// var PORT = process.env.PORT || 3000;
app.set("port", process.env.PORT || 3000);

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(app.get("port"), function() {
    console.log(
      "==> 🌎  Listening on ports. Visit http://localhost:3000 in your browser."
      //PORT,
      //PORT
    );
  });
});

module.exports = app;
















// require("dotenv").config();
// var express = require("express");
// var exphbs = require("express-handlebars");
// var path = require("path");

// var db = require("./models");

// var app = express();
// var PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));

// // Handlebars
// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "main"
//   })
// );
// app.set("view engine", "handlebars");

// // Routes
// require("./routes/external-api-routes")(app);
// require("./routes/person-api-routes")(app);
// require("./routes/post-api-routes")(app);
// require("./routes/comment-api-routes")(app);
// require("./routes/html-routes")(app);


// var syncOptions = { force: false };

// // If running a test, set syncOptions.force to true
// // clearing the `testdb`
// if (process.env.NODE_ENV === "test") {
//   syncOptions.force = true;
// }

// // Starting the server, syncing our models ------------------------------------/
// // db.sequelize.sync(syncOptions).then(function() {
// //   app.listen(PORT, function() {
// //     console.log(
// //       "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
// //       PORT,
// //       PORT
// //     );
// //   });
// // });

// app.listen(PORT, function() {
//   console.log(
//     "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
//     PORT,
//     PORT
//   );
// });

// module.exports = app;
