'use strict';
const expectThrow = require('./helpers/expectThrow');
const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const AKTFaucet = artifacts.require('./AKTFaucet.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

contract('AKTFaucet', function ([owner, holder]) {

    let token, faucet;

    beforeEach(async function () {
        token = await AkropolisToken.new();
        faucet = await AKTFaucet.new(token.address);
        await token.mint(faucet.address, 10000000000);
    });

    it('should emit tokens', async function () {
        await faucet.emitAKT(holder);
        (await token.balanceOf(holder)).should.be.bignumber.equal(100);
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
        (await faucet.paused()).should.be.false;
    });
});