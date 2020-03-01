function establishTrustline(tenant, manager){

    const RippleAPI = require('ripple-lib').RippleAPI;
    const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'});
    const instructions = {maxLedgerVersionOffset: 5};

    var tSet = createTrustline(manager.address)
    api.connect().then(() => {
        console.log('Connected...');
        return api.prepareTrustline(tenant.address, tSet, instructions).then(prepared => {
        console.log('Line of trust prepared...');
        const {signedLine} = api.sign(prepared.txJSON, tenant.secret);
        console.log('Line of trust signed...');
        api.submit(signedLine).then(quit, fail);
    });
    }).catch();
}

function createTrustline(managerAddress, tenantAddress){

   return{ "TransactionType": "TrustSet",
            "Account": tenantAddress, 
            "LimitAmount": {
            "currency": "USD",
            "issuer": managerAddress,
            "value": "100"
        }
    }
}
function recordTrustSetHash(id){
    console.log('Line set. ID: ' + id);
}


// main 
var kimball = {
    'address': 'rMNUSUDveYbSGDdLQKAzsBpmjsPDpU5TCq',
    'secret': 'ssRnQTDwKth39eTp44Wa1qDG8Qa6k',
    'balance': '1,000XRP'
}

var bob = {
    'address': 'rhr8yQA5LCjghNgcnpfYCCtsdFe5UQEQdQ',
    'secret': 'sh23q8AJXWkAmyHxtWtkCjBGooXDM',
    'balance': '1,000XRP'
}

establishTrustline(bob, kimball);