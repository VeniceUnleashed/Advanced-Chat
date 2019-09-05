import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    visible: true,
    typingActive: true,
    target: "all",
    messages: [],
    displayMode: 0,
    showDisplayMode: false
  },

  getters: {
    IsVisible(store){
      return store.visible;
    },
    IsTypingActive(store){
      return store.typingActive;
    },
    GetTarget(store){
      return store.target;
    },
    GetDisplayMode(store){
      return store.displayMode;
    }
  },

  mutations: {
    EnableTyping (state, target) {
      state.typingActive = true;
      state.target = target;
    },
    DisableTyping (state) {
      state.typingActive = false;
    },
    SetMode(state, displayMod){
      state.displayMode = displayMod;
    }
  },

  actions: {
    ToggleDisplayMode({ commit, state }) {
      // TODO FoolHen: add timers for each mode
      let oldMode = state.displayMode;
      let newMode = ++oldMode;

      if (newMode >= 3) {
        newMode = 0;
      }

      commit('SetMode', newMode);
    }
  }
});
