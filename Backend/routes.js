'use strict';
var Handlers = require("./handlers");
// const Schema = require("./schemas");
// const validator = require("express-joi-validation")({});
module.exports = function (app) {
    // USER APIS
    app.get("/api/users", function (req, res) { return Handlers.User.get(req, res); });
    app.post("/api/users", function (req, res) { return Handlers.User.add(req, res); });
    app.put("/api/users/:id", function (req, res) { return Handlers.User.save(req, res); });
    app.delete("/api/users/:id", function (req, res) { return Handlers.User.remove(req, res); });
};
