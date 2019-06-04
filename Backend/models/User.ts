import Base from "./Base";
import { SpawnSyncOptionsWithStringEncoding } from "child_process";
export default class Provider extends Base {
    name: string;
    username: string;
    password: string;
    email: string;

    constructor(obj: any = {}) {
        super(obj);
        this.name = obj.name || "";
        this.username = obj.username || "";
        this.password = obj.password || "";
        this.email = obj.email || "";
    }
}