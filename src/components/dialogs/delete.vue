<template>
  <v-dialog v-model="show" persistent width="660px" scrollable>
        <v-card class="delete-dialog__card" style="height: 307px;" color="#ffe563">
            <v-card-text >
                <div class="delete-dialog__card__header">
                    <span> ATENCION </span>
                </div>
                <v-layout row wrap class="pt-4">
                    <v-flex sm3 xl3>
                        <v-icon color="#00000036" class="delete-dialog__card__icon">warning</v-icon>
                    </v-flex>
                    <v-flex sm9 xl9 class="pt-2">
                        <span class="delete-dialog__card__content">¿Esta seguro que desea eliminar los proveedores seleccionados?<br>&nbsp; Esta accion no se puede deshacer</span>
                    </v-flex>
                </v-layout>

                <div class="delete-dialog__action">
                    <v-spacer></v-spacer>
                    <v-btn @click.native="$emit('close')">Cerrar</v-btn>
                    <v-btn flat @click.native="$emit('remove')"> Se lo que estoy haciendo </v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  name:"delete-dialog",
  props: {
      show: {
          type: Boolean,
          default: false
      }
  },

  data () {
    return {}
  },

  computed: {

    /**
     * @name THEME
     * @desc Returns globally stored theme
     */
    theme() {
      return this.$store.state.theme;
    }
  }
}
</script>

<style scoped>

.delete-dialog__card {
    border-radius: 5px;
    padding: 13px 34px 57px;
}

.delete-dialog__card__header {
    font-size: 23px;
    padding-bottom: 20px;
}

.delete-dialog__card__icon {
    font-size: 82px;
}

.delete-dialog__card__content {
    font-size: 14px;
    line-height: 28px;
    text-align: left;
    display: inline-block;
    color: #776a28;
}

.delete-dialog__action {
    position: absolute;
    width: 100%;
    border-top: 1px solid #f3da5e;
    left: 0;
    bottom: 4px;
    padding-top: 4px;
    text-align: right;
}

</style>
