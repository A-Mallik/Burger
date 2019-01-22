// Import orm.js into burger.js
var orm = require("../config/orm.js");
// The code that will call the ORM functions using burger specific input for the ORM.
var burgers = {
    // Display all burgers;
    all: function(cb) {
        orm.all("burgers", function(res) {
            cb(res);
        });
    },
    // Insert new burger;
    insert: function(cols, vals, cb) {
        orm.insert("burgers", cols, vals, function(res) {
            cb(res);
        });
    },
    // Update devoured based on boolean value
    update: function(objColVals, condition, cb) {
        orm.update("burgers", objColVals, condition, function(res) {
            cb(res);
        });
    },
    // Delete burger. Also gets deleted from database.
    delete: function(condition, cb) {
        orm.delete("burgers", condition, function(res) {
            cb(res);
        });
    }
};

// export
module.exports = burgers;
