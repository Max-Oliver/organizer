import Vue from 'vue';
import './plugins/vuetify';
import App     from './App.vue';
import router  from './router';
// import store   from './store';
import VueI18n from 'vue-i18n';
import Locale  from './locale';
import VuexPersist from 'vuex-persist';
import Vuex from 'vuex';

Vue.use(VueI18n);
Vue.use(Vuex);

const i18n = new VueI18n({
  locale: 'es', // set locale
  messages : {
    en: Locale.en,
    es: Locale.es,
  }
});

const vuexSessionStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.sessionStorage // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

const store = new Vuex.Store({
    state: {
    drawer: {
      left: false,
      right: false
    },
    settings: {},
    userInfo: null, //if null - hide toolbar & leftSideMenu
    phone: {
      status: 'UNREGISTERED',
    },
    theme: {
      dark: false,
      colors: { nav: '#fff', navIcons: '#676767', menu: '#fff', menuIcons: '#676767' },
    },
    showLockScreen: false,
  },
  mutations: {
    setSettings(state, settings) {
      state.settings = settings;
    },

    setUserInfo(state, user) {
        state.userInfo = user;
    },

    setTheme(state, dark) {
      state.theme.dark = dark;
    },

    setColors(state, colors) {
      state.theme.colors.nav = colors.nav;
      state.theme.colors.menu = colors.menu;
      state.theme.colors.menuIcons = colors.menuIcons;
      state.theme.colors.navIcons = colors.navIcons;
    },

    setLeftDrawer(state,drawer) {
      state.drawer.left = drawer;
    },

    setRightDrawer(state,drawer) {
      state.drawer.right = drawer;
    }
  },

  actions: {

  },
  plugins: [vuexSessionStorage.plugin]
});



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
