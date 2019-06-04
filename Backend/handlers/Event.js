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
var sql = require('../app').mysqlConn;
module.exports = {
    /**
     * @name    GET_PROVIDERS
     * @desc    Returns a list of all saved events in bucket
     * @returns {Array}
     */
    get: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var api, deleted, events, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = "GET /api/events - ";
                        deleted = req.query.deleted;
                        Logger_1.default.header(api + "Request received");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                sql.query("select * from organize.event where deleted=?", deleted, function (err, events) {
                                    if (!err)
                                        resolve(events);
                                    else
                                        reject(err);
                                });
                            })];
                    case 2:
                        events = _a.sent();
                        res.status(200).send(events);
                        Logger_1.default.success(api + "Events found");
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
    }
    // /**
    //  * @name    SAVE
    //  * @desc    Saves a given event to the bucket
    //  * BODY ------------------------------------
    //  * @param   {string}        name         name of the event to be saved
    //  * @param   {object}        components   body of the event
    //  * @returns {Object}
    //  */
    // async add(req: any, res: any) {
    //   let api = "POST /api/events/ - ";
    //   Logger.header(api + "Request received");
    //   try {
    //     let event = Object.assign(new Event(), req.body)
    //     try {
    //       //saveEvent
    //       await new Promise((resolve, reject) => {
    //         event.save((err: any, result: any) => {
    //           if (!err) resolve(result);
    //           else reject();
    //         });
    //       }).catch(err => {
    //         throw err;
    //       });
    //       res.status(201).send(event);
    //       Logger.success(api + "Event saved");
    //       Logger.success(api + "Returned 201");
    //     } catch (error) {
    //       res.status(400).send(error);
    //       Logger.error(api + error);
    //       Logger.error(api + "Returned 400");
    //     }
    //   } catch (error) {
    //     res.status(400).send(error);
    //     Logger.error(api + error);
    //     Logger.error(api + "Returned 400");
    //   }
    // },
    // /**
    //  * @name    UPDATE
    //  * @desc    Updates a given event to the bucket
    //  * @param   {string} id string that represents a saved obj of type 'event'
    //  * BODY :
    //  * @param   {string} name         name of the event to be saved
    //  * @param   {object} components   body of the event
    //  * @returns {Object}
    //  */
    // async save(req: any, res: any) { 
    //   let api = "PUT /api/events/" + req.params.id + " - ";
    //   Logger.header(api + "Request received");
    //   try {
    //     let exists: any = await new Promise((resolve, reject) => {
    //       Event.getById(req.params.id, (err: any, event: any) => {
    //         if (!err) resolve(event);
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
    //     let event = Object.assign(new Event(), req.body)
    //     await new Promise((resolve, reject) => {
    //       event.save((err: any, result: any) => {
    //         if (!err) resolve(result);
    //         else reject();
    //       });
    //     })
    //   res.status(200).send(event);
    //   Logger.success(api + "Event updated");
    //   Logger.success(api + "Returned 200");
    //   } catch (error) {
    //     res.status(400).send(error);
    //     Logger.error(api + "Found an error : " + error);
    //     Logger.error(api + "Returned 400");
    //   }    
    // },
    // /**
    //  * @name   DELETE
    //  * @desc   Deletes a given event from the bucket
    //  * @param  {string} id string that represents a saved obj of type 'event'
    //  */
    // async remove(req: any, res: any) {
    //   let api = "DELETE /api/events/" + req.params.id + " - ";
    //   Logger.header(api + "Request received");
    //   try {
    //     //getEventById
    //     let event: any = await new Promise((resolve, reject) => {
    //       Event.getById(req.params.id, (err: any, event: any) => {
    //         if (!err) resolve(event);
    //         else reject(err);
    //       });
    //     });
    //     event.deleted = true;
    //     await new Promise((resolve, reject) => {
    //       event.save((err: any, result: any) => {
    //         if (!err) resolve(result);
    //         else reject();
    //       });
    //     })
    //     res.status(200).send(event);
    //     Logger.success(api + "Event deleted succesfully");
    //     Logger.success(api + "Returned 200");
    //   } catch (error) {
    //     res.status(400).send(error);
    //     Logger.error(api + "Found an error : " + error);
    //     Logger.error(api + "Returned 400");
    //   }
    // }
};
