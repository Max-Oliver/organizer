import Axios from 'axios';
import Base from './Base';

let axios = Axios.create({
  baseURL: 'http://localhost:8092/api/users',
  headers: {'content-type': 'application/json'}
});

export default class User extends Base { 
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

    static async get(pagination: any = {}, deleted: boolean) {
      try {
        let response: any = await axios.get('?deleted='+ deleted);
        return {
          docs: response.data,
          total: response.data.length
        }
      } catch (error) {
        console.log('error en controller')
        throw error.response;
      }
    }

    async getUser() {
      try {
        let response: any = await axios.get('', { params: this });
        return response.data;
      } catch (error) {
        console.log('error en controller')
        throw error.response;
      }
    }
    // return {
    //   docs: response.data,
    //   total: response.data.length
    // }
    async add() {
      try {
        console.log(this)
        let response = await axios.post('',this);
        // this._id = response.data._id;
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