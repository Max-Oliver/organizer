<template>
  <div class="main-card">
    <v-layout row wrap>
      <v-flex xs12 xl12 sm12>
        <span>Nuevos Eventos Recomendados</span>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  components : { },
  name: 'unified',
  data () {
    return {
    }
  },
  mounted(){

  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .main-card {
    background-color: "#676767";  
    height: 100% !important;
    padding: 50px;
    padding-top: 75px;
    overflow-y: auto;
    border-radius: 10px;
  }
</style>
