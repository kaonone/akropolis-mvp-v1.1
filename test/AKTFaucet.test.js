'use strict';
const expectThrow = require('./helpers/expectThrow');
const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const AKTFaucet = artifacts.require('./AKTFaucet.sol');

const toBN = web3.toBigNumber;
const Code = require('code');
const expect = Code.expect;


contract('AKTFaucet', function ([owner, holder]) {

    let token, faucet;

    beforeEach(async function () {
        token = await AkropolisToken.new();
        faucet = await AKTFaucet.new(token.address);
        await token.mint(faucet.address, 10000000000);
    });

    it('should emit tokens', async function () {
        await faucet.emitAKT(holder);
        expect((await token.balanceOf(holder))).to.equal(toBN(100));
    });

    it('should NOT emit tokens when paused', async function () {
        await faucet.pause();
        await expectThrow(faucet.emitAKT(holder));
    });

    it('should by only pausable by owner', async function () {
        await expectThrow(faucet.pause({from: holder}));
    });

    it('should be unpausable', async function () {
        await faucet.pause();
        await faucet.unpause();
        expect((await faucet.paused())).to.be.false();
    });
});