const VextConnector = {
    install: (Vue, config = {}) => {
        Vue.prototype.$vext = {};
        // Vue.prototype.$vext.DispatchEventLocal = (event, payload) => WebUI.Call('DispatchEventLocal', event, payload);
        Vue.prototype.$vext.DispatchEventLocal = (event, payload) => {
          if (debug){
            console.log("[WebUI] Dispatching Local Event: " + event + ", payload: " );
            console.log(payload);
          }else{
            WebUI.Call('DispatchEventLocal', event, payload); // eslint-disable-line
          }
        };

        Vue.prototype.$vext.Call = (fnName) => {
          if (debug){
            console.log("[WebUI] Calling function: " + fnName)
          }else{
            WebUI.Call(fnName); // eslint-disable-line
          }
        }
    }
};

export default VextConnector;
