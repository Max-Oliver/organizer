'use strict';
const Handlers = require("./handlers");
// const Schema = require("./schemas");
// const validator = require("express-joi-validation")({});

module.exports = function(app: any) {
  // USER APIS
  app.get("/api/users", (req: any, res: any) => Handlers.User.get(req, res));
  app.post("/api/users",(req: any, res: any) => Handlers.User.add(req, res));
  app.put("/api/users/:id",(req: any, res: any) => Handlers.User.save(req, res));
  app.delete("/api/users/:id", (req:any, res:any) => Handlers.User.remove(req, res));
}