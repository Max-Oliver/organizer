import Axios from 'axios';
import Base from './Base';

let axios = Axios.create({
  baseURL: 'http://localhost:8092/api/users',
  headers: {'content-type': 'application/json'}
});

export default class Provider extends Base { 
    name: string;
    username: string;
    password: string;
    email: string;
    phone: string;

    constructor(obj: any = {}) {
      super(obj);
      this.name = obj.name || "";
      this.username = obj.username || "";
      this.password = obj.password || "";
      this.email = obj.email || "";
      this.phone = obj.phone || "";
    }

    static async get(pagination: any = {}, deleted: boolean) {
      try {
        let response: any = await axios.get('?deleted='+ deleted);
        return {
          docs: response.data,
          total: response.data.length
        }
      } catch (error) {
        throw error.response;
      }
    }
  
    async add() {
      try {
        let response = await axios.post('',this);
        this._id = response.data._id;
        return response;
      } catch (error) {
        throw error.response;
      }
    }
  
    async save() {
      try {
        let response = await axios.put('/' + this._id, this);
        this._id = response.data._id;
        return response;
      } catch (error) {
        throw error.response;
      }
    }
  
    async remove() {
      try {
        let response = await axios.delete('/' + this._id);
        return response;
      } catch (error) {
        throw error.response;
      }
    }
  }