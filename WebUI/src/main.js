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

/*global.ExecuteMethod = (type, payload) => {
  if (vm.$children[0][type])
    vm.$children[0][type](payload);
};*/

global.debug = window.location.href.indexOf('webui') === -1;

if (debug) {
  console.log("Running UI on debug mode");
  setTimeout( () => {
    StoreCommit('AddMessage',{author: "FoolHen", content: "sup", target: "all"});
    StoreCommit('AddMessage',{author: "Powback", content: "heyy", target: "team"});
    StoreCommit('AddMessage',{author: "Paul", content: "testing", target: "squad"});
    StoreCommit('AddMessage',{author: "3ti65", content: ":)", target: "squad"});
    StoreCommit('AddMessage',{author: "BadGuy", content: "hi", target: "enemy"});
    StoreCommit('AddMessage',{author: "BadderGuy", content: "nice", target: "enemy"});
    StoreCommit('AddMessage',{author: "BadestGuy", content: "lol", target: "enemy"});
  }, 1000);
}

Vue.component("chat-form", ChatForm);
Vue.component("chat-message", ChatMessage);
Vue.component("chat-messages", ChatMessages);

Vue.use(VextConnectorPlugin);

global.vm = new Vue({
  el: '#app',
  render: h => h(App),
  store
});

