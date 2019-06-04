import Logger from "../classes/Logger";
let sql = require('../app').mysqlConn;

module.exports = {
  /**
   * @name    GET_PROVIDERS
   * @desc    Returns a list of all saved events in bucket
   * @returns {Array}
   */
  async get(req: any, res: any) {
    let api = "GET /api/events - ";
    let deleted: boolean = req.query.deleted;
    Logger.header(api + "Request received");
    try {
      let events = await new Promise((resolve, reject) => {
        sql.query("select * from organize.event where deleted=?",deleted, (err:any, events:any) => {
          if (!err) resolve(events);
          else reject(err);
        });
      });
      res.status(200).send(events);
      Logger.success(api + "Events found");
      Logger.success(api + "Returned 200");
    } catch (error) {
      res.status(400).send(error);
      Logger.error(api + "Found an error : " + error);
      Logger.error(api + "Returned 400");
    }
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
