var Remote = require('ripple-lib').Remote;

var remote = new Remote({
    trusted: false,
    local_signing: true,
    local_free: true,
    fee_cushion: 1.5,
    servers: [
        {
            host: 's1.ripple.com',
            port: 443,
            secure: true
        }
    ]
});

module.exports = remote;