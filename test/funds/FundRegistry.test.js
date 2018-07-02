'use strict';
const expectThrow = require('../helpers/expectThrow');
const FundRegistry = artifacts.require('./funds/FundRegistry.sol');
const toBN = web3.toBigNumber;
const Code = require('code');
const expect = Code.expect;

contract('FundRegistry', function ([owner, holder]) {

    let registry;

    beforeEach(async function () {
        registry = await FundRegistry.new();
    });


    it('should zero funds on creation', async function () {
        expect(await registry.getFundCount()).to.equal(toBN(0));
    });

    it('should allow for adding a fund', async function () {
        await registry.createNewFund(owner, owner, "TEST1", {from: owner});
        expect(await registry.getFundCount()).to.equal(toBN(1));
    });

    it('should disallow adding funds by non-owners', async function () {
        expectThrow(registry.createNewFund(owner, owner, "TEST1", {from: holder}));
    });

    it('should return fund by name', async function () {
        let name = "TEST2";
        await registry.createNewFund(owner, owner, name, {from: owner});
        let tuple = await registry.getFund(name, {from: owner});
        expect(tuple[0]).to.equal(name);
        expect(tuple[1]).to.equal(owner);
        expect(await registry.getFundCount()).to.equal(toBN(1));
    });

    it('should return fund by index', async function () {
        let name = "TEST2";
        await registry.createNewFund(owner, owner, name, {from: owner});
        let tuple = await registry.getFundAt(0);
        expect(tuple[0]).to.equal(name);
        expect(tuple[1]).to.equal(owner);
        expect(await registry.getFundCount()).to.equal(toBN(1));
    });

});