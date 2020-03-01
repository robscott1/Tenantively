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