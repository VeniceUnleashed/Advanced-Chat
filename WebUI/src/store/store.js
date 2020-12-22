import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        visible: false,
        typingActive: false,
        target: 'all',
        messages: [],
        displayMode: 0,
        showDisplayMode: false,
        hideTimeOut: null,
        modeTimeOut: null
    },

    getters: {
        IsVisible (store) {
            return store.visible;
        },
        IsTypingActive (store) {
            return store.typingActive;
        },
        IsDisplayModeShown (store) {
            return store.showDisplayMode;
        },
        GetTarget (store) {
            return store.target;
        },
        GetDisplayMode (store) {
            return store.displayMode;
        },
        GetHideTimeOut (store) {
            return store.hideTimeOut;
        },
        GetModeTimeOut (store) {
            return store.modeTimeOut;
        },
        GetMessages (store) {
            return store.messages;
        }
    },

    mutations: {
        SetVisible (state, visible) {
            state.visible = visible;
        },
        SetDisplayMode (state, displayMode) {
            state.displayMode = displayMode;
        },
        SetShowDisplayMode (state, showDisplayMode) {
            state.showDisplayMode = showDisplayMode;
        },
        AddMessage (state, message) {
            state.messages.push(message);
        },
        SetTypingActive (store, isActive) {
            store.typingActive = isActive;
        },
        SetTarget (store, target) {
            store.target = target;
        },
        SetHideTimeOut (store, hideTimeOut) {
            store.hideTimeOut = hideTimeOut;
        },
        SetModeTimeOut (store, modeTimeOut) {
            store.modeTimeOut = modeTimeOut;
        }
    },

    actions: {
        ToggleDisplayMode ({ commit, getters, dispatch }) {
            let oldMode = getters.GetDisplayMode;
            let newMode = ++oldMode;

            if (newMode >= 3) {
                newMode = 0;
            }

            switch (newMode) {
            case 0:
                break;

            case 1:
                dispatch('ShowChatBox', -1);
                break;

            case 2:
                if (!getters.IsTypingActive) { dispatch('HideChatBox'); }
                break;
            }

            commit('SetDisplayMode', newMode);
            commit('SetShowDisplayMode', true);

            // Update display mode timeout
            if (getters.GetModeTimeOut !== null) {
                clearTimeout(getters.GetModeTimeOut);
                commit('SetModeTimeOut', null);
            }

            commit('SetModeTimeOut', setTimeout(() => { commit('SetShowDisplayMode', false); }, 2500));
        },

        OnMessage ({ commit, getters, dispatch }, message) {
            commit('AddMessage', message);

            if (getters.IsTypingActive) return;

            switch (getters.GetDisplayMode) {
            // Popout
            case 0:
                dispatch('ShowChatBox', 5000);
                break;

                // Always Show
            case 1:
                dispatch('ShowChatBox', -1);
                break;

                // Hidden
            case 2:
                break;
            }
        },

        EnableTyping ({ commit, dispatch }, target) {
            commit('SetTypingActive', true);
            commit('SetTarget', target);

            dispatch('ShowChatBox', -1);

            // Show both brings our UI to the front and shows it.
            WebUI.Call('Show');

            // Enable mouse and keyboard input.
            WebUI.Call('EnableKeyboard');
            WebUI.Call('DispatchEventLocal', 'AC:EnableMouse');
        },

        DisableTyping ({ commit, dispatch, getters }) {
            commit('SetTypingActive', false);

            switch (getters.GetDisplayMode) {
            case 1:
                dispatch('ShowChatBox', -1);
                break;

            case 0:
            case 2:
                dispatch('HideChatBox');
                break;
            }

            // Disable mouse and keyboard input.
            WebUI.Call('DisableKeyboard');
            WebUI.Call('SendToBack');
            WebUI.Call('DispatchEventLocal', 'AC:DisableMouse');
        },

        ShowChatBox ({ commit, dispatch, getters }, timeOut) {
            commit('SetVisible', true);
            console.log(getters.GetHideTimeOut);

            if (getters.GetHideTimeOut !== null) {
                clearTimeout(getters.GetHideTimeOut);
                commit('SetHideTimeOut', null);
            }

            if (timeOut >= 0) {
                commit('SetHideTimeOut', setTimeout(function () { dispatch('HideChatBox'); }, timeOut));
            }
        },

        HideChatBox ({ commit, getters }) {
            commit('SetVisible', false);

            if (getters.GetHideTimeOut !== null) {
                clearTimeout(getters.GetHideTimeOut);
                commit('SetHideTimeOut', null);
            }
        }
    }
});
