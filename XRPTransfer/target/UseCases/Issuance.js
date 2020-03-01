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