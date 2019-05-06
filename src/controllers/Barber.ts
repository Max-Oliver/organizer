import axios from "axios";
import Base from "./Base";

export default class User extends Base {
  idUser: number;
  idBarberShop: number;
  position: string;

  constructor(obj: any = {}) {
    super(obj);
    this.idUser = obj.idUser || -1;
    this.idBarberShop = obj.idBarberShop || -1;
    this.position = obj.position || "";
  }

  static async get(pagination: any = {}) {
    try {
      let items = await new Promise((resolve, reject) => {
        resolve(
          [...Array(20)].map((e, index) => {
            return {
              idUser: index,
              idBarberShop: -1,
              position: ""
            };
          })
        );
      });

      return {
        docs: items,
        total: 20
      };

      // let response = await http.request({
      //     method: 'get',
      //     params: {
      //         limit: (search.limit || '10'),
      //         criteria: (search.criteria || ''),
      //         page: (search.page || '1')
      //     }
      // })
    } catch (error) {
      throw error.response;
    }
  }

  async add() {
    try {
      let response = await axios.post("/api/users", this, {
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
      return await axios.put("/api/users/" + this._id.value, this, {
        "content-type": "application/json"
      });
    } catch (error) {
      throw error.response;
    }
  }

  async remove() {
    try {
      return await axios.delete("/api/users/" + this._id.value, {
        "content-type": "application/json"
      });
    } catch (error) {
      throw error.response;
    }
  }
}
