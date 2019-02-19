const db = require("../models");

module.exports = (app) => {
    app.get("/api/people", (req, res) => {
        db.Person.findAll({
            include: db.Person
        }).then((dbPerson) => {
            res.json(dbPerson)
        });
    });

    app.get("/api/posts/:id", (req, res) => {
        db.Person.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Post]
        }).then((dbPerson) => {
            res.json(dbPerson)
        });
    });

    app.post("/api/posts", (req, res) => {
        db.Person.create(req.body).then((dbPerson) => {
            res.json(dbPerson)
        });
    });

    app.delete("/api/posts/:id", (req, res) => {
        db.Person.destroy( {
            where: {
                id: req.params.id
            }
        }).then((dbPerson) => {
            res.json(dbPerson)
        });
    });
    
};