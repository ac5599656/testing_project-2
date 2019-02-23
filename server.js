const dotenv = require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let authRouter = require("./routes/auth.js");
let db = require("./models");
let session = require("express-session");
let expressValidator = require("express-validator");
let path = require("path");
let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
let routes = require("./routes/index");
let auth = require("./routes/auth");
const app = express();
require("./config/passport");


app.set("port", process.env.PORT || 3000);

// Middleware
//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


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


// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
app.use("/", routes);
app.use("/auth", auth);
require("./routes/external-api-routes")(app);
require("./routes/person-api-routes")(app);
require("./routes/post-api-routes")(app);
require("./routes/comment-api-routes")(app);
require("./routes/html-routes")(app);


var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
// db.sequelize.sync(syncOptions).then(function() {
//   app.listen(PORT, function() {
//     console.log(
//       "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
//       PORT,
//       PORT
//     );
//   });
// });

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(app.get("port"), function() {
    console.log(
      "==> 🌎  Listening on ports. Visit http://localhost:/ in your browser."
      //PORT,
      //PORT
    );
  });
});

module.exports = app;