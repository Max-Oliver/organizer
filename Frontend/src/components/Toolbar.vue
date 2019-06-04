<template v-cloak>
  <v-toolbar fixed flat dark height="60px">
    <img class="logo" src="@/assets/logo.png" @click.stop="pageRouter('/')" alt="Avatar">
    
    <v-toolbar-side-icon :style="{'color' : theme.colors.navIcons}" @click.native.stop="leftDrawer = true"></v-toolbar-side-icon>
    
    <v-spacer></v-spacer>

    <!--NOTIFICATIONS-->
    <v-menu avatar nudge-top="-53px" right>
      <v-btn icon slot="activator" light>
        <v-icon :color="theme.colors.navIcons">notifications</v-icon>
      </v-btn>

      <v-list class="ucontact-list">
        <v-list-tile @click="" v-for="item in notifications" :key="item.name">
          <v-list-tile-action class="pl-3">
            <v-list-tile-title>
              <span>{{ item.name }}</span>
            </v-list-tile-title>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-avatar size="40px" style="cursor: pointer">
      <img src="@/assets/user.jpg" alt="Avatar"/>
    </v-avatar>
   
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})

export default class Toolbar extends Vue {
  private langs: object[] = [
    { key: "es", value: "Español" },
    { key: "en", value: "English" }
  ];
  private loader:  boolean = false;
  private dialogs: object = { 
    pass:        false, 
    exit:        false, 
    profile:     false, 
    avatarMaker: false 
  }
  private pass:          object   = { current: "", new: "", newRepeat: "" };
  private preferences:   object[] = [{ name: "Layout" }, { name: "Seba" }, { name: "More Seba Stuff" }];
  private notifications: object[] = [{ name: "New Webchat" }, { name: "Message From Seba" }, { name: "Last Notifications" }];
  private msg:           string   = '';
  private colorGroups:   object[] = [
    { nav: '#fff',    navIcons: '#676767', menu: '#fff',    menuIcons: '#676767' },
    { nav: '#009688', navIcons: '#fff',    menu: '#fff',    menuIcons: '#676767' },
    { nav: '#ffff',    navIcons: '#676767', menu: '#424242', menuIcons: '#bdbdbd' },
    { nav: '#424242', navIcons: '#fff',    menu: '#424242', menuIcons: '#bdbdbd' },
    { nav: '#039be5', navIcons: '#fff',    menu: '#424242', menuIcons: '#bdbdbd' },
    { nav: '#444D61', navIcons: '#fff',    menu: '#fff',    menuIcons: '#676767' }
  ];

  get theme() {
    return this.$store.state.theme;
  }

  get dark() : boolean {
    return this.$store.state.theme.dark;
  }

  set dark( value : boolean ) {
    this.$store.commit("setTheme", value);
  }

  get leftDrawer() {
    return this.$store.state.drawer.left;
  }

  set leftDrawer( drawer: boolean ) {
    this.$store.commit('setLeftDrawer',drawer);
  }

  get rightDrawer(){
    return this.$store.state.drawer.right;
  }
  
  set rightDrawer( drawer: boolean ){
    this.$store.commit('setRightDrawer',drawer);
  }

  private pageRouter( route: string ) {
    this.$router.push(route);
  }

  private reloadPage() {
      window.location.reload(true);
  }

  private setLang(lang : string) {
    this.$i18n.locale = lang;
    sessionStorage.setItem("languageLayout", lang);
  }
  
  private showLockScreen() {
    this.$store.commit("toggleLockScreen");
  }
    
  private changePassword() {
    let passObj: object = Object.assign({},this.pass);
    if (passObj.current != "" || passObj.new != "" || passObj.newRepeat != "") {
      if (passObj.new == passObj.newRepeat) {
        this.loader = true;
        setTimeout(() => {
          this.loader = false;
          console.log("Contraseña cambiada correctamente");
          this.dialogs.pass = false;
        }, 300);
      } else {
        console.log("Las Contraseñas no coinciden");
      }
    } else {
      console.log("Debe ingresar los campos para poder continuar");
    }
  }

  private closeSession() {
    console.log("La sesion a sido cerrada");
    this.dialogs.exit = false;
  }

  private showProfileDialog() {
    this.dialogs.profile = true;
  }

  private showAvatarMaker() {
    this.dialogs.profile = false;
    this.dialogs.avatarMaker = true;
  }

  private closeModalAvatar() {
    this.dialogs.avatarMaker = false;
    this.dialogs.profile = true;
  }

  private setColor(group : object) {
    // Setting color object
    let colors = {
      nav: group.nav,
      menu: group.menu,
      menuIcons: group.menuIcons,
      navIcons: group.navIcons
    };
    this.$store.commit("setColors", colors);
    sessionStorage.setItem("colorLayout", JSON.stringify(colors));
  }

}
</script>

<style lang="scss">
.logo {
  cursor: pointer;
  width: 120px;
  height: 40px;
}

.lock-sub-img {
  background-color: #1e88e5;
  padding: 3px;
  border-radius: 50%;
  position: absolute;
  border: 4px solid #ffffff;
  left: 275px;
  top: 136px;
  cursor:pointer;
}

.img-lock {
  width: 150px;
  border-radius: 50%;
  position: absolute;
  left: calc(50% - 75px);
}

.username-profile {
  font-size: 22px;
  text-transform: uppercase;
  opacity: 0.7;
}

.profile-statistic-cards {
  height: 60px !important;
  margin-top: 20px;

  i {
    position: absolute;
    left: 7px;
    top: 17px;
  }

  .desc-label {
    font-size: 12px;
    opacity: 0.6;
    position: absolute;
    width: 100%;
    text-align: center;
    left: 0;
    top: 4px;
  }

  .data-label {
    position: absolute;
    width: 100%;
    text-align: center;
    opacity: .7;
    top: 23px;
    font-size: 19px;
  }

  .data-label-interactions-1 {
    position: absolute;
    width: 100%;
    text-align: center;
    opacity: .7;
    top: 23px;
    font-size: 19px;
    padding-left:20px;

    i {
      position: absolute;
      top: 1px;
      left: 44px;
    }

    span {
      position: relative;
      left: -25px;
    }
  }

  .data-label-interactions-2 {
    position: absolute;
    width: 100%;
    text-align: center;
    opacity: .7;
    top: 23px;
    font-size: 19px;
    padding-left:20px;

    i {
      position: absolute;
      top: 1px;
      left: 95px;   
    }

    span {
      position: relative;
      left: 24px;
    }
  } 

  .expansion-header {
    opacity: .6;
  }
}


.color-card {
  width: 85px !important;
  height: 40px !important;
  background-color: #fafafa !important;
  transition: all 0.3s;
  
  .hover-div {
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.37);
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    transition: all 0.3s;
    cursor: pointer;

    i {
      color: #fff;
      margin-top: 8px;
      margin: 10px 31px;  
    }
  }
}

.color-card:hover {
  .hover-div {
      opacity: 100;
    }
}

.nav-bar {
  width: 100%;
  height: 10px;
  z-index: 9;
  position: absolute;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.33);
}

.side-bar {
  width: 44%;
  height: 100%;
  border-top-left-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.11) 1px 2px 1px;
}

.ucontact-list {
  .v-list {
    width: 100%;  
  }

  .v-list__tile {
    padding-left: 0px !important;
    //padding-right: 20px !important;

    .v-menu {
      width: 100%;
      padding-top: 10px !important;
      padding-bottom: 10px !important;
    }
  }

  span,a  {
    width: 100% !important;
  }

  .v-list__tile:hover {
    width: 100% !important;
    //background-color: rgba(107, 107, 107, 0.384);
  }

}

.social-icon {
  width: 100%;
  height: 100%;
}

.a-light {
  text-decoration: none;
  color: #fff;
}

.a-dark {
  text-decoration: none;
  color: #000;
}

</style>
