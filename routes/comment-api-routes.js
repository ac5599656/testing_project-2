const db = require("../models");
const {ensureAuthenticated} = require('../config/auth');


module.exports = (app) => {
    app.get("/api/comments", (req, res) => {
        const query = {};
        if (req.query.user_id) {
            query.User_id = req.query.user_id
        }

        db.Comment.findAll({
            where: query,
            include: [db.User, db.Post]
        }).then((dbComment) => {
            res.json(dbComment)
        });
    });

    app.get("/api/comments/:id", (req, res) => {
        db.Comment.findOne({
            where: {
                id: req.params.id
            },
            include: [db.User, db.Post]
        }).then((dbComment) => {
            res.json(dbComment)
        });
    });

    app.post("/api/comments", ensureAuthenticated, (req, res) => {
        let data = {
            ...req.body,
            UserId: req.user.id,
        
        }
        db.Comment.create(data).then((dbComment) => {
            res.json(dbComment)
        });
    });

    app.delete("/api/comments/:id", (req, res) => {
        db.Comment.destroy( {
            where: {
                id: req.params.id
            }
        }).then((dbComment) => {
            res.json(dbComment)
        });
    });

    app.put("/api/comments", (req, res) => {
        db.Comment.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then((dbComment) => {
            res.json(dbComment);
        })
    });
};