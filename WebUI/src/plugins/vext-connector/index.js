const VextConnector = {
    install: (Vue, config = {}) => {
        Vue.prototype.$vext = {};
        // Vue.prototype.$vext.DispatchEventLocal = (event, payload) => WebUI.Call('DispatchEventLocal', event, payload);
        Vue.prototype.$vext.DispatchEventLocal = (event, payload) => {
          if (debug){
            console.log("Dispatching Local Event: " + event + ", payload: " + payload.toString())
          }else{
            WebUI.Call('DispatchEventLocal', event, payload); // eslint-disable-line
          }
        }

    }
};

export default VextConnector;
