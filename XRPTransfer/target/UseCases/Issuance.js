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

function createPayment(source, destination){
    return{
        "source": source,
        "destination": destination,
    }
}

var destination = bundle(rob.address, '500');
var source = bundle(kimball.address, '500');

var payment = createPayment(source, destination);


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

var preparedPayment = api.preparePayment(source.address, payment).then(
                                        prepared => {console.log(prepared)});

var signedPayment = api.sign(preparedPayment, source.secret);

api.submit(signedPayment).then(value => {console.log('Payment completed. ID: ' + value)});

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