'use strict';
const expectThrow = require('../helpers/expectThrow');
const AkropolisToken = artifacts.require('./token/AkropolisToken.sol');
const PortfolioData = artifacts.require('./portfolios/PortfolioData.sol');
const PortfolioFunctional = artifacts.require('./portfolios/PortfolioFunctional.sol');
const FundData = artifacts.require('./funds/FundData.sol');
const FundFunctional = artifacts.require('./funds/FundFunctional.sol');
const toBN = web3.toBigNumber;
const Code = require('code');
const expect = Code.expect;

contract('PortfolioFunctional', function ([owner, holder, other]) {


    let portfolioFunctional, portfolioData, fundFunctional, fundData, fundAddress, token;

    beforeEach(async function () {
        token = await AkropolisToken.new();
        await token.mint(holder, 100);
        await token.mint(other, 100);
        fundData = await FundData.new();
        fundFunctional = await FundFunctional.new(fundData.address, "Test Fund");
        await fundData.transferOwnership(fundFunctional.address);
        fundAddress = fundFunctional.address;
        portfolioData = await PortfolioData.new();
        portfolioFunctional = await PortfolioFunctional.new(token.address, portfolioData.address);
        await portfolioData.transferOwnership(portfolioFunctional.address);
        await fundFunctional.transferOwnership(portfolioFunctional.address);
    });

    it('should create a portfolio with stake', async function () {
        await token.approve(portfolioFunctional.address, 100, {from: holder});
        await portfolioFunctional.createNewUserPortfolio([20, 80], [20, 80], [fundAddress, fundAddress], 0, 100, 20, 100, {
            from: holder,
            value: 100
        });
        let size = await portfolioData.user_allocation_size(holder);
        let commitment = await portfolioData.user_commitment(holder);
        expect(size).to.equal(toBN(2));
        expect(commitment[2]).to.equal(toBN(20));
        expect(await web3.eth.getBalance(portfolioFunctional.address)).to.equal(toBN(100));
        expect(await token.balanceOf(holder)).to.equal(toBN(0));
        expect(await token.balanceOf(portfolioFunctional.address)).to.equal(toBN(100));
    });

    it('should create a portfolio for a user with 0 stake', async function () {
        await portfolioFunctional.createNewUserPortfolio([20, 80], [20, 80], [fundAddress, fundAddress], 0, 100, 20, 0, {
            from: owner,
            value: 100
        });
        let size = await portfolioData.user_allocation_size(owner);
        let commitment = await portfolioData.user_commitment(owner);
        expect(size).to.equal(toBN(2));
        expect(commitment[2]).to.equal(toBN(20));
        expect(await web3.eth.getBalance(portfolioFunctional.address)).to.equal(toBN(100));
    });

    it('should fail to create a portfolio for a user without approved stake', async function () {
        await expectThrow(portfolioFunctional.createNewUserPortfolio([20, 80], [20, 80], [fundAddress, fundAddress], 0, 100, 20, 100, {
            from: owner,
            value: 100
        }));
    });

    it('should delete a portfolio with stake', async function () {
        await token.approve(portfolioFunctional.address, 100, {from: other});
        let startingETHBalance = await web3.eth.getBalance(other);
        let twoEth = web3.toWei(2, "ether");
        let eightEth = web3.toWei(8, "ether");
        let tenEth = web3.toWei(10, "ether");
        await portfolioFunctional.createNewUserPortfolio([20, 80], [twoEth, eightEth], [fundAddress, fundAddress], 0, tenEth, 20, 100, {
            from: other,
            value: tenEth
        });
        await portfolioFunctional.deleteUserPortfolio({from: other});
        let size = await portfolioData.user_allocation_size(other);
        expect(size).to.equal(toBN(0));
        let commitment = await portfolioData.user_commitment(other);
        expect(commitment[4]).to.equal(toBN(0));
        expect(await web3.eth.getBalance(portfolioFunctional.address)).to.equal(toBN(0));
        let afterDeletionBalance = await web3.eth.getBalance(other);
        let diff = web3.fromWei(startingETHBalance.toNumber() - afterDeletionBalance.toNumber(), "ether");
        expect(Math.abs(diff)).to.be.below(0.1);
        expect(await portfolioData.user_allocation_size(other)).to.equal(toBN(0));
        expect(await token.balanceOf(other)).to.equal(toBN(0));
        expect(await token.balanceOf(portfolioFunctional.address)).to.equal(toBN(100));
    });

});