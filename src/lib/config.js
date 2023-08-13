// /* Blockchains Config */

// const blockchains = {
//     "development": {
//         "chainId": "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
//         "name": "EOS",
//         "rpcEndpoints": [{
//             "protocol": "https",
//             "host": "eos.greymass.com",
//             "port": 443
//         }, {
//             "protocol": "https",
//             "host": "eos.api.eosnation.io",
//             "port": 443
//         }, {
//             "protocol": "https",
//             "host": "api.eoseoul.io",
//             "port": 443
//         }]
//     },
//     "production": {
//         "chainId": "73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d",
//         "name": "Jungle 4 (Testnet)",
//         "rpcEndpoints": [{
//             "protocol": "https",
//             "host": "jungle4.greymass.com",
//             "port": 443
//         }]
//     }
// };

// /* Contract Accounts Config */
// const contracts = {
//     'development': 'feedurmonkey',
//     'production': 'feedmamonkey'
// };

// /* Token Contract Accounts Config */
// const tokenContracts = {
//     'development': 'banana.moon',
//     'production': 'bananatokan1'
// };

// /* Explorers Config */
// const explorers = {
//     'development': new URL('https://bloks.io'),
//     'production': new URL('https://jungle4.eosq.eosnation.io')
// };

// /* Exports */
// export const BLOCKCHAIN = blockchains[process.env.NODE_ENV];
// export const CONTRACT_NAME = contracts[process.env.NODE_ENV];
// export const TOKEN_CONTRACT_NAME = tokenContracts[process.env.NODE_ENV];
// export const EXPLORER_URL = explorers[process.env.NODE_ENV];
// export const TG_URL = new URL('https://t.me/feedyourmonkey');
// export const TWITTER_URL = new URL('https://twitter.com/feedurmonkey');




/* Blockchains Config */
const blockchains = {
    "production": {
        "chainId": "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
        "name": "EOS",
        "rpcEndpoints": [{
            "protocol": "https",
            "host": "eos.greymass.com",
            "port": 443
        }, {
            "protocol": "https",
            "host": "eos.api.eosnation.io",
            "port": 443
        }, {
            "protocol": "https",
            "host": "api.eoseoul.io",
            "port": 443
        }]
    },
    "development": {
        "chainId": "73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d",
        "name": "Jungle 4 (Testnet)",
        "rpcEndpoints": [{
            "protocol": "https",
            "host": "jungle4.greymass.com",
            "port": 443
        }]
    }
};

/* Contract Accounts Config */
const contracts = {
    'production': 'feedurmonkey',
    'development': 'feedmamonkey'
};

/* Token Contract Accounts Config */
const tokenContracts = {
    'production': 'banana.moon',
    'development': 'bananatokan1'
};

/* Explorers Config */
const explorers = {
    'production': new URL('https://bloks.io'),
    'development': new URL('https://jungle4.eosq.eosnation.io')
};

/* Exports */
export const BLOCKCHAIN = blockchains[process.env.NODE_ENV];
export const CONTRACT_NAME = contracts[process.env.NODE_ENV];
export const TOKEN_CONTRACT_NAME = tokenContracts[process.env.NODE_ENV];
export const EXPLORER_URL = explorers[process.env.NODE_ENV];
export const TG_URL = new URL('https://t.me/feedyourmonkey');
export const TWITTER_URL = new URL('https://twitter.com/feedurmonkey');