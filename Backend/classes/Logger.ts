import chalk from "chalk";

export default class Notification {
  /**
   * @description Prints highlighted message in console
   * @param text
   */
  public static header(text: string) {
    console.log(this.getDate() + "INFO: " + chalk.white.bgGreen(text));
  }

  /**
   * @description Prints normal message in console
   * @param text
   */
  public static info(text: string) {
    console.log(this.getDate() + "INFO: " + chalk.cyan(text));
  }

  /**
   * @description Prints success message in console
   * @param text
   */
  public static success(text: string) {
    console.log(this.getDate() + "INFO: " + chalk.green(text));
  }

  /**
   * @description Prints warning message in console
   * @param text String
   */
  public static warn(text: string) {
    console.log(this.getDate() + "WARNING: " + chalk.yellow(text));
  }

  /**
   * @description Prints error message in console
   * @param text  String
   */
  public static error(text: string) {
    console.log(this.getDate() + "SEVERE: " + chalk.red(text));
  }

  /**
   * @description Prints fatal error in console
   * @param text String
   */
  public static fatal(text: string) {
    console.log(this.getDate() + "SEVERE: " + chalk.white.bgRed(text));
  }
  protected static getDate() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return (
      "[ " +
      date.toISOString().substring(0, 10) +
      hours +
      ":" +
      minutes +
      ":" +
      seconds +
      " ] "
    );
  }
}
