const AkropolisToken = artifacts.require('./tokens/AkropolisToken.sol');
const AKTFaucet = artifacts.require('./AKTFaucet.sol');
const releaser = require('../contracts/releaser');

module.exports = async function (deployer, network) {
    return deployer.deploy(AkropolisToken).then(function (token) {
        return deployer.deploy(AKTFaucet, AkropolisToken.address)
            .then(function (faucet) {
                return token.mint(AKTFaucet.address, 1000000).then(function (tx) {
                    console.log("Faucet funding tx: " + tx.tx);
                    process.deployment = {"AkropolisToken": AkropolisToken.address, "AKTFaucet": AKTFaucet.address};
                    releaser(process.deployment, network);
                });
            });
    });
};