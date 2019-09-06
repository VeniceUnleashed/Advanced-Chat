const VextConnector = {
    install: (Vue, config = {}) => {
        Vue.prototype.$vext = {};
        // Vue.prototype.$vext.DispatchEventLocal = (event, payload) => WebUI.Call('DispatchEventLocal', event, payload);
        Vue.prototype.$vext.DispatchEventLocal = (event, payload) => {
            console.log('[WebUI] Dispatching Local Event: ' + event + ', payload: ');
            console.log(payload);
            if (!debug) {
                WebUI.Call('DispatchEventLocal', event, payload); // eslint-disable-line
            }
        };

        Vue.prototype.$vext.Call = (fnName) => {
            console.log('[WebUI] Calling function: ' + fnName);

            if (!debug) {
                WebUI.Call(fnName); // eslint-disable-line
            }
        };
    }
};

export default VextConnector;
