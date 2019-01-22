var express = require("express");
// Import the model to use its db functions for burger.js
var burgers = require("../models/burgers.js");

var router = express.Router();
// routes get started here
router.get("/", function (req, res) {
    burgers.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject); // insert the index handlebars code into main view
    });
});
// Add new burger to the db.
router.post("/api/burgers", function (req, res) {
    burgers.insert(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result) {
        // Send back the ID of the new burger
        res.json({ id: result.insertId });
    });
});
// Set burger devoured status to true.
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    burgers.update({ devoured: req.body.devoured }, condition, function(result) {
        if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404.
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
// Delete burger from db.
router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    burgers.delete(condition, function(result) {
        if (result.changedRows === 0) {
            // doesn't exist then return the 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;
