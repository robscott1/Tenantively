var kimball = {
    'address': 'rMNUSUDveYbSGDdLQKAzsBpmjsPDpU5TCq',
    'secret': 'ssRnQTDwKth39eTp44Wa1qDG8Qa6k',
    'balance': '1,000XRP'
}

var rob = {
    'address': 'rHGVnJZbiEmfbpdffeNiTksutrVxGv47Ce',
    'secret': 'shHWy28u2pcrUpP3E9SAXzuHnZHFb',
    'balance': '1,000XRP'
}

function bundle(address, amount){
    return {
        "address": address,
        "maxAmount": amount,
    }
}

class Payment{
    constructor(source, destination){
        this.source = source;
        this.source = destination;
    }
}

var destination = bundle(rob.address, '500');
var source = bundle(kimball.address, '500');

var payment = new Payment(source, destination);


const RippleAPI = require('ripple-lib').RippleAPI;
/*
const api = new RippleAPI({
server: 'wss://s1.ripple.com' // Public rippled server hosted by Ripple, Inc.
});
api.connect('error', (errorCode, errorMessage) => {
console.log(errorCode + ': ' + errorMessage);
});
api.on('connected', () => {
console.log('connected');
});
*/
console.log('Payment: ' + payment);

var transactionSeed = {
    "source": {
        "address" : kimball.address,
        "maxAmount": {
            "value" : "1.00",
            "currency": "USD",
        }
    
    },
    "destination": {
        "address": rob.address,
        "amount": {
            "value": "1.00",
            "currency": "USD",
        }
    }
}


const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'});
api.connect().then(() => {
    console.log('Connected...');
    return api.preparePayment(kimball.address, transactionSeed).then(prepared => {
      console.log('Payment transaction prepared...');
      const {signedTransaction} = api.sign(prepared.txJSON, kimball.secret);
      console.log('Payment transaction signed...');
      api.submit(signedTransaction).then(quit, fail);
    });
  }).catch();