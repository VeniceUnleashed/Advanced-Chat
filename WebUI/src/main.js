import Vue from 'vue'
import App from './App.vue'
import store from './store/store';
import ChatForm from './components/ChatForm.vue';
import ChatMessage from './components/ChatMessage';
import ChatMessages from './components/ChatMessages';
import { VextConnectorPlugin } from './plugins';

global.StoreDispatch = (type, payload) => {
  store.dispatch(type, payload);
};

global.StoreCommit = (type, payload) => {
  store.commit(type, payload);
};

global.debug = window.location.href.indexOf('webui') === -1;

if (debug) { console.log("Running UI on debug mode") }

Vue.component("chat-form", ChatForm);
Vue.component("chat-message", ChatMessage);
Vue.component("chat-messages", ChatMessages);

Vue.use(VextConnectorPlugin);

new Vue({
  el: '#app',
  render: h => h(App),
  store
})
