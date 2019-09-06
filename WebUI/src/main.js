import Vue from 'vue';
import App from './App.vue';
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

/* global.ExecuteMethod = (type, payload) => {
  if (vm.$children[0][type])
    vm.$children[0][type](payload);
}; */

global.debug = window.location.href.indexOf('webui') === -1;

if (debug) {
    console.log('Running UI on debug mode');
    setTimeout(() => {
        StoreCommit('AddMessage', { author: 'FoolHen', content: 'Talking in global chat', target: 'all' });
        StoreCommit('AddMessage', { author: 'Powback', content: 'Talking in team chat', target: 'team' });
        StoreCommit('AddMessage', { author: 'snaiperskaya', content: 'Testing', target: 'squad' });
        StoreCommit('AddMessage', { author: 'Paul', content: "I'm the squad leader", target: 'squadLeader' });
        StoreCommit('AddMessage', { author: '3ti65', content: "I'm your squad member", target: 'squad' });
        StoreCommit('AddMessage', { author: 'BadGuy', content: "I'm an enemy", target: 'enemy' });
        StoreCommit('AddMessage', { author: 'Admin', content: "I'm the admin", target: 'admin' });
        StoreCommit('AddMessage', { author: 'Spectator', content: "I'm a spectator", target: 'spectator' });
    }, 1000);
}

if (process.env.NODE_ENV === 'development') {

    // Lazyload vue-devtools if we are in development in VU
    // import('@vue/devtools').then(devtools => {
    //   devtools.connect();
    // });
}

Vue.component('chat-form', ChatForm);
Vue.component('chat-message', ChatMessage);
Vue.component('chat-messages', ChatMessages);

Vue.use(VextConnectorPlugin);

global.vm = new Vue({
    el: '#app',
    render: h => h(App),
    store
});
