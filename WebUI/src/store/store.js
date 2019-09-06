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

    SetDisplayMode(state, displayMode) {
      state.displayMode = displayMode;
    },
    SetShowDisplayMode(state, showDisplayMode) {
      state.showDisplayMode = showDisplayMode;
    },
    AddMessage(state, message) {
      state.messages.push(message)
    },
    SetTypingActive(store, isActive){
      store.typingActive = isActive;
    },
    SetTarget(store, target) {
      store.target = target;
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
    },
    EnableTyping ({ commit }, target) {
      commit('SetTypingActive', true);
      commit('SetTarget', target);



      // this.ShowChatBox(-1);

      // Show both brings our UI to the front and shows it.
      vm.$vext.Call('Show');

      // Enable mouse and keyboard input.
      vm.$vext.Call('EnableKeyboard');
      vm.$vext.Call('EnableMouse');

    },
    DisableTyping ({commit}) {
      commit('SetTypingActive', false);

      // switch (this.state.display_mode)
      // {
      //   case 1:
      //     this.ShowChatbox(-1);
      //     break;
      //
      //   case 0:
      //   case 2:
      //     this.HideChatbox();
      //     break;
      // }

      // Disable mouse and keyboard input.
      vm.$vext.Call('DisableKeyboard');
      vm.$vext.DispatchEventLocal('AC:DisableMouse');
    }
  }
});
