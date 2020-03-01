function establishTrustline(tenant, manager, trustline){

    const RippleAPI = require('ripple-lib').RippleAPI;

    const api = new RippleAPI({
    server: 'wss://s1.ripple.com' // Public rippled server hosted by Ripple, Inc.
    });
    api.on('error', (errorCode, errorMessage) => {
    console.log(errorCode + ': ' + errorMessage);
    });
    api.on('connected', () => {
    console.log('connected');
    });

    // Owner sets line of trust for tenant
    const trustline = createTrustline(manager.address)
    
    //Uses the tenant address and pre-made trustline to create
    //a TrustSet. TrustSet is then signed.

    api.prepareTrustline(tenant.address, trustline).then(
        prepared => (api.sign(prepared, tenant.secret)));


    //  
    api.on('disconnected', (code) => {
    // code - [close code](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent) sent by the server
    // will be 1000 if this was normal closure
    console.log('disconnected, code:', code);
    });
    api.connect().then(() => {
    console.log("boof function call")
    }).then(() => {
    return api.disconnect();
    }).catch(console.error);
}