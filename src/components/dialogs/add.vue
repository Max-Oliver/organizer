<template>
  <v-dialog v-model="show" max-width="700px" scrollable>
    <v-card class="x-dialogs">
      <v-card-text style="padding:0;height:100%">
        <v-stepper v-model="wizard" style="height:100%">
          <v-stepper-header class="x-stepper">
            <template v-for="(step,index) in steps">
              <v-stepper-step
                :key="index+1"
                color="x-theme__background"
                :complete="wizard > (index+1)"
                :step="index+1"
              >{{ $i18n.t(step.title) }}</v-stepper-step>
              <v-divider v-if="steps.length != index+1" :key="(index+1)+'-divider'"></v-divider>
            </template>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content v-for="(step,index) in steps" :key="index+1" :step="index+1">
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
                    :error="errors && errorField(field)"
                    :label="field.label"
                    :prepend-icon="field.icon"
                    :selectable="field.selectable"
                    color="x-theme__color"
                  ></component>

                </v-flex>
                <v-flex xs12 sm12 lg12>
                  <v-btn
                    v-if="steps.length == index+1"
                    color="x-theme__color"
                    outline
                    style="float: right;"
                    @click.native="add"
                  > {{ $i18n.t('GENERAL.create') }} </v-btn>
                  <v-btn
                    v-if="wizard > 1"
                    color="grey"
                    style="float: right;"
                    flat
                    @click.native="wizard -= 1"
                  > {{ $i18n.t('GENERAL.prev') }} </v-btn>
                  <v-btn
                    v-if="wizard != steps.length"
                    style="float: right;"
                    flat
                    color="x-theme__color"
                    @click.native="wizard += 1"
                  >Siguiente</v-btn>
                </v-flex>
              </v-layout>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { VSelect, VTextField } from "vuetify/lib";

@Component({
  components: {
    VSelect,
    VTextField
  }
})

export default class AddDialog extends Vue {
  @Prop() show!: boolean;
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

  getFieldType(type: string): string {
    let component: string = "";
    if (type == "input") component = "v-text-field";
    if (type == "select") component = "v-select";
    if (type == "list") component = "x-list";
    return component;
  }

  errorField(field: any) {
    let error = false;

    if (field.required && !this.item[field.name]) {
      error = true;
    }

    return error;
  }

  add() {
    this.errors = false;
    this.steps.map((step: any, index: number) => {
      step.fields.map((field: any) => {
        if (this.errorField(field)){
          this.errors = true;
          this.wizard = index + 1;
        }
      });
    });

    if (!this.errors) this.$emit("add", this.item);
  }

  nextStep(step : any) { 
    this.errors = false;

    step.fields.forEach((field : any) => {
      if (this.errorField(field)){
        this.errors = true;
      }   
    });

    if (!this.errors) this.wizard += 1;
  }

}
</script>

<style lang="scss">
.x-dialogs {
  border-radius: 6px !important;

  .x-stepper {
    box-shadow: none !important;
    border: 1px solid #d4d4d4 !important;
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
      color: #f67a5a !important;
    }

    .v-stepper__step--inactive > .v-stepper__step__step {
      background-color: #f67a5a7d !important;
    }
  }
}

.x-dialogs__footer {
  border-top: 1px solid #f1f1f1;
  padding: 8px;
}

.x-dialogs__content {
  padding-left: 80px;
  padding-right: 80px;
  padding-bottom: 50px;
}
</style>
