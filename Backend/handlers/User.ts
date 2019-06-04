import Logger from "../classes/Logger";
import User from "../models/User";
let sql = require('../app').mysqlConn;

module.exports = {
  /**
   * @name    GET_PROVIDERS
   * @desc    Returns a list of all saved users in bucket
   * @returns {Array}
   */
  async get(req: any, res: any) {
    let api = "GET /api/users - ";
    let deleted: boolean = req.query.deleted;
    Logger.header(api + "Request received");
    try {
      let users = await new Promise((resolve, reject) => {
        sql.query("select * from organize.user where deleted=?",deleted, (err:any, users:any) => {
          if (!err) resolve(users);
          else reject(err);
        });
      });
      res.status(200).send(users);
      Logger.success(api + "Users found");
      Logger.success(api + "Returned 200");
    } catch (error) {
      res.status(400).send(error);
      Logger.error(api + "Found an error : " + error);
      Logger.error(api + "Returned 400");
    }
  },

  /**
   * @name    SAVE
   * @desc    Saves a given user to the bucket
   * BODY ------------------------------------
   * @param   {string}        name         name of the user to be saved
   * @param   {object}        components   body of the user
   * @returns {Object}
   */
  async add(req: any, res: any) {
    let api = "POST /api/users/ - ";
    Logger.header(api + "Request received");
    try {
      let user = Object.assign(new User(), req.body)
      let data = [user.name, user.username, user.email, user.password];
      console.log(user)
      try {

        let existsEmail: any = await new Promise((resolve, reject) => {
          sql.query("select _id from organize.user where email=?",user.email, (err:any, result:any) => {
            if (!err) resolve(result);
            else reject(err);
          });
        });

        let existsUsername: any = await new Promise((resolve, reject) => {
          sql.query("select _id from organize.user where username=?",user.username, (err:any, result:any) => {
            if (!err) resolve(result);
            else reject(err);
          });
        });
 
        if(existsEmail && existsEmail.length == 0) {
          if(existsUsername && existsUsername.length == 0) {  
            //add new user
            await new Promise((resolve, reject) => {
              sql.query("insert into organize.user(name, username, email, password) values(?,?,?,?)",data, (err:any, result:any) => {
                if (!err) resolve(result);
                else reject();
              });
            }).catch(err => {
              throw err;
            });
            res.status(201).send(user);
            Logger.success(api + "User saved");
            Logger.success(api + "Returned 201");
          }else{
            Logger.warn(api + "Email already exists");
            Logger.warn(api + "Returned 400");
            res.status(400).send({ message: "Este nombre de usuario ya existe" });  
          }
        }else{
          Logger.warn(api + "Email already exists");
          Logger.warn(api + "Returned 400");
          res.status(400).send({ message: "Este email ya esta registrado" });
        }
      } catch (error) {
        res.status(400).send(error);
        Logger.error(api + error);
        Logger.error(api + "Returned 400");
      }
    } catch (error) {
      res.status(400).send(error);
      Logger.error(api + error);
      Logger.error(api + "Returned 400");
    }
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
