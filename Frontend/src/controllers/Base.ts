/**
 * @name Base
 * @description This is the base configuration of every controller
 *              It has the standard methods that will be overwritten on demand
 *              for each class
 */

export default abstract class Base {
    protected _id: any;
    protected deleted: any;

    constructor(obj : any) {
        this._id =  obj._id || null;
        this.deleted =  obj.deleted || false; 
    }
}