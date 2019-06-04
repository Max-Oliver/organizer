import Logger from "./classes/Logger";
import BodyParser from "body-parser";
import Express from "express";

let cors = require("cors");
let mysql = require('mysql');
let server: any = null;
let app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());

// connection configurations
let mysqlConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'organize'
});

async function init() {
  try {
    connect();
  } catch (ex) {
    Logger.fatal("Could not authenticate to Cluster uContactX");
    Logger.error(ex);
  }
}

async function connect() {
  try {
    mysqlConn.connect();
    // Starting app
    server = app.listen(8092, () => {
      connectionSuccesfull();
    });
  } catch (error) {
    Logger.fatal(error);
    Logger.warn("Retrying in 3 seconds...");
    setTimeout(async () => {
      await connect();
    }, 3000);
  }
}

function connectionSuccesfull() {
  Logger.success("╔══════════════════════════════════════════════════════╗");
  Logger.success("║                                                      ║");
  Logger.success("║               UCONTACTX WS has started               ║");
  Logger.success("║      Connected to main cluster in uContactX Server   ║");
  Logger.success("║      Connection to bucket `Data` was successful      ║");
  Logger.success("║       Server started and listening on port 8092      ║");
  Logger.success("║                                                      ║");
  Logger.success("╚══════════════════════════════════════════════════════╝");
}

/**
 * @description 
init() verifies and defines the variables that other classes will use
the order of execution is important for it to work properly
 */
//...........................
init();

try {
  let routes = require("./routes")(app);
} catch (error) {
  Logger.success(error + "xd");
}
//...........................

export { mysqlConn }