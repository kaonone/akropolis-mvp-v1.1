pragma solidity ^0.4.24;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import '../funds/FundFunctional.sol';
import './Portfolio.sol';
import './PortfolioData.sol';

contract PortfolioFunctional is Ownable, Portfolio {
  PortfolioData public portfolioData;

  // Constructor
  constructor(address _portfolioData) public {
    portfolioData = PortfolioData(_portfolioData);
  }

  // Quick example showing the interaction between them
  // _fund address(es) should always link to the
  // fundFunctional contract not the fundData contract
  // of the fund in question.
  //
  // All the examples do not currently move any actual funds,
  // they are just to demonstrate the separation of concerns
  // into functional and data contracts.
  function createNewUserPortfolio(address _userAddress, address[] _funds, uint[] _pc, uint[] _investmentAmounts) public {
    require(tx.origin == owner || tx.origin == _userAddress);

    // Needs rest of portfolio flow in theory, just abstracting out
    // the parts not dealing with the data contract for now

    // Iterates over all the funds for the new portfolio and calls
    // their invest functionality, I believe plan for the future is
    // to have an invest() function in the PortfolioFunctional
    // contract so would make sense to call that instead.
    for (uint i = 0; i < _funds.length; i++) {
      FundFunctional fund = FundFunctional(_funds[i]);

      fund.invest(_userAddress, _investmentAmounts[i]);
    }

    portfolioData.createNewUserAllocation(_userAddress, _pc, _investmentAmounts, _funds);
  }
}
