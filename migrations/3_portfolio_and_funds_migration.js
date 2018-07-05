'use strict';

const AkropolisToken = artifacts.require('./tokens/AkropolisToken.sol');
const FundFactory = artifacts.require('./funds/FundFactory.sol');
const FundFunctional = artifacts.require('./funds/FundFunctional.sol');
const FundRegistry = artifacts.require('./funds/FundRegistry.sol');
const PortfolioData = artifacts.require('./portfolios/PortfolioData.sol');
const PortfolioFunctional = artifacts.require('.portfolios/PortfolioFunctional.sol');
const releaser = require('../contracts/releaser');

module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        let owner = accounts[0];
        await deployer.deploy(PortfolioData);
        await deployer.deploy(PortfolioFunctional, AkropolisToken.address, PortfolioData.address);
        (await PortfolioData.deployed()).transferOwnership(PortfolioFunctional.address);
        await deployer.deploy(FundFactory);
        let factory = await FundFactory.deployed();
        let registry = FundRegistry.at(await factory.fundRegistry());
        await factory.createNewFund(owner, "S&P500 Index", 100, 20, 50, "S&P500 index, capital + dividends", {from: owner});
        await factory.createNewFund(owner, "Gold Investment", 20, 7, 80, "London gold fix in USD", {from: owner});
        await factory.createNewFund(owner, "US State Bonds", 5, 3, 100, "US 10-year Treasury Bonds", {from: owner});

        let count = await registry.getFundCount();
        let funds = [];
        for (let i = 0; i < count; i++) {
            let f = await registry.funds(i);
            FundFunctional.at(f[2]).transferOwnership(PortfolioFunctional.address);
            funds.push();
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
