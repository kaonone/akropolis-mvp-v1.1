'use strict';
const expectThrow = require('../helpers/expectThrow');
const FundFunctional = artifacts.require('./funds/FundFunctional.sol');
const FundData = artifacts.require('./funds/FundData.sol');
const ShareToken = artifacts.require('./tokens/ShareToken.sol');
const toBN = web3.toBigNumber;
const Code = require('code');
const expect = Code.expect;

contract('FundFunctional', function ([owner, holder]) {

    let functional, data, shares;

    beforeEach(async function () {
        data = await FundData.new();
        shares = await ShareToken.new("Fund Shares", "FSH");
        functional = await FundFunctional.new(data.address, "Fund", shares.address);
        await shares.mint(functional.address, 1000);
        await data.transferOwnership(functional.address);
        await shares.transferOwnership(functional.address);
    });


    it('should invest and transfer shares', async function () {
        await functional.invest(owner, 100, {value: 100});
        expect(await functional.getShares(owner)).to.equal(toBN(200));
    });

    it('should mint more shares if ether buys more shares than currently available', async function () {
        let balance = await shares.balanceOf(functional.address);
        let shareUnitsPerWei = await functional.shareUnitsPerWei();
        let bigAmount = (balance + 1000) / shareUnitsPerWei;
        await functional.invest(owner, bigAmount, {value: bigAmount});
        expect(await shares.balanceOf(owner)).to.equal(toBN(balance + 1000));
    });

    it('should fail if ether sent does not equal to value', async function () {
        await expectThrow(functional.invest(owner, 100, {value: 50}));
    });

    it('should divest and transfer shares from user', async function () {
        const startShareBalance = await shares.balanceOf(functional.address);
        await functional.invest(owner, 100, {value: 100});
        const userShares = await shares.balanceOf(owner);
        await shares.increaseApproval(functional.address, userShares);
        await functional.divest(owner, 100);
        expect(await shares.balanceOf(owner)).to.equal(toBN(0));
        expect(await shares.balanceOf(functional.address)).to.equal(startShareBalance);
    });

});