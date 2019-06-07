<template>
    <transition name="slide-y">
  <v-dialog v-model="model" fullscreen scrollable>
      
    <v-card class="x-dialogs">
      <v-card-text style="padding:0;">
          
        <v-stepper v-model="wizard" class="stepper">
          <v-stepper-items>
            <v-stepper-content v-for="(step,index) in steps" :key="index+1" :step="index+1">
              
              <div class="black" style="position: relative; width: 100%; height: 60px;">
                <v-layout row wrap class="text-xs-center">
                  <v-flex xs4 xl4 sm4 class="text-xs-left pt-3 pl-1">
                      <v-icon @click="model=false" dark fab>arrow_back</v-icon>
                  </v-flex>
                  <v-flex xs4 xl4 sm4 class="pt-3">
                      <span class="white--text">{{ $i18n.t(step.title) }}</span>
                  </v-flex>
                  <v-flex xs4 xl4 sm4>        
                                      </v-flex>
                </v-layout>
              </div>
              
              <v-form :ref="'step'+(index+1)">
                <!--default step-->
                <slot
                  :name="'step'+(index+1)"
                  :jump="jump"
                  :next="next"
                  :prev="prev"
                  :add="steps.length-1 == index ? add : () =>{}"
                >
                  <v-layout row wrap class="x-dialogs__content">
                    <v-flex
                      v-for="(field,index) in step.fields"
                      :key="index"
                      xs12
                      sm12
                      lg12
                      class="pb-3 px-4"
                    >
                      <component
                        v-model="item[field.name]"
                        :is="getFieldType(field.type)"      
                        :items="(field.data || {}).items"
                        :item-text="(field.data || {}).text"
                        :item-value="(field.data || {}).value"
                        :hint="$i18n.t(field.hint)"
                        :error="errors && errorField(field)"
                        :rules="field.rules"
                        :label="$i18n.t(field.label)"
                        :prepend-icon="field.icon"
                        :selectable="field.selectable"
                        color="x-theme__color"
                      ></component>
                      
<!-- 
                      <template v-else v-slot:activator="{ on }">
                        <v-text-field
                          v-model="item[field.name]"
                          label="Picker in menu"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="item[field.name]" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                      </v-date-picker> -->


                    </v-flex>

                    <!--footer-->
                    <v-flex xs12 sm12 lg12 class="pr-3">
                      <v-btn
                        v-if="steps.length == index+1"
                        color="x-theme__color"
                        flat
                        outline
                        style="float: right;"
                        @click.native="add"
                      >{{ step.Addbutton.text }}</v-btn>
                      <v-btn
                        v-if="wizard != steps.length"
                        style="float: right;"
                        flat
                        color="x-theme__color"
                        @click.native="wizard += 1"
                      >Siguiente</v-btn>
                      <v-btn
                        v-if="wizard > 1"
                        color="grey"
                        style="float: right;"
                        flat
                        @click.native="wizard -= 1"
                      >{{ $i18n.t('GENERAL.prev') }}</v-btn>
                    </v-flex>
                  </v-layout>
                </slot>
              </v-form>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>

      <div style="position:absolute; bottom:0; width:100%">
        <v-alert
          class="alert"
          v-model="alert.show"
          outline
          color="error"
        >
          {{ alert.message }}
        </v-alert>
      </div>

    </v-card>
  </v-dialog>
    </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { VSelect, VTextField, VCheckbox, VDatePicker } from "vuetify/lib";
// import DatePick from 'vue-date-pick';
// import 'vue-date-pick/dist/vueDatePick.css';


@Component({
  components: {
    VDatePicker,
    VSelect,
    VTextField,
    VCheckbox
  }
})

export default class AddDialog extends Vue {
  @Prop({ default: false }) value!: boolean;
  @Prop({ default: {show:false, message:""} }) alert!: any;

  @Prop({
    default: () => [
      {
        title: "Step 1",
        fields: [
          {
            type: "input",
            name: "first",
            label: "My first input"
          }
        ]
      },
      {
        title: "Step 2",
        fields: [
          {
            type: "input",
            name: "second",
            label: "My second input"
          }
        ]
      }
    ]
  })
  steps: any;

  private wizard: number = 1;
  private errors: boolean = false;
  private item: any = {};

  private weekdays: any = [
    'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'
  ];
  private months: any = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  private timeCaption: string = "[hola]";

  /**
   * @name MODEL
   * @description emits the input method to the parent for define visibility of the dialog
   */
  get model(): boolean {
    return this.value;
  }

  set model(model: boolean) {
    this.$emit("input", model);
  }

  /**
   * @name NEXT
   * @description next step in stepper dialog
   */
  next() {
    if (this.steps.length > this.wizard) this.wizard += 1;
  }

  /**
   * @name PREV
   * @description prev step in stepper dialog
   */
  prev() {
    if (this.steps.length > 0) this.wizard -= 1;
  }

  /**
   * @name JUMP
   * @description jump to the step entered in the stepper dialog
   */
  jump(value: number) {
    if (value >= 0 && value <= this.steps.length) {
      this.wizard = value;
    }
  }

  /**
   * @name GET_FIELD_TYPE
   * @description return a type of component by a type string
   */
  getFieldType(type: string): string {
    let component: string = "";
    if (type == "input") component = "v-text-field";
    if (type == "select") component = "v-select";
    if (type == "list") component = "x-list";
    if (type == "checkbox") component = "v-checkbox";
    if (type == "date") component = "v-text-field";//"v-date-picker";
    
    return component;
  }

  /**
   * @name ERROR_FIELD
   * @description Check the required fields and return if there is an empty one
   */
  errorField(field: any) {
    let error = false;
    if (field.required && !this.item[field.name]) {
      error = true;
    }
    return error;
  }

  /**s
   * @name ADD
   * @description emits the add method to the parent
   */
  add() {
      this.errors = false;
      this.steps.map((step: any, index: number) => {
        let form = "step" + (index + 1);

        if (!this.$refs[form][0].validate()) {
          this.errors = true;
          this.wizard = index + 1;
        }
      });
      if (!this.errors){
        this.$emit("add", this.item);
        // //refresh
        // this.steps.map((step: any, index: number) => {
        //   let form = "step" + (index + 1);
          
        //   console.log(this.$refs[form][0])
        //   this.wizard = 1;
        //   this.$refs[form][0].reset();
        // });
      } 
  }
}
</script>

<style lang="scss">

.stepper {

  .v-stepper__content {
    
    padding: 0 !important;
  }
}
.x-dialogs {
  border-radius: 6px !important;

  .x-stepper {
    box-shadow: none !important;
    border: none;
    border-radius: 80px;
    margin: 31px;

    .v-stepper__header {
      box-shadow: none;
      border-radius: 50px;
      padding: 11px 28px;
      margin-left: 5%;
      width: 89%;
      margin-top: 22px;
      border: 1px solid #d4d4d4;
    }

    .v-stepper__step > .v-stepper__label {
      color: #8f8f8f !important;
      text-shadow: none;
    }

    .v-stepper__step__step {
      background-color: #de5656 !important;
    }
  }
}

.x-dialogs__footer {
  border-top: 1px solid #f1f1f1;
  padding: 8px;
}

.x-dialogs__content {
  position: relative;
  width: 100%;
  height: 100%;
  
  // max-height: 520px;
  // overflow-y: auto;
  padding-top: 50px;
  padding-left: 45px;
  padding-right: 45px;
}
</style>
