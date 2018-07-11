'use strict';
const expectThrow = require('../helpers/expectThrow');
const PortfolioData = artifacts.require('./portfolios/PortfolioData.sol');
const toBN = web3.toBigNumber;
const Code = require('code');
const expect = Code.expect;

contract('PortfolioData', function ([owner, holder, fund]) {

    let portfolioData;

    beforeEach(async function () {
        portfolioData = await PortfolioData.new();
    });


    it('should create a commitment', async function () {
        await portfolioData.createNewUserCommitment(holder, 0, web3.toWei(10, "ether"), 10, 1000, 10000);
        let commitment = await portfolioData.user_commitment(holder);
        expect(commitment[0]).to.equal(toBN(0));
        expect(commitment[1]).to.equal(toBN(web3.toWei(10, "ether")));
        expect(commitment[2]).to.equal(toBN(10));
        expect(commitment[3]).to.equal(toBN(1000));
    });

    it('should delete a commitment', async function () {
        await portfolioData.createNewUserCommitment(holder, 0, web3.toWei(10, "ether"), 10, 1000, 10000);
        await portfolioData.deleteUserCommitment(holder);
        let commitment = await portfolioData.user_commitment(holder);
        expect(commitment[0]).to.equal(toBN(0));
        expect(commitment[1]).to.equal(toBN(0));
        expect(commitment[2]).to.equal(toBN(0));
        expect(commitment[3]).to.equal(toBN(0));
    });

    it('should forbid creating a commitment for non-owners', async function () {
        await expectThrow(portfolioData.createNewUserCommitment(holder, 0, web3.toWei(10, "ether"), 10, 1000, 10000,
            {from: holder}));
    });

    it('should create allocations', async function () {
        await portfolioData.createNewUserAllocation(holder, [20, 80], [20, 80], [fund, fund]);
        let size = await portfolioData.user_allocation_size(holder);
        expect(size).to.equal(toBN(2));
        let allocation1 = await portfolioData.user_allocations(holder, 0);
        let allocation2 = await portfolioData.user_allocations(holder, 1);
        expect(allocation1[0]).to.equal(toBN(20));
        expect(allocation1[1]).to.equal(toBN(20));
        expect(allocation1[2]).to.equal(fund);
        expect(allocation2[0]).to.equal(toBN(80));
        expect(allocation2[1]).to.equal(toBN(80));
        expect(allocation2[2]).to.equal(fund);
    });

    it('should delete allocations', async function () {
        await portfolioData.createNewUserAllocation(holder, [20, 80], [20, 80], [fund, fund]);
        await portfolioData.deleteUserAllocation(holder);
        let size = await portfolioData.user_allocation_size(holder);
        expect(size).to.equal(toBN(0));
        await expectThrow(portfolioData.user_allocations(holder, 0));
    });

    it('should forbid creating allocations for non-owners', async function () {
        await expectThrow(portfolioData.createNewUserAllocation(holder, [20, 80], [20, 80], [fund, fund], {from: holder}));
    });

    it('should not create allocations when arrays are of different sizes', async function () {
        await expectThrow(portfolioData.createNewUserAllocation(holder, [20, 80], [20], [fund, fund]));
    });

    it('should not create allocations when arrays are empty', async function () {
        await expectThrow(portfolioData.createNewUserAllocation(holder, [], [], []));
    });

    it('should not create allocations when percentages do not sum to 100', async function () {
        await expectThrow(portfolioData.createNewUserAllocation(holder, [99], [1000], [fund]));
    });


});