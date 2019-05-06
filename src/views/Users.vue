<template>
  <transition name="slide-fade">
    <div id="users-web" class="page-content">
      <v-layout row wrap>
        <v-flex xs12 sm12 md12 xl12 class="pt-2 pl-2 pr-4">
          <x-table
            :conf="tableConf"
            :items="users"
            itemIcon="person"
            @value="updateSelected"
            v-model="selectedUsers"
            @open="open"
            @new="dialogs.add = true"
          ></x-table>

          <v-dialog v-model="dialogs.save" width="1000px" scrollable>
            <v-card class="ucontact-dialogs">
              <v-card-text style="padding:0">
                <v-form v-model="valid" ref="save">
                  <v-layout row wrap>
                    <!--STEP 1-->
                    <v-flex xs4 sm4 lg4 class="px-2">
                      <v-layout row wrap class="px-5">
                        <!--HEADER-->
                        <v-flex xs12 sm12 lg12 class="pt-3 pb-5">
                          <v-subheader>
                            <span class="grey--text">Basicos</span>
                          </v-subheader>
                        </v-flex>
                        <!--ITEMS-->
                        <v-flex xs12 sm12 sl12 class="pb-3" style="padding-top: 60px;">
                          <v-text-field
                            v-model="user.name.value"
                            :rules="rules.noText"
                            :error="!user.name.value && errors.wizard"
                            prepend-icon="person"
                            label="Nombre"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm12 lg12 class="pb-3">
                          <v-select
                            v-model="user.context.value"
                            :rules="rules.noText"
                            :error="!user.context.value && errors.wizard"
                            :items="contexts"
                            item-text="name"
                            item-value="name"
                            prepend-icon="person"
                            label="Contexto"
                          ></v-select>
                        </v-flex>

                        <v-flex xs12 sm12 sl12 class="pb-3">
                          <v-text-field
                            v-model="user.email.value"
                            prepend-icon="person"
                            label="Email"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm12 sl12 class="pb-5">
                          <v-text-field
                            v-model="user.phone.value"
                            :rules="rules.noText"
                            :error="!user.phone.value && errors.wizard"
                            prepend-icon="person"
                            label="Numero de Telefono"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <!--STEP 2-->
                    <v-flex xs4 sm4 lg4 class="px-2" style="border-left: 1px solid #cecece4f;">
                      <v-layout row wrap class="px-5">
                        <!--HEADER-->
                        <v-flex xs12 sm12 lg12 class="pt-3 pb-5">
                          <v-subheader>
                            <span class="grey--text">Seguridad</span>
                          </v-subheader>
                        </v-flex>
                        <!--ITEMS-->
                        <v-flex xs12 sm12 sl12 class="pb-3" style="padding-top: 100px;">
                          <v-text-field
                            v-model="user.username.value"
                            :rules="rules.noText"
                            :error="!user.username.value && errors.wizard"
                            prepend-icon="person"
                            label="Nombre de usuario"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm12 sl12 class="pb-3">
                          <v-text-field
                            v-model="user.password.value"
                            :rules="rules.noText"
                            :error="!user.password.value && errors.wizard"
                            type="password"
                            label="Contraseña"
                            prepend-icon="security"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm12 sl12 class="pb-3">
                          <v-text-field
                            v-model="user.security.value"
                            prepend-icon="person"
                            label="Seguridad"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <!--STEP 3-->
                    <v-flex xs4 sm4 lg4 class="px-2 pb-5" style="border-left: 1px solid #cecece4f;">
                      <v-layout row wrap class="px-5">
                        <!--HEADER-->
                        <v-flex xs12 sm12 lg12 class="pt-3 pb-5">
                          <v-subheader>
                            <span class="grey--text">{{ $i18n.t('USERS.basics') }}</span>
                          </v-subheader>
                        </v-flex>
                        <!--ITEMS-->
                        <v-flex xs12 sm12 sl12 class="pb-3" style="padding-top: 60px;">
                          <v-text-field
                            v-model="user.name.value"
                            :rules="rules.inputText"
                            prepend-icon="person"
                            :label="$i18n.t('USERS.name')"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm12 lg12 class="pb-3">
                          <v-select
                            v-model="user.context.value"
                            :rules="rules.inputText"
                            :items="contexts"
                            item-text="name"
                            item-value="name"
                            prepend-icon="person"
                            :label="$i18n.t('USERS.context')"
                          ></v-select>
                        </v-flex>

                        <v-flex xs12 sm12 sl12 class="pb-3">
                          <v-text-field
                            v-model="user.email.value"
                            prepend-icon="person"
                            :label="$i18n.t('USERS.email')"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm12 sl12 class="pb-5">
                          <v-text-field
                            v-model="user.phone.value"
                            :rules="rules.inputText"
                            prepend-icon="person"
                            :label="$i18n.t('USERS.phone')"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <!--STEP 2-->
                    <v-flex xs4 sm4 lg4 class="px-2" style="border-left: 1px solid #cecece4f;">
                      <v-layout row wrap class="px-5">
                        <!--HEADER-->
                        <v-flex xs12 sm12 lg12 class="pt-3 pb-5">
                          <v-subheader>
                            <span class="grey--text">{{ $i18n.t('USERS.security') }}</span>
                          </v-subheader>
                        </v-flex>
                        <!--ITEMS-->
                        <v-flex xs12 sm12 sl12 class="pb-3" style="padding-top: 100px;">
                          <v-text-field
                            v-model="user.username.value"
                            :rules="rules.inputText"
                            prepend-icon="person"
                            :label="$i18n.t('USERS.userName')"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm12 sl12 class="pb-3">
                          <v-text-field
                            v-model="user.password.value"
                            :rules="rules.inputText"
                            type="password"
                            :label="$i18n.t('USERS.password')"
                            prepend-icon="security"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm12 sl12 class="pb-3">
                          <v-text-field
                            v-model="user.security.value"
                            prepend-icon="person"
                            :label="$i18n.t('USERS.security')"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-flex>

                    <!--FOOTER-->
                    <v-flex xs12 sm12 md12 lg12 class="ucontact-dialogs__footer">
                      <v-btn flat @click.native="dialogs.save = false">Cerrar</v-btn>
                      <v-btn dark color="ucontact-theme__background" @click.native="save">Guardar</v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>

      <div class="x-dialogs" :class="{ 'show' : dialogs.add }">
        <v-btn icon flat class="x-dialogs__close">
          <v-icon>close</v-icon>
        </v-btn>

        <v-stepper v-model="wizard" class="x-stepper">
          <v-stepper-header>
            <v-stepper-step
              color="ucontact-theme__background"
              :complete="wizard > 1"
              step="1"
            >Tipo de Usuario</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
              color="ucontact-theme__background"
              :complete="wizard > 2"
              step="2"
            >Tuvieja esta en tanga</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-layout row wrap>
                <v-flex xs12 md12>
                  <div class="x-dialogs__step__desc">What type of user do you wish to create?</div>
                </v-flex>
                <v-flex xs12 sm12 md6 class="pt-3">
                  <div
                    class="x-dialogs__step__item"
                    :class="{'active' : user.type.value == 'Administrator'}"
                    @click="user.type.value = 'Administrator'"
                    style="margin-left:auto"
                  >
                    <div class="x-dialogs__step__item__pic">
                      <img width="200px" src="">
                    </div>
                    <div class="x-dialogs__step__item__title">Administrador</div>
                    <div
                      class="x-dialogs__step__item__desc"
                    >An administrative account is the one who do shit no one else does, ex? got no idea what to put here brouuhh</div>
                  </div>
                </v-flex>

                <v-flex xs12 sm12 md6 class="pt-3">
                  <div class="x-dialogs__step__item" style="margin-right: auto;">
                    <div class="x-dialogs__step__item__pic">
                      <img width="200px" src="">
                    </div>
                    <div class="x-dialogs__step__item__title">Agente</div>
                    <div
                      class="x-dialogs__step__item__desc"
                    >This is normally known as monkey user, this is not a smart user, this is a user, you dont wanna encounter in your daily life</div>
                  </div>
                </v-flex>
              </v-layout>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-layout row wrap>
                <v-flex xs12 sm12 lg8 offset-lg2 class="px-5">
                  <div class="x-dialogs__step__query">What's the users name?</div>
                  <div class="x-dialogs__step__field">
                    <input class="x-fields" placeholder="Just his name will do">
                  </div>
                </v-flex>

                <v-flex xs12 sm12 lg8 offset-lg2 class="px-5">
                  <div class="x-dialogs__step__query">What context will he be in?</div>
                  <div class="x-dialogs__step__field">
                    <input class="x-fields" placeholder="How will calls behave for this user?">
                  </div>
                </v-flex>

                <v-flex xs12 sm12 lg8 offset-lg2 class="px-5">
                  <div class="x-dialogs__step__query">What context will he be in?</div>
                  <div class="x-dialogs__step__field">
                    <input class="x-fields" placeholder="How will calls behave for this user?">
                  </div>
                </v-flex>
              </v-layout>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>

        <div class="x-dialogs__footer">
          <v-btn
            outline
            color="ucontact-theme__color"
            class="x-dialogs__footer__goBack x-theme__buttons"
          >Atras</v-btn>
          <v-btn flat class="x-dialogs__footer__goBack" @click.native="dialogs.add = false">Cancelar</v-btn>
          <v-btn
            dark
            color="ucontact-theme__background"
            class="x-dialogs__footer__next x-theme__buttons"
            @click.native="wizard = 2"
          >Siguiente</v-btn>
        </div>
      </div>

      <deleteDialog :show="dialogs.delete" @close="dialogs.delete = false"></deleteDialog>

      <v-snackbar v-model="snackbar.state" :timeout="snackbar.timeout" color="red">
        <v-btn @click.native="dialogs.delete = true" class="delete-snackbar-button" dark flat block>
          <v-icon>delete_forever</v-icon>
        </v-btn>
      </v-snackbar>
    </div>
  </transition>
</template>
  
  <script lang="ts">
import { Component } from "vue-property-decorator";
import User from "@/controllers/User.ts";
import XComponent from "@/components/XComponent.ts";
import ucontactxTable from "@/components/XTable.vue";
import deleteDialog from "@/components/dialogs/delete.vue";

@Component({
  components: {
    ucontactxTable,
    deleteDialog
  }
})
export default class Users extends XComponent {
  private user: User = new User();
  private users: object[] = [];
  private selectedUsers: object[] = [];
  private contexts: object[] = [];
  private codecs: string[] = ["alaw", "ulaw", "opus", "h264"];
  private types: string[] = ["Agente", "Supervisor"];
  private valid: boolean = true;
  private lang: object[] = [
    { key: "es", value: "español" },
    { key: "en", value: "english" }
  ];
  private snackbar: object = {
    state: false,
    timeout: 0
  };
  private rules: object = {
    inputText: [v => !!v || this.$i18n.t("VALIDATIONS.required")]
    //phoneAvailable: value => !this.phoneAvailability(value) || "El numero ingresado no se encuentra disponible"
  };

  created() {
    this.init();
  }

  init() {
    this.tableConf.headers = [
      { name: "USERS.name", type: "string", value: "name", align: "left" },
      { name: "USERS.type", type: "string", value: "type", align: "center" },
      {
        name: "USERS.security",
        type: "string",
        value: "security",
        align: "center"
      },
      { name: "USERS.phone", type: "string", value: "phone", align: "center" }
    ];

    this.tableConf.search.text = "USERS.search";

    this.getUsers();
    this.getContexts();
  }

  async getUsers() {
    try {
      this.users = await User.get();
    } catch (error) {
      console.log(error);
    }
  }

  async getContexts() {
    try {
      //this.contexts = await Context.get();
      this.contexts = [
        { name: "Agentes", data: "" },
        { name: "PowerDialer", data: "" }
      ];
    } catch (error) {
      console.log(error);
    }
  }

  async add() {
    try {
      this.user.validate();
      await this.user.add();
      this.dialogs.add = false;
      this.users.push(this.user.getRaw());
    } catch (error) {
      console.log(error);
      if (error.status == "VALIDATE") {
        this.errors.wizard = true;
      } else {
        console.log(error);
        //this.notify.warning('Informacion Incompleta', 'Debe completar todos los campos para poder continuar');
      }
      //for tests
      //this.dialogs.add = false;
      //this.users.push(this.user.getRaw());
    }
  }

  async save() {
    try {
      if (this.validate("save")) {
        this.user.validate();
        //await this.user.save();
        this.dialogs.save = false;
        this.updateInTable();
      }
    } catch (error) {
      console.log(error);
      if (error.status == "VALIDATE") {
        this.errors.wizard = true;
      } else {
        //this.notify.warning('Informacion Incompleta', 'Debe completar todos los campos para poder continuar');
      }
      //for tests
      //this.dialogs.save = false;
      //this.updateInTable();
    }
  }

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
      this.notify.success(
        this.$i18n.t("USERS.deleted"),
        this.$i18n.t("USERS.delete")
      );
    } catch (error) {
      if (error.status == 401) {
        let result = await this.auth.reconnect();
        if (result) {
          this.get();
        } else {
          this.auth.logoff();
        }
      } else {
        //this.notify.handler(error)
      }
    }
  }

  open(user: object) {
    this.user = new User(user);
    this.dialogs.save = true;
  }

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

  updateSelected(selected: object[]) {
    this.selectedUsers = selected;
    if (selected.length > 0) {
      this.snackbar.state = true;
    } else {
      this.snackbar.state = false;
    }
  }

  updateInTable() {
    this.users.map(user => {
      if (user._id == this.user._id.value) {
        Object.assign(user, this.user.getRaw());
      }
    });
  }

  showNew() {
    this.user = new User();
    this.wizard = 1;
    this.resetNew();
    this.dialogs.add = true;
  }

  stepOne() {
    if (this.validate("stepOne")) {
      this.wizard = 2;
    }
  }

  stepTwo() {
    if (this.validate("stepTwo")) {
      this.add();
    }
  }

  //VALIDATION
  validate(ref) {
    if (this.$refs[ref].validate()) {
      return true;
    } else {
      return false;
    }
  }

  reset(ref) {
    this.$refs[ref].reset();
  }

  resetNew() {
    this.reset("stepOne");
    this.reset("stepTwo");
  }
}
</script>
  
  <style>
.cards-content {
  height: calc(100% - 67px);
  padding: 50px;
  padding-top: 75px;
  overflow-y: auto;
}

.search-user-input {
  width: 36% !important;
  padding-top: 0px !important;
}

.search-user-input.input-group--text-field > label {
  font-size: 14px !important;
}

.search-user-input > .input-group__details:before {
  background-color: #2727272b !important;
}

.user-stepper > .v-stepper__header {
  box-shadow: none;
  border-radius: 50px;
  padding: 11px 28px;
  margin-left: 5%;
  width: 89%;
  margin-top: 22px;
  border: 1px solid #d4d4d4;
}

.rights-step.v-stepper__content > .v-stepper__wrapper {
  padding-bottom: 55px !important;
}

.user-listed {
  text-transform: uppercase;
}

.user-listed > a.v-list__tile {
  padding-right: 0;
  padding-left: 36px;
}

.user-listed > a.v-list__tile > .v-list__tile__content {
  font-size: 14px;
}

.member-selection {
  text-transform: uppercase;
}

.member-selection > a.v-list__tile {
  padding-right: 20px;
  padding-left: 50px;
}

.admin-new-user {
  position: relative;
  left: 0;
  padding-left: 33%;
  bottom: 15px;
}

.ucontact-dialogs .ucontact-stepper > .v-stepper__header {
  box-shadow: none;
  border-radius: 50px;
  padding: 11px 28px;
  margin-left: 5%;
  width: 89%;
  margin-top: 22px;
  border: 1px solid #d4d4d4;
}

.ucontact-stepper {
  box-shadow: none !important;
  border: 1px solid #d4d4d4 !important;
  border-radius: 80px;
  margin: 31px;
}
</style>
  
  <style scoped>
.ucontact-dialogs__footer {
  padding-top: 5px;
  padding-bottom: 5px;
  border-top: 1px solid #cecece4f;
}

.ucontact-stepper > .v-stepper__header {
  box-shadow: none;
  border: 1px solid #d4d4d4;
  border-radius: 80px;
  margin: 31px;
}

.delete-snackbar-button {
  width: 100%;
  position: relative;
  left: 0px;
  margin-left: 0 !important;
}

.delete-snackbar-button i {
  font-size: 29px !important;
}

.search-user-input.input-group--text-field > label {
  font-size: 14px !important;
}

.search-user-input > .input-group__details:before {
  background-color: #2727272b !important;
}

.user-stepper > .v-stepper__header {
  box-shadow: none;
  border-radius: 50px;
  padding: 11px 28px;
  margin-left: 5%;
  width: 89%;
  margin-top: 22px;
  border: 1px solid #d4d4d4;
}

.rights-step.v-stepper__content > .v-stepper__wrapper {
  padding-bottom: 55px !important;
}

.user-listed {
  text-transform: uppercase;
}

.user-listed > a.v-list__tile {
  padding-right: 0;
  padding-left: 36px;
}

.user-listed > a.v-list__tile > .v-list__tile__content {
  font-size: 14px;
}

.member-selection {
  text-transform: uppercase;
}

.member-selection > a.v-list__tile {
  padding-right: 20px;
  padding-left: 50px;
}

.admin-new-user {
  position: relative;
  left: 0;
  padding-left: 33%;
  bottom: 15px;
}
</style>

<style scoped>
.ucontact-dialogs__footer {
  padding-top: 5px;
  padding-bottom: 5px;
  border-top: 1px solid #cecece4f;
}

.x-stepper {
  box-shadow: 0 0 0 0;
}

.x-stepper > .v-stepper__header {
  box-shadow: none;
  border-radius: 80px;
  margin: 18%;
  margin-top: 10px;
  margin-bottom: -4px;
}

.delete-snackbar-button {
  width: 100%;
  position: relative;
  left: 0px;
  margin-left: 0 !important;
}

.delete-snackbar-button i {
  font-size: 29px !important;
}

.x-dialogs {
  position: absolute;
  top: 150px;
  left: 0;
  width: 100%;
  z-index: -1;
  opacity: 0;
  padding-top: 34px;
  height: calc(100% - 64px);
  background-color: white;
  transition: all 0.2s ease-out;
}

.x-dialogs.show {
  display: block;
  opacity: 1;
  z-index: 2;
  transform: translateY(-87px);
  transition: all 0.2s ease-out;
}

.x-dialogs__close {
  position: absolute;
  right: 86px;
  padding: 24px;
  top: 29px;
}

.x-dialogs__close i {
  margin-top: -14px;
  font-size: 27px;
  color: #989898 !important;
}

.x-dialogs__step__item {
  width: 350px;
  height: 450px;
  border: 1px solid #444d6145;
  border-radius: 6px;
  margin: 50px;
  position: relative;
  box-shadow: 1px 1px 5px -2px #545454;
  transition: all 0.4s ease-out;
}

.x-dialogs__step__item.active::after {
  content: "";
  position: absolute;
  background-color: #e9556226;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  left: -1px;
  top: -1px;
  border: 2px solid #f687778a;
  border-radius: 6px;
  transition: all 0.2s ease-out;
}

.x-dialogs__step__item::after {
  content: "";
  position: absolute;
  background-color: transparent;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  left: -1px;
  top: -1px;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-out;
}

.x-dialogs__step__item:hover::after {
  content: "";
  position: absolute;
  background-color: #e9556215;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  left: -1px;
  top: -1px;
  border: 2px solid #f687778a;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-out;
}

.x-dialogs__step__item__pic {
  padding-top: 30px;
}

.x-dialogs__step__item__title {
  color: #6d6d6d;
  font-size: 21px;
}

.x-dialogs__step__item__desc {
  color: #6d6d6d;
  line-height: 32px;
  font-size: 15px;
  padding: 28px;
}

.x-dialogs__step__desc {
  font-size: 22px;
}

.x-dialogs__footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 73px;
  box-shadow: 0 0 6px -2px #8e8e8e;
}

.x-dialogs__footer__goBack {
  float: left;
  margin: 19px;
}

.x-dialogs__footer__next {
  float: right;
  margin: 19px;
}

.x-dialogs__step__field {
  padding: 6px 30px;
  margin: 30px;
  margin-top: 9px;
}

.x-dialogs__step__query {
  font-size: 20px;
  text-align: left;
  padding-left: 67px;
}

.x-fields {
  width: 100%;
  padding: 12px;
  font-size: 18px;
  border: 1px solid #dadada;
  border-radius: 10px;
  text-align: center;
  outline: 0;
}
</style>
