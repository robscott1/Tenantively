function establishTrustline(tenant, manager){

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
    var trustline = createTrustline(manager.address)
    
    //Uses the tenant address and pre-made trustline to create
    //a TrustSet. TrustSet is then signed.

    console.log(trustline);

    var trustSet = api.prepareTrustline(tenant.address, trustline).then(prepare => console.log(prepare));

    console.log(trustSet);
    var signedSet = api.sign(trustSet, tenant.secret);

    // this dot notation could possibly totally not work
    const id = api.submit(signedSet.signedTransaction).then(id => console.log(id));

    recordTrustSetHash(id.id);

    api.on('disconnected', (code) => {
    // code - [close code](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent) sent by the server
    // will be 1000 if this was normal closure
    console.log('disconnected, code:', code);
    })
    api.connect().then(() => {
    console.log('boof function call')
    }).then(() => {
    return api.disconnect();
    }).catch(console.error);
}

function createTrustline(managerAddress){
    return new Trustline(managerAddress);
}

function recordTrustSetHash(id){
    console.log('Line set. ID: ' + id);
}

class Trustline{
    constructor(managerAddress){
        this.currency = 'USD';
        this.counterparty = managerAddress;
        this.limit = '1000XRP';
    }
}

// main 
var huncho = {
    'address': 'rM1MBnWHzQRXNYcTnHdUKANwxRSyBSYVS7',
    'secret': 'ssKNXjWotkuzv5shQrhrqPSKMhvNh',
    'balance': '1,000XRP'
}

var bob = {
    'address': 'rhr8yQA5LCjghNgcnpfYCCtsdFe5UQEQdQ',
    'secret': 'sh23q8AJXWkAmyHxtWtkCjBGooXDM',
    'balance': '1,000XRP'
}

establishTrustline(bob, huncho);

