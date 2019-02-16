const db = require("../models");

module.exports = (app) => {
    app.get("/api/posts", (req, res) => {
        const query = {};
        if (req.query.person_id) {
            query.Person_id = req.query.person_id
        }

        db.Post.findAll({
            where: query,
            include: db.Person
        }).then((dbPost) => {
            res.json(dbPost)
        });
    });

    app.get("/api/posts/:id", (req, res) => {
        db.Post.findOne({
            where: {
                id: req.params.id
            },
            include: db.Person
        }).then((dbPost) => {
            res.json(dbPost)
        });
    });

    app.post("/api/posts", (req, res) => {
        db.Post.create(req.body).then((dbPost) => {
            res.json(dbPost)
        });
    });

    app.delete("/api/posts/:id", (req, res) => {
        db.Post.destroy( {
            where: {
                id: req.params.id
            }
        }).then((dbPost) => {
            res.json(dbPost)
        });
    });

    app.put("/api/posts", (req, res) => {
        db.Post.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then((dbPost) => {
            res.json(dbPost);
        })
    });
};