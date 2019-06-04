<template v-cloak>
  <v-navigation-drawer
    :style="{ 'background-color' : $store.state.theme.colors.menu }"
    id="drawer-left"
    temporary
    
    fixed
    left
    v-model="drawer"
  >
    <v-list subheader>
      <v-list-tile >
        <v-text-field
          v-model="search"
          append-icon="search"
          placeholder="Buscar en Organize"
          class="search-menu-left"                                                                         
        ></v-text-field>
      </v-list-tile>

      <v-list v-if="filteredConf.length > 0">
        <v-list-tile
          v-for="(item, index) in filteredConf"
          :key="index"
          @click="pageRouter(item.route)"
          class="pb-1 pt-1"
        >
          <v-list-tile-action class="pl-1">
            <v-icon :color="$store.state.theme.colors.menuIcons">{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title :style="{ 'color' : $store.state.theme.colors.menuIcons }">
              <span>{{ $i18n.t(item.name).toLowerCase() }}</span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class LeftSideMenu extends Vue {
  private search: string = "";
  private menu: object = {
    configuration: [
      { name: "mis eventos", icon: "star", route: "MyEvents" },
      { name: "buscar eventos", icon: "playlist_add_check", route: "SecurityGroups" }
    ]
  };

  get filteredConf() {
    return this.menu.configuration.filter(option => {
      return option.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0;
    });
  }

  get drawer() {
    return this.$store.state.drawer.left;
  }

  set drawer(drawer) {
    this.$store.commit("setLeftDrawer", drawer);
  }

  pageRouter(route: string) {
    console.log(route)
    this.$router.push(route);
  }
}
</script>


<style lang="scss">
  #drawer-left {
    top: 60px;
    width: 250px !important;
    height: calc(100% - 60px) !important;
  }

  .search-menu-left {
    padding-top: 10px;
    height: 100%;

    input {
      text-align: center;
      padding-bottom: 20px;
      height: 100%;
    }

    :after {
      visibility: hidden;
    }

    :before {
      top: 30px !important;
    }

    .v-input__control {
      margin-left: -16px !important;
      margin-right: -16px !important;
      height: 100%;
    }

    .v-input__icon {
      padding-right: 30px !important;
      padding-bottom: 12px;
    }
  }

  .search-menu-left {
  input {
    color: #676767 !important;
  }

  input::placeholder {
    color: #676767 !important;
    font-family: cursive;
    font-style: italic;
  }

  ::before {
    color: #67676788 !important;
  }

  .v-messages__wrapper {
    color: #ff5e00b9 !important;
  }

  .v-input__icon {
    .v-icon {
      color: #db6826e8 !important;
    }
  }
}

</style>