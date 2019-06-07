<template>
  <transition name="slide-y">
    <v-dialog v-model="model" fullscreen scrollable>
      <v-card class="x-dialogs">
        
        <v-card-text style="padding:0">
          <!--headers-->
          <v-card-actions style="padding:0;">
            <div
              v-for="(step,index) in steps"
              :key="index"
              :style="{'width' : (width / steps.length)+'px'}"
            >
              <!--header-->
              <slot :name="'header'+(index+1)">
                <div
                  class="step-header pb-3"
                  :class="{'step-header__right': (index == steps.length-1)}"
                >
                  <v-subheader class="pl-5">
                    <span class="pt-5 grey--text">{{ $i18n.t(step.title) }}</span>
                  </v-subheader>
                </div>
              </slot>
            </div>
          </v-card-actions>

          <v-layout row wrap>
            <v-flex xs12 sm12 xl12 v-for="(step,index) in steps" :key="index">
              <!--form validation-->
              <v-form :ref="'step'+(index+1)">
                <!--default step-->
                <slot :name="'step'+(index+1)">
                  <!--fields-->
                  <div
                    :style="{'width' : (width / steps.length)+'px'}"
                    class="step px-5"
                    :class="{ 'step__align-center' : step.fields.length <= 5,'step__right': (index == steps.length-1) }"
                  >
                    <v-layout row wrap>
                      <v-flex
                        xs12
                        sm12
                        lg12
                        class="pb-3"
                        v-for="(field,index) in step.fields"
                        :key="index"
                      >
                        <component
                          color="sistra-theme__color"
                          :is="getFieldType(field.type)"
                          :items="(field.data || {}).items"
                          :item-text="(field.data || {}).text"
                          :type="field.inputType || 'text'"
                          :error="errors && errorField(field)"
                          :hint="$i18n.t(field.hint)"
                          v-model="item[field.name]"
                          item-value="id"
                          :label="$i18n.t(field.label)"
                          :prepend-icon="field.icon"
                        ></component>
                      </v-flex>
                    </v-layout>
                  </div>
                </slot>
              </v-form>
            </v-flex>
          </v-layout>
            
          
        </v-card-text>

        <!--FOOTER-->
        <slot name="footer" :save="save">
          <v-layout row wrap class="x-theme__footer text-xs-center">
            <v-flex xs12 xl12 sm12 class="pt-2 pb-2">
              <v-btn flat @click.native="model = false">Cerrar</v-btn>
              <v-btn dark color="sistra-theme__background" @click.native="save">Guardar</v-btn>
            </v-flex>
          </v-layout>
        </slot>
      </v-card>
    </v-dialog>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { VSelect, VTextField, VCheckbox } from "vuetify/lib";

@Component({
  components: {
    VSelect,
    VTextField,
    VCheckbox
  }
})
export default class UpdateDialog extends Vue {
  @Prop({ default: {} }) item!: any;
  @Prop({ default: false }) value!: boolean;
  @Prop({ default: 800 }) width!: number;
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
  steps!: any[];

  private errors: boolean = false;

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
   * @name GET_FIELD_TYPE
   * @description return a type of component by a type string
   */
  getFieldType(type: string): string {
    let component: string = "";
    if (type == "input") component = "v-text-field";
    if (type == "select") component = "v-select";
    if (type == "checkbox") component = "v-checkbox";
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

  /**
   * @name SAVE
   * @description emits the save method to the parent
   */
  save() {
    console.log("save-update");
    this.errors = false;
    this.steps.map((step: any, index: number) => {
      let form = "step" + (index + 1);
      if (!this.$refs[form][0].validate()) {
        this.errors = true;
      }
    });

    if (!this.errors) this.$emit("save", this.item);
  }
}
</script>

<style>
.step {
  border-right: 1px solid #0000001f !important;
  height: 530px;
  overflow-y: auto;
  padding-top: 40px !important;
}

.step__align-center {
  align-items: center;
  display: flex;
  padding-top: 0px !important;
}

.step__right {
  border-right: none !important;
}

.step-header {
  height: 70px;
  border-right: 1px solid #0000001f;
}
.step-header__right {
  border-right: none;
}

.x-theme__footer {
  border-top: 1px solid #0000001f !important;
}

.x-dialogs {
  border-radius: 6px !important;
}
</style>