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
    IsDisplayModeShown(store){
      return store.showDisplayMode;
    },
    GetTarget(store){
      return store.target;
    },
    GetDisplayMode(store){
      return store.displayMode;
    },
    GetMessages(store) {
      return store.messages;
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
    SetDisplayMode(state, displayMode) {
      state.displayMode = displayMode;
    },
    SetShowDisplayMode(state, showDisplayMode) {
      state.showDisplayMode = showDisplayMode;
    },
    AddMessage(state, message) {
      state.messages.push(message)
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

      commit('SetDisplayMode', newMode);
      commit('SetShowDisplayMode', true);

      state.showDisplayMode = true;
      setTimeout(() => {
        commit('SetShowDisplayMode', false);
      }, 2500)
    },
    OnMessage({ commit }, message){
      // commit('AddMessage', message)
    }
  }
});
