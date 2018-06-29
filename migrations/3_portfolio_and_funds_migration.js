'use strict';

const FundFactory = artifacts.require('./funds/FundFactory.sol');
const PortfolioData = artifacts.require('./portfolios/PortfolioData.sol');
const PortfolioFunctional = artifacts.require('.portfolios/PortfolioFunctional.sol');
const releaser = require('../contracts/releaser');

module.exports = (deployer, network) => {
  deployer.then(async () => {
    await deployer.deploy(PortfolioData);
    await deployer.deploy(PortfolioFunctional, PortfolioData.address);
    // deploying 3 funds for demonstration
    await deployer.deploy(FundFactory);

    let factory = await FundFactory.deployed();
    let fundA = factory.createNewFund("test 1");
    let fundB = factory.createNewFund("test 2");
    let fundC = factory.createNewFund("test 3");

    process.deployment = {
      "PortfolioData": PortfolioData.address,
      "PortfolioFunctional": PortfolioFunctional.address,
      "FundFactory": FundFactory.address,
      "fundA": fundA.address,
      "fundB": fundB.address,
      "fundC": fundC.address
    };

    await releaser(process.deployment, network);
  });
};
