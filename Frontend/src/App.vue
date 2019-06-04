<template>
  <v-app :dark="theme.dark">
    
    <Toolbar></Toolbar>
    <LeftSideMenu> </LeftSideMenu>
    <main class="main-content">
      <router-view></router-view>
    </main>
    
  </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Toolbar            from '@/components/Toolbar.vue'; // @ is an alias to /src
  import LeftSideMenu       from '@/components/LeftSideMenu.vue';

  @Component({
    components: {
      Toolbar,
      LeftSideMenu
    }
  })
  
  export default class App extends Vue {

    created() {
      this.init();
    }

    init() {
      let theme  : string | null = sessionStorage.getItem("themeLayout");
      let layout : string | null = sessionStorage.getItem("languageLayout");

      if (theme) {
        this.$store.commit("setTheme", JSON.parse(theme).dark);
      }

      if (layout) {
        this.$i18n.locale = layout;
      }
    }

    get theme() : object {
      return this.$store.state.theme;
    }

    pageRouter(route : string) {
      this.$router.push(route);
    }
    
  }
</script>

<style lang="scss">

  main {
    padding: 0px 0px 0px 0px;
  }

  .ucontact-theme__background {
    background-color:#de5656 !important;

    .v-stepper__step {
      background-color:#de5656 !important;
    }
  }

  .ucontact-theme__color--text {
    color:#de5656 !important;
  }

  .ucontact-theme__disabled {
    color: #cecece !important;
  }

  .ucontact-dialogs {
    border-radius: 8px !important;
  }

</style>
