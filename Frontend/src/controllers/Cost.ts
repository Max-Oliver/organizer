// import store from './../../store';
import axios from "axios";
import Base from "./Base";

export default class Provider extends Base {
  _idOption: number;
  _idStatement: number;
  _idUser: number;
  division: number;

  constructor(obj: any = {}) {
    super(obj);
    this._idOption = obj._idOption || null;
    this._idStatement = obj._idStatement || null;
    this._idUser = obj._idUser || null;
    this.division = obj.division || null;
  }

  static async get(pagination: any = {}) {
    try {
      let items = await new Promise((resolve, reject) => {
        resolve(
          [...Array(20)].map((e, index) => {
            return {
              _id: index,
              name: `Mi evento ${index}`,
              location: 'Av Italia 2332',
              date: '12-03-2020',
              end: '12-03-2020',
              description: '',
              capacity: '',
              _idCost: -1
            };
          })
        );
      });

      return {
        docs: items,
        total: 20
      };

    } catch (error) {
      throw error.response;
    }
  }

  async add() {
    try {
      let response = await axios.post("/api/campaigns", this, {
        "content-type": "application/json"
      });
      this._id = response._id;
      return response;
    } catch (error) {
      throw error.response;
    }
  }

  async save() {
    try {
      return await axios.put("/api/campaigns/" + this._id, this, {
        "content-type": "application/json"
      });
    } catch (error) {
      throw error.response;
    }
  }

  async remove() {
    try {
      return await axios.delete("/api/campaigns/" + this._id, {
        "content-type": "application/json"
      });
    } catch (error) {
      throw error.response;
    }
  }
}
