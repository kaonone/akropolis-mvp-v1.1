'use strict';
const expectThrow = require('../helpers/expectThrow');
const AkropolisToken = artifacts.require('./AkropolisToken.sol');
const toBN = web3.toBigNumber;
const Code = require('code');
const expect = Code.expect;

contract('Akropolis Token', function ([owner, holder]) {

    let token;

    beforeEach(async function () {
        token = await AkropolisToken.new();
    });


    it('should have the correct setup', async function () {
        expect(await token.name()).to.equal("Akropolis Token");
        expect(await token.decimals()).to.equal(toBN(18));
        expect(await token.symbol()).to.equal("AKT");
        expect(await token.version()).to.equal("AKT 1.0");
    });

    it('should allow minting', async function () {
        await token.mint(holder, 100, {from: owner});

        expect(await token.balanceOf(holder)).to.equal(toBN(100));
    });

    it('should disallow minting for non-owners', async function () {
        await expectThrow(token.mint(holder, 100, {from: holder}));
    });

});