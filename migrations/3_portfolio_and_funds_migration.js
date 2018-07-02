'use strict';

const FundFactory = artifacts.require('./funds/FundFactory.sol');
const FundRegistry = artifacts.require('./funds/FundRegistry.sol');
const PortfolioData = artifacts.require('./portfolios/PortfolioData.sol');
const PortfolioFunctional = artifacts.require('.portfolios/PortfolioFunctional.sol');
const releaser = require('../contracts/releaser');

module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        let owner = accounts[0];
        await deployer.deploy(PortfolioData);
        await deployer.deploy(PortfolioFunctional, PortfolioData.address);
        await deployer.deploy(FundFactory);
        let factory = await FundFactory.deployed();
        let registry = FundRegistry.at(await factory.fundRegistry());
        await factory.createNewFund(owner, "Crude Oil Fund", {from: owner});
        await factory.createNewFund(owner, "Gold Investment", {from: owner});
        await factory.createNewFund(owner, "US State Bonds", {from: owner});
        let count = await registry.getFundCount();
        let funds = [];
        for (let i = 0; i < count; i++) {
            funds.push(await registry.getFundAt(i));
        }
        process.deployment = {
            "PortfolioData": PortfolioData.address,
            "PortfolioFunctional": PortfolioFunctional.address,
            "FundFactory": FundFactory.address,
            "FundRegistry": registry.address,
            "deployedFunds": funds
        };
        await releaser(process.deployment, network);
    });
};