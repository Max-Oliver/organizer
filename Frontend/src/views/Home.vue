<template>
  <transition name="slide-fade">
    <div id="home">
      <v-img height="100%"  :aspect-ratio="16/9" src="https://scontent.fmvd2-1.fna.fbcdn.net/v/t31.0-8/10750057_856583311051002_8308652797268016961_o.jpg?_nc_cat=102&_nc_ht=scontent.fmvd2-1.fna&oh=06dded820562cbb61b45495606a3221b&oe=5D5ACDCC">
        <v-layout row wrap style="padding-top:450px" class="text-xs-center">
          <v-flex xs12 xl12 sm12>
            <span class="wellcome">Bienvenido a Oganize!</span>
            <v-divider></v-divider>
            <span style="color:white">Crea tus propios useros y mantente al tanto de los que tus amigos organizan en Organize!</span>
          </v-flex>
  
          <v-layout row wrap>
            <v-flex xs6 xl6 sm6 class="text-xs-right">
              <v-btn class="button-access" small @click="dialogs.login = true">
                Acceder
              </v-btn>
            </v-flex>
            <v-flex xs6 xl6 sm6 class="text-xs-left">
              <v-btn class="button-access" small @click="dialogs.register = true">
                Registrarse
              </v-btn>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-img>
     
      <!--login dialog :alert="alert"-->
      <add-dialog v-model="dialogs.login" :steps="stepsLogin" @add="login">
      </add-dialog>

      <!--register dialog-->
      <add-dialog :alert="alert" v-model="dialogs.register" :steps="stepsRegistration" @add="register">
      </add-dialog>
    </div>
  
  </transition>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import XComponent from "@/components/XComponent.ts";
import User from "@/controllers/User.ts";
import AddDialog from "@/components/dialogs/add.vue";

@Component({
  components: {
    AddDialog
  }
})
export default class Home extends XComponent {
  private user: User = new User();
  private users: any[] = [];
  private selectedUsers: any[] = [];
  private alert: any = {show: false, message: ""};

  private thresholds: string[] = ["limite1", "limite2"];
  private transports: string[] = ["udp", "tcp", "tls"];
  private ports: string[] = ["5060", "4569"];
  private snackbar: any = { state: false, timeout: 0 };

  private pagination: any = {
    page: 1,
    total: 0,
    limit: 8,
    descending: true,
    sortBy: "code"
  };

  private rules: any = {
    required: [(v: any) => !!v || this.translate("VALIDATIONS.required")],
    email: [
      (v: any) => !!v || this.translate("VALIDATIONS.required"),
      (v: any) => /.+@.+/.test(v) || this.translate("VALIDATIONS.email")
    ],
    password: [
      (v: any) => !!v || this.translate("VALIDATIONS.required"),
      (v: any) => (v || "").length > 8 || this.translate("VALIDATIONS.password")
    ],
    phone: []
  };

  private stepsLogin: any = [
    {
      title: "Acceder",
      Addbutton: {text:"Acceder"},
      fields: [
      {
          type: "input",
          name: "username",
          label: "nombre de usuario",
          hint: "USER.hintUsername",
          icon: "person",
          rules: this.rules.required,
          required: true
        },
        {
          type: "input",
          name: "password",
          label: "contrase;a",
          hint: "USER.hintPassword",
          icon: "person",
          rules: this.rules.required,
          required: true
        }
      ]
    }
  ];

  private stepsRegistration: any = [
    {
      title: "Registrarse",
      Addbutton: {text:"Registrarse"},
      fields: [
        {
          type: "input",
          name: "name",
          label: "nombre",
          hint: "USER.hintName",
          icon: "person",
          rules: this.rules.required,
          required: true
        },
        {
          type: "input",
          name: "email",
          label: "email",
          hint: "USER.hintemail",
          icon: "person",
          rules: this.rules.required,
          required: true
        },
        {
          type: "input",
          name: "username",
          label: "nombre de usuario",
          hint: "USER.hintUsername",
          icon: "person",
          rules: this.rules.required,
          required: true
        },
        {
          type: "input",
          name: "password",
          label: "contrase;a",
          hint: "USER.hintPassword",
          icon: "person",
          rules: this.rules.required,
          required: true
        }
      ]
    }
  ];

  created() {
    this.init();
  }

  init() {
    // this.get(this.pagination);
  }

  /**
   * @name GET
   * @description gets items with filters of pagination
   */
  async get(pagination: any = this.pagination) {
    console.log("re-obtaining campaigns");
    try {
      this.loading.table = true;
      let users = await User.get(pagination);
      this.pagination.total = users.total;
      this.selectedUsers = [];
      this.users = users.docs;
    } catch (ex) {
      console.log(ex);
    } finally {
      this.loading.table = false;
    }
  }

  /**
   * @name ADD
   * @description add item
   */
  async register(user: any) {
    try {
      this.user = Object.assign(this.user, user);
      await this.user.add();
      this.users.push(user);
      this.dialogs.register = false;
    } catch (error) {
      this.alert = { show: true, message: error.data.message };
      //this.user = Object.assign(this.user, user);
    }
  }

  /**
   * @name ADD
   * @description add item
   */
   async login(user: any) {
    try {
      this.user = Object.assign(this.user, user);
      let getUser = await this.user.getUser();
      this.user = Object.assign(this.user, getUser);

      //console.log(getUser)
      // this.users.push(user);
      this.$store.commit("setUserInfo", this.user.username); //JSON.stringify(this.user)
      // console.log("test")
      // console.log(this.$store.state.userInfo)
      this.$router.push("/MyEvents");
      this.dialogs.login = false;
    } catch (error) {
      this.alert = { show: true, message: error.data.message };
      //this.user = Object.assign(this.user, user);
    }
  }

  /**
   * @name SAVE
   * @description save changes in the selected item from the table
   */
  async save(user: any) {
    console.log("save-campaign");
    try {
      await this.user.save();
      this.dialogs.save = false;
      this.updateInTable();
    } catch (error) {
      console.log(error);
      if (error.status == "VALIDATE") {
        this.errors.wizard = true;
      }
    }
  }

  /**
   * @name REMOVE
   * @description remove selected items
   */
  async remove() {
    try {
      await Promise.all(
        this.selectedUsers.map(async user => {
          let aux = new User(user);
          await aux.delete();
          this.removeFromTable(aux._id.value);
        })
      );
      this.dialogs.delete = false;
      //this.notify.success(this.translate('CAMPAIGNS.deleted'),this.translate('CAMPAIGNS.delete'));
    } catch (error) {
      if (error.status == 401) {
        let result = await this.auth.reconnect();
        if (result) {
          this.get(this.pagination);
        } else {
          this.auth.logoff();
        }
      } else {
        //this.notify.handler(error)
      }
    }
  }

  /**
   * @name SHOW_NEW
   * @description shows the add dialog
   */
  showNew() {
    this.user = new User();
    this.dialogs.add = true;
  }

  /**
   * @name OPEN
   * @description shows the update dialog when is selected a item from the table
   */
  open(user: any) {
    this.user = new User(user);
    this.dialogs.save = true;
  }

  /**
   * @name REMOVE_FROM_TABLE
   * @description remove item from the table
   */
  removeFromTable(id: number) {
    let index = -1;
    let selectedIndex = -1;
    this.users.map(elem => {
      if (elem._id == id) {
        index = this.users.indexOf(elem);
      }
    });

    this.selectedUsers.map(elem => {
      if (elem._id == id) {
        selectedIndex = this.selectedUsers.indexOf(elem);
      }
    });
    this.users.splice(index, 1);
    this.selectedUsers.splice(selectedIndex, 1);
  }

  /**
   * @name UPDATE_SELECTED
   * @description shows the delete snackbar where is selected a item from the table
   */
  updateSelected(selected: any[]) {
    this.selectedUsers = selected;
    if (selected.length > 0) {
      this.snackbar.state = true;
    } else {
      this.snackbar.state = false;
    }
  }

  /**
   * @name UPDATE_IN_TABLE
   * @description update items in the table
   */
  updateInTable() {
    this.users.map(user => {
      if (user._id == this.user._id.value) {
        Object.assign(user, this.user.getRaw());
      }
    });
  }
}
</script>

<style lang="scss">
  #home {
    position:absolute;
    top:40px;
    width: 100%!important;
    height:calc(100% - 60px)!important;
    background-color: rgb(0, 0, 0);
  }

  .button-access {
    opacity: 0.9;
  }

  .login-box {
    position: absolute;
    width: 600px;
    height: 800px;
    background-color: #00000059;
    border-radius: 20px;
  }

  .wellcome {
    font-size:x-large;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-style: italic;
    color:rgba(255, 255, 255, 0.904)
  }
</style>