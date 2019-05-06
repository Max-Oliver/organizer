/**
 * @name Base
 * @description This is the base configuration of every controller
 *              It has the standard methods that will be overwritten on demand
 *              for each class
 */

export default abstract class Base {
    protected _id: any;
    constructor(obj : any) {
        this._id = { value: obj._id || null, type: "number", required: false };
    }

    validate() : boolean {
        Object.keys(this).map(function (key) {

            if (this[key].required && !this[key].value) {
                throw {
                    error: `Debe completar los campos obligatorios para poder continuar`,
                    status: "VALIDATE",
                    data: key
                };
            }

            if (this[key].type != typeof this[key].value && this[key].value != null) {
                throw {
                    error: "Por favor verifique los datos y vuelva a intentarlo nuevamente",
                    status: "VALIDATE",
                    data: key
                }
            }
        }, this);
        return true;
    }

    getRaw() : object {
        let raw = new Object();
        Object.keys(this).map(key => {
            raw[key] = this[key].value != undefined ? this[key].value : this[key];
        });

        return raw;
    }

    clone (obj = this) : object {
        let clone = new Object();
        Object.keys(obj).map(key => {
          if (typeof obj[key] == "object") {
            clone[key] = this.clone(obj[key]);
          } else clone[key] = obj[key]; 
        });
        return obj == this? new this(clone) : clone;
        //return JSON.parse(JSON.stringify(obj));
    }

    abstract async add(): Promise<object[]>;

    abstract async save(): Promise<object[]>;

    abstract async remove(): Promise<object[]>;

}