import Axios from 'axios';
import Base from './Base';

let axios = Axios.create({
  baseURL: 'http://localhost:8092/api/events',
  headers: {'content-type': 'application/json'}
});

export default class Event extends Base { 
    _idCost: number;
    name: string;
    location: string;
    start: Date;
    end: Date;
    description: string;
    capacity: number;
    
    constructor(obj: any = {}) {
      super(obj);
      this.name = obj.name || "";
      this.location = obj.location || "";
      this.start = obj.start || null;
      this.end = obj.start || null;
      this.description = obj.description || "";
      this.capacity = obj.capacity || 0;
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