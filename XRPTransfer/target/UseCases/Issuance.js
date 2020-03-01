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

const RippleAPI = require('ripple-lib').RippleAPI;

const instructions = {maxLedgerVersionOffset: 5};
const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'});

const payment = {
  source: {
    address: kimball.address,
    maxAmount: {
      value: '0.01',
      currency: 'XRP'
    }
  },
  destination: {
    address: rob.address,
    amount: {
      value: '0.01',
      currency: 'XRP'
    }
  }
};

function quit(message) {
  console.log(message);
  process.exit(0);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

api.connect().then(() => {
  console.log('Connected...');
  return api.preparePayment(kimball.address, payment, instructions).then(prepared => {
    console.log('Payment transaction prepared...');
    const {signedTransaction} = api.sign(prepared.txJSON, kimball.secret);
    console.log('Payment transaction signed...');
    api.submit(signedTransaction).then(quit, fail);
  });
}).catch(fail);