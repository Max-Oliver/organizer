<template>
  <transition name="slide-fade">
    <div id="my-events" class="page-content">
      <v-layout row wrap>
        <v-flex xs12 sm12 md12 xl12>
          <x-table
            :conf="tableConf"
            v-model="selectedEvents"
            :items="events"
            itemIcon="star"
            @get="get"
            @value="updateSelected"
            @open="open"
            @new="showNew"
          ></x-table>
        </v-flex>
      </v-layout>

      <!--add dialog-->
      <add-dialog v-model="dialogs.add" :steps="steps" @add="add"></add-dialog>

      <!--update dialog-->
      <update-dialog width="800" v-model="dialogs.save" :steps="steps" @save="save"></update-dialog>

      <!--delete dialog-->
      <delete-dialog
        v-model="dialogs.delete"
        message="EVENTS.deleteEvemts"
        @close="dialogs.delete = false"
      ></delete-dialog>

      <v-snackbar
        class="delete-snackbar"
        v-model="snackbar.state"
        :timeout="snackbar.timeout"
        color="red"
      >
        <v-btn @click.native="dialogs.delete = true" class="delete-snackbar-button" dark flat block>
          <v-icon>delete_forever</v-icon>
        </v-btn>
      </v-snackbar>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import XComponent from "@/components/XComponent.ts";
import Event from "@/controllers/Event.ts";
import XTable from "@/components/XTable.vue";
import AddDialog from "@/components/dialogs/add.vue";
import UpdateDialog from "@/components/dialogs/update.vue";
import DeleteDialog from "@/components/dialogs/delete.vue";

@Component({
  components: {
    XTable,
    AddDialog,
    UpdateDialog,
    DeleteDialog
  }
})
export default class MyEvents extends XComponent {
  private event: Event = new Event();
  private events: any[] = [];
  private selectedEvents: any[] = [];

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

  private tableConf = {
    headers: [
      {
        name: "EVENT.name",
        type: "string",
        value: "name",
        align: "left"
      },
      {
        name: "EVENT.location",
        type: "string",
        value: "location",
        align: "center"
      },
      {
        name: "EVENT.date",
        type: "string",
        value: "date",
        align: "center"
      }
    ],
    search: {
      show: false,
      text: "EVENT.search"
    }
  };

  private steps: any = [
    {
      title: "EVENT.basics",
      Addbutton: {text:"Crear"},
      fields: [
        {
          type: "input",
          name: "name",
          label: "nombre",
          hint: "EVENT.hintName",
          icon: "person",
          rules: this.rules.required,
          required: true
        },
        {
          type: "input",
          name: "location",
          label: "EVENT.location",
          hint: "EVENT.hintLocation",
          icon: "person",
          rules: this.rules.required,
          required: true
        },
        {
          type: "input",
          name: "date",
          label: "inicio",
          hint: "EVENT.hintDate",
          icon: "person",
          rules: this.rules.required,
          required: true
        },
        {
          type: "input",
          name: "date",
          label: "fin",
          hint: "EVENT.hintDate",
          icon: "person",
          rules: this.rules.required,
          required: true
        },
        {
          type: "input",
          name: "date",
          label: "descripcion",
          hint: "EVENT.hintDate",
          icon: "person",
          rules: this.rules.required,
          required: true
        },
        {
          type: "input",
          name: "date",
          label: "cantidad de invitados",
          hint: "EVENT.hintDate",
          icon: "person",
          rules: this.rules.required,
          required: true
        }
      ]
    }
  ];

  private addOptions: any[] = [
    { name: "Voice", event: "voice", icon: "phone" },
    { name: "SMS", event: "sms", icon: "phone_iphone" },
    { name: "Webchat", event: "webchat", icon: "chat" },
    { name: "Whatsapp", event: "whatsapp", icon: "person" },
    { name: "Facebook", event: "facebook", icon: "person" },
    { name: "Twitter", event: "twitter", icon: "person" }
  ];

  created() {
    this.init();
  }

  init() {
    this.get(this.pagination);
  }

  /**
   * @name GET
   * @description gets items with filters of pagination
   */
  async get(pagination: any = this.pagination) {
    console.log("re-obtaining campaigns");
    try {
      this.loading.table = true;
      let events = await Event.get(pagination);
      this.pagination.total = events.total;
      this.selectedEvents = [];
      this.events = events.docs;
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
  async add(event: any) {
    try {
      await this.event.add();
      this.events.push(event);
      this.dialogs.add = false;
    } catch (error) {
      console.log(error);
      if (error.status == "VALIDATE") {
        this.errors.wizard = true;
      } else {
        //this.notify.warning('Informacion Incompleta', 'Debe completar todos los campos para poder continuar');
      }
    }
  }

  /**
   * @name SAVE
   * @description save changes in the selected item from the table
   */
  async save(event: any) {
    console.log("save-campaign");
    try {
      await this.event.save();
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
        this.selectedEvents.map(async event => {
          let aux = new Event(event);
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
    this.event = new Event();
    this.dialogs.add = true;
  }

  /**
   * @name OPEN
   * @description shows the update dialog when is selected a item from the table
   */
  open(event: any) {
    this.event = new Event(event);
    this.dialogs.save = true;
  }

  /**
   * @name REMOVE_FROM_TABLE
   * @description remove item from the table
   */
  removeFromTable(id: number) {
    let index = -1;
    let selectedIndex = -1;
    this.events.map(elem => {
      if (elem._id == id) {
        index = this.events.indexOf(elem);
      }
    });

    this.selectedEvents.map(elem => {
      if (elem._id == id) {
        selectedIndex = this.selectedEvents.indexOf(elem);
      }
    });
    this.events.splice(index, 1);
    this.selectedEvents.splice(selectedIndex, 1);
  }

  /**
   * @name UPDATE_SELECTED
   * @description shows the delete snackbar where is selected a item from the table
   */
  updateSelected(selected: any[]) {
    this.selectedEvents = selected;
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
    this.events.map(event => {
      if (event._id == this.event._id.value) {
        Object.assign(event, this.event.getRaw());
      }
    });
  }
}
</script>

<style lang="scss">
#my-events {
    position:absolute;
    top:60px;
    width: 100%!important;
    height:calc(100% - 60px)!important;
    background-color: #35353573;
}

.ucontact-dialogs__footer { 
  padding-top: 5px;
  padding-bottom: 5px;
  border-top: 1px solid #cecece4f;
}

.ucontact-stepper {
  .v-stepper__header {
    box-shadow: none;
    border: 1px solid #d4d4d4;
    border-radius: 80px;
    margin: 31px;
  }
}

.delete-snackbar {
  height: 48px !important;

  .v-snack__content {
    padding: 0 !important;
    align-items: initial !important;

    .delete-snackbar-button {
      width: 100% !important;
      position: relative;
      left: 0px;
      margin-left: 0 !important;

      i {
        font-size: 29px !important;
      }

      .v-icon {
        padding-left: 0px !important;
      }
    }
  }
}
</style>