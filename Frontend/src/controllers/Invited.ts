import Axios from 'axios';
import Base from './Base';

let axios = Axios.create({
  baseURL: 'http://localhost:8092/api/guests',
  headers: {'content-type': 'application/json'}
});

export default class Invited extends Base { 
    _idUser: number;
    _idEvent: number;
    _idPermission: number;

    constructor(obj: any = {}) {
      super(obj);
      this._idUser = obj._idUser || null;
      this._idEvent = obj._idEvent || null;
      this._idPermission = obj._idPermission || null;
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

    static async getUser(username: string, password: string) {
      // try {
      //   let response: any = await axios.get('?username='+ username+'?password='+password);
      //   return {
      //     docs: response.data,
      //     total: response.data.length
      //   }
      // } catch (error) {
      //   console.log('error en controller')
      //   throw error.response;
      // }
    }
  
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