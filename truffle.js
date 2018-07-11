/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
let HDWalletProvider = require("truffle-hdwallet-provider");
// let PrivateKeyProvider = require("truffle-privatekey-provider");
const config = require('./test-env-config.json');


module.exports = {
    networks: {
        development: {
            host: 'localhost',
            port: 8543,
            network_id: '*' // Match any network id
        },
        ci: {
            host: 'localhost',
            port: 8545,
            network_id: '*'
        },
        testenv: {
            provider: function () {
                return new HDWalletProvider(config.mnemonic, "http://akro-test.sparkbit.pl:8686")
            },
            network_id: '*' // Match any network id
        },
        // ropsten: {
        //     provider: function () {
        //         return new PrivateKeyProvider("<privKey>",
        //             "https://ropsten.infura.io/<token>")
        //     },
        //     network_id: 3,
        //     gas: 4612388
        // }
    }
};
