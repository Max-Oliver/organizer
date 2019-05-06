import axios from "axios";
import Base from "./Base";

export default class User extends Base {
  type: number;
  name: string;
  phone: string;
  password: string;
  email: string;
  picture: string;
  active: boolean;

  constructor(obj: any = {}) {
    super(obj);
    this.type = obj.type || -1;
    this.name = obj.name || "";
    this.phone = obj.phone || "";
    this.password = obj.password || "";
    this.email = obj.email || "";
    this.picture = obj.picture || "";
    this.active = obj.active || true;
  }

  static async get(pagination: any = {}) {
    try {
      let items = await new Promise((resolve, reject) => {
        resolve(
          [...Array(20)].map((e, index) => {
            return {
              _id: index,
              type: 1, //1 user 2 barber
              name: `NameExample${index}`,
              password: `password${index}`,
              email: "example@gmail.com",
              phone: `222000${index}`,
              picture: "default.png",
              active: true
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
