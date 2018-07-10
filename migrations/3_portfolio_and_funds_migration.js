'use strict';

const AkropolisToken = artifacts.require('./tokens/AkropolisToken.sol');
const FundFactory = artifacts.require('./funds/FundFactory.sol');
const FundFunctional = artifacts.require('./funds/FundFunctional.sol');
const FundRegistry = artifacts.require('./funds/FundRegistry.sol');
const PortfolioData = artifacts.require('./portfolios/PortfolioData.sol');
const PortfolioFunctional = artifacts.require('.portfolios/PortfolioFunctional.sol');
const ShareToken = artifacts.require('.tokens/ShareToken.sol');
const releaser = require('../contracts/releaser');

module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        let owner = accounts[0];
        await deployer.deploy(PortfolioData);
        await deployer.deploy(PortfolioFunctional, AkropolisToken.address, PortfolioData.address);
        (await PortfolioData.deployed()).transferOwnership(PortfolioFunctional.address);
        await deployer.deploy(FundRegistry);
        let registry = await FundRegistry.deployed();
        await deployer.deploy(FundFactory, FundRegistry.address);
        registry.transferOwnership(FundFactory.address);
        let factory = await FundFactory.deployed();
        let shares1 = await deployer.deploy(ShareToken, "S&P500 index, capital + dividends", "SP500");

        await shares1.transferOwnership(FundFactory.address);
        await factory.createNewFund(owner, "CBOE Bitcoin Trust", 100, 20, 38,
            "A leading cryptocurrency ETF offering accessible liquidity and robust custody. Capital at risk.",
            shares1.address, {from: owner});

        let shares2 = await deployer.deploy(ShareToken, "London gold fix in USD", "GI");
        await shares2.transferOwnership(FundFactory.address);
        await factory.createNewFund(owner, "NestEgg Cryptographic Principal Protected Note", 20, 7, 48,
            "Offers flexible income options with insured downside protection with capped upside.",
            shares2.address, {from: owner});

        let shares3 = await deployer.deploy(ShareToken, "US 10-year Treasury Bonds", "USSB");
        await shares3.transferOwnership(FundFactory.address);
        await factory.createNewFund(owner, "Asia Real Asset Income Fund", 5, 3, 43,
            "Tokenised real asset fund offering security and utility.",
            shares3.address, {from: owner});


        let count = await registry.getFundCount();
        let funds = [];
        for (let i = 0; i < count; i++) {
            let f = await registry.funds(i);
            FundFunctional.at(f[2]).transferOwnership(PortfolioFunctional.address);
            funds.push(f);
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
