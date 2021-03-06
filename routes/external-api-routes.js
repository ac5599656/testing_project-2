const db = require("../models");
const axios = require("axios");
const keys = require("../config/keys");
const {ensureAuthenticated} = require('../config/auth');


module.exports = function (app) {
  app.get("/api/beer", function (req, res) {
    let search = "budweiser";
    const queryURL = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&q=${search}&sort=-ibu&facet=style_name&facet=cat_name&facet=name_breweries&facet=country`;

    axios.get(queryURL)
      .then((result) => {
        const { name, cat_name, city, state, country, descript, name_breweries, abv } = result.data.records[0].fields;
        console.log(`
      name: ${name}
      category: ${cat_name}
      city: ${city}
      state: ${state}
      country: ${country}
      name_breweries: ${name_breweries}
      abv: ${abv}
      descript: ${descript}
      `);
        res.json(name);
      })
      .catch((err) => {
        console.log(err);
      });
  })

  app.get("/api/location", ensureAuthenticated, function (req, res) {
    let {user} = req
    const queryURL = `http://api.ipstack.com/check?access_key=${keys.ipStackKey.ipStackKey}`;
    axios.get(queryURL)
      .then((result) => {
        res.json(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  })


  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};