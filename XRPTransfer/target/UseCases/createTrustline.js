function createTrustline(managerAddress){
    return {
        "currency": "USD",
        "counterparty": managerAddress,
        "limit": "10000",
    }
}