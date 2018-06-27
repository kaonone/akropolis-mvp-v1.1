'use strict';
const AkropolisToken = artifacts.require('./tokens/AkropolisToken.sol');
const AKTFaucet = artifacts.require('./AKTFaucet.sol');
const releaser = require('../contracts/releaser');

module.exports = function (deployer, network) {
    deployer.then(async () => {
        await deployer.deploy(AkropolisToken);
        await deployer.deploy(AKTFaucet, AkropolisToken.address);
        let token = await AkropolisToken.deployed();
        let tx = await token.mint(AKTFaucet.address, 1000000);
        console.log("Faucet funding tx: " + tx.tx);
        process.deployment = {"AkropolisToken": AkropolisToken.address, "AKTFaucet": AKTFaucet.address};
        await releaser(process.deployment, network);
    });
};