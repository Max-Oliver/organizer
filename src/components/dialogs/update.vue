<template>
  <v-dialog v-model="model" persistent :max-width="(stepWidth * steps.length + 5)+'px'">
    <v-card>
      <v-card-actions style="padding:0;">
        <div v-for="(step,index) in steps" :key="index" :style="{'width' : stepWidth+'px'}">
          <div class="step-header" :class="{'step-header__right': (index == steps.length-1)}">
            <v-subheader>
              <span class="grey--text">{{ $i18n.t(step.title) }}</span>
            </v-subheader>
          </div>
        </div>
      </v-card-actions>

      <v-card-text style="padding:0">
        <v-card-actions style="padding:0">
          <div
            :style="{'width' : stepWidth+'px'}"
            class="step px-5"
            :class="{ 'step__align-center' : step.fields.length <= 6,'step__right': (index == steps.length-1) }"
            v-for="(step,index) in steps"
            :key="index"
          >
            <v-layout row wrap>
              <!-- ITEMS -->
              <v-flex xs12 sm12 lg12 class="pb-3" v-for="(field,index) in step.fields" :key="index">
                <component
                  v-if="field.type == 'input'"
                  :is="getFieldType(field.type)"
                  color="sistra-theme__color"
                  :error="errors && errorField(field)"
                  v-model="item[field.name]"
                  :label="$i18n.t(field.label)"
                  :prepend-icon="field.icon"
                ></component>

                <component
                  v-else-if="field.type == 'select'"
                  color="sistra-theme__color"
                  :is="getFieldType(field.type)"
                  :items="field.data.items"
                  :item-text="field.data.text"
                  :error="errors && errorField(field)"
                  v-model="item[field.name]"
                  :item-value="field.data.value"
                  :label="$i18n.t(field.label)"
                  :prepend-icon="field.icon"
                ></component>
              </v-flex>
            </v-layout>
          </div>
        </v-card-actions>
      </v-card-text>

      <!--FOOTER-->
      <v-card class="x-theme__footer">
        <v-btn flat @click.native="model = false">Cerrar</v-btn>
        <v-btn dark color="sistra-theme__background" @click.native="save">Guardar</v-btn>
      </v-card>
    </v-card>
  </v-dialog>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { VSelect, VTextField } from "vuetify/lib";

@Component({
  components: {
    VSelect,
    VTextField
  }
})
export default class UpdateDialog extends Vue {
  @Prop({ default: false }) value!: boolean;
  @Prop({ default: 350 }) stepWidth!: number;
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

  private item: any = {};
  private errors: boolean = false;

  get model(): boolean {
    return this.value;
  }

  set model(model: boolean) {
    this.$emit("input", model);
  }

  getFieldType(type: string): string {
    let component: string = "";
    if (type == "input") component = "v-text-field";
    if (type == "select") component = "v-select";
    return component;
  }

  errorField(field: any) {
    let error = false;

    if (field.required && !this.item[field.name]) {
      error = true;
    }
    return error;
  }

  save() {
    this.errors = false;
    this.steps.map((step: any, index: number) => {
      step.fields.map((field: any) => {
        if (this.errorField(field)) {
          this.errors = true;
        }
      });
    });

    if (!this.errors) this.$emit("save", this.item);
  }
}
</script>

<style>
.step {
  border-right: 1px solid #0000001f !important;
  height: 500px;
  overflow-y: auto;
}

.step__align-center {
  align-items: center;
  display: flex;
}

.step__right {
  border-right: none !important;
}

.step-header {
  border-right: 1px solid #0000001f;
}
.step-header__right {
  border-right: none;
}

.x-theme__footer {
  border-top: 1px solid #0000001f !important;
}
</style>
