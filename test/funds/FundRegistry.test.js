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
        await registry.createNewFund(owner, owner, "TEST1", 0, 0, 0, "Test", {from: owner});
        expect(await registry.getFundCount()).to.equal(toBN(1));
    });

    it('should disallow adding funds by non-owners', async function () {
        await expectThrow(registry.createNewFund(owner, owner, "TEST1", 0, 0, 0, "Test", {from: holder}));
    });

    it('should return fund by name', async function () {
        let name = "TEST2";
        await registry.createNewFund(owner, owner, name, 0, 0, 0, "Test", {from: owner});
        let idx = await registry.getFundIndex(name, {from: holder});
        let tuple = await registry.funds(idx, {from: holder});
        expect(tuple[0]).to.equal(name);
        expect(tuple[1]).to.equal(owner);
        expect(await registry.getFundCount({from: holder})).to.equal(toBN(1));
    });

    it('should return fund by index', async function () {
        let name = "TEST2";
        await registry.createNewFund(owner, owner, name, 0, 0, 0, "Test", {from: owner});
        let tuple = await registry.funds(0, {from: holder});
        expect(tuple[0]).to.equal(name);
        expect(tuple[1]).to.equal(owner);
        expect(await registry.getFundCount({from: holder})).to.equal(toBN(1));
    });

    it('should allow for updating a fund', async function () {
        await registry.createNewFund(owner, owner, "TEST1", 0, 0, 0, "Test", {from: owner});
        let idx = await registry.getFundIndex("TEST1");
        let fund = await registry.funds(idx);
        let newDescription = "This is a really good investment";
        await registry.updateFund(fund[7], owner, fund[1], 100, -5, 10, newDescription,
            {from: owner});
        idx = await registry.getFundIndex("TEST1");
        let fundAfterUpdate = await registry.funds(idx);
        expect(fundAfterUpdate[3]).to.equal(toBN(100));
        expect(fundAfterUpdate[4]).to.equal(toBN(-5));
        expect(fundAfterUpdate[5]).to.equal(toBN(10));
        expect(fundAfterUpdate[6]).to.equal(newDescription);
    });

    it('should forbid non-owners from updating a fund', async function () {
        await registry.createNewFund(owner, owner, "TEST1", 0, 0, 0, "Test", {from: owner});
        let idx = await registry.getFundIndex("TEST1");
        let fund = await registry.funds(idx);
        let newDescription = "This is a really good investment";
        await expectThrow(registry.updateFund(idx, owner, fund[1], 100, -5, 10, newDescription,
            {from: holder}));
    });
});