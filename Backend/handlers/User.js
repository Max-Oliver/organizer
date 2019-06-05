"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Logger_1 = __importDefault(require("../classes/Logger"));
var User_1 = __importDefault(require("../models/User"));
var sql = require('../app').mysqlConn;
module.exports = {
    /**
     * @name    GET_PROVIDERS
     * @desc    Returns a list of all saved users in bucket
     * @returns {Array}
     */
    get: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var api, username, password, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = "GET /api/users - ";
                        username = req.query.username;
                        password = req.query.password;
                        Logger_1.default.header(api + "Request received");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                sql.query("select * from organize.user where username=? and password=?", [username, password], function (err, users) {
                                    if (!err)
                                        resolve(users);
                                    else
                                        reject(err);
                                });
                            })];
                    case 2:
                        user = _a.sent();
                        res.status(200).send(user[0]);
                        Logger_1.default.success(api + "Users found");
                        Logger_1.default.success(api + "Returned 200");
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        res.status(400).send(error_1);
                        Logger_1.default.error(api + "Found an error : " + error_1);
                        Logger_1.default.error(api + "Returned 400");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * @name    SAVE
     * @desc    Saves a given user to the bucket
     * BODY ------------------------------------
     * @param   {string}        name         name of the user to be saved
     * @param   {object}        components   body of the user
     * @returns {Object}
     */
    add: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var api, user_1, data_1, existsEmail, existsUsername, error_2, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = "POST /api/users/ - ";
                        Logger_1.default.header(api + "Request received");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 12, , 13]);
                        user_1 = Object.assign(new User_1.default(), req.body);
                        data_1 = [user_1.name, user_1.username, user_1.email, user_1.password];
                        console.log(user_1);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 10, , 11]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                sql.query("select _id from organize.user where email=?", user_1.email, function (err, result) {
                                    if (!err)
                                        resolve(result);
                                    else
                                        reject(err);
                                });
                            })];
                    case 3:
                        existsEmail = _a.sent();
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                sql.query("select _id from organize.user where username=?", user_1.username, function (err, result) {
                                    if (!err)
                                        resolve(result);
                                    else
                                        reject(err);
                                });
                            })];
                    case 4:
                        existsUsername = _a.sent();
                        if (!(existsEmail && existsEmail.length == 0)) return [3 /*break*/, 8];
                        if (!(existsUsername && existsUsername.length == 0)) return [3 /*break*/, 6];
                        //add new user
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                sql.query("insert into organize.user(name, username, email, password) values(?,?,?,?)", data_1, function (err, result) {
                                    if (!err)
                                        resolve(result);
                                    else
                                        reject();
                                });
                            }).catch(function (err) {
                                throw err;
                            })];
                    case 5:
                        //add new user
                        _a.sent();
                        res.status(201).send(user_1);
                        Logger_1.default.success(api + "User saved");
                        Logger_1.default.success(api + "Returned 201");
                        return [3 /*break*/, 7];
                    case 6:
                        Logger_1.default.warn(api + "Email already exists");
                        Logger_1.default.warn(api + "Returned 400");
                        res.status(400).send({ message: "Este nombre de usuario ya existe" });
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        Logger_1.default.warn(api + "Email already exists");
                        Logger_1.default.warn(api + "Returned 400");
                        res.status(400).send({ message: "Este email ya esta registrado" });
                        _a.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_2 = _a.sent();
                        res.status(400).send(error_2);
                        Logger_1.default.error(api + error_2);
                        Logger_1.default.error(api + "Returned 400");
                        return [3 /*break*/, 11];
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        error_3 = _a.sent();
                        res.status(400).send(error_3);
                        Logger_1.default.error(api + error_3);
                        Logger_1.default.error(api + "Returned 400");
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    }
    // /**
    //  * @name    UPDATE
    //  * @desc    Updates a given user to the bucket
    //  * @param   {string} id string that represents a saved obj of type 'user'
    //  * BODY :
    //  * @param   {string} name         name of the user to be saved
    //  * @param   {object} components   body of the user
    //  * @returns {Object}
    //  */
    // async save(req: any, res: any) { 
    //   let api = "PUT /api/users/" + req.params.id + " - ";
    //   Logger.header(api + "Request received");
    //   try {
    //     let exists: any = await new Promise((resolve, reject) => {
    //       User.getById(req.params.id, (err: any, user: any) => {
    //         if (!err) resolve(user);
    //         else reject(err);
    //       });
    //     });
    //     exists.deleted = true;
    //     await new Promise((resolve, reject) => {
    //       exists.save((err: any, result: any) => {
    //         if (!err) resolve(result);
    //         else reject();
    //       });
    //     })
    //     let user = Object.assign(new User(), req.body)
    //     await new Promise((resolve, reject) => {
    //       user.save((err: any, result: any) => {
    //         if (!err) resolve(result);
    //         else reject();
    //       });
    //     })
    //   res.status(200).send(user);
    //   Logger.success(api + "User updated");
    //   Logger.success(api + "Returned 200");
    //   } catch (error) {
    //     res.status(400).send(error);
    //     Logger.error(api + "Found an error : " + error);
    //     Logger.error(api + "Returned 400");
    //   }    
    // },
    // /**
    //  * @name   DELETE
    //  * @desc   Deletes a given user from the bucket
    //  * @param  {string} id string that represents a saved obj of type 'user'
    //  */
    // async remove(req: any, res: any) {
    //   let api = "DELETE /api/users/" + req.params.id + " - ";
    //   Logger.header(api + "Request received");
    //   try {
    //     //getUserById
    //     let user: any = await new Promise((resolve, reject) => {
    //       User.getById(req.params.id, (err: any, user: any) => {
    //         if (!err) resolve(user);
    //         else reject(err);
    //       });
    //     });
    //     user.deleted = true;
    //     await new Promise((resolve, reject) => {
    //       user.save((err: any, result: any) => {
    //         if (!err) resolve(result);
    //         else reject();
    //       });
    //     })
    //     res.status(200).send(user);
    //     Logger.success(api + "User deleted succesfully");
    //     Logger.success(api + "Returned 200");
    //   } catch (error) {
    //     res.status(400).send(error);
    //     Logger.error(api + "Found an error : " + error);
    //     Logger.error(api + "Returned 400");
    //   }
    // }
};
