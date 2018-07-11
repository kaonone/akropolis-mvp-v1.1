pragma solidity ^0.4.24;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './FundData.sol';
import '../tokens/ShareToken.sol';

contract FundFunctional is Ownable {
  // Due to Ownership chain, the FundFunctional contract is "owned" by
  // the PortfolioFunctional contract, and thus is callable from there
  // As the functions in the PortfolioFunctional contract require the
  // caller to be the user, the functions here are only callable by the
  // end user.
  string public fundName;
  FundData public fundData;
  ShareToken public shares;

  // Constructor
  constructor(address _fundData, string _fundName, address _shares) public {
    fundName = _fundName;
    fundData = FundData(_fundData);
    shares = ShareToken(_shares);
  }

  // Example of calling cross contract, not final business/application logic
  // should be changed when business logic is agreed.
  //
  // All the examples do not currently move any actual funds,
  // they are just to demonstrate the separation of concerns
  // into functional and data contracts.
  function invest(address _userAddress, uint _amount) public onlyOwner payable {
    fundData.updateBalance(_userAddress, _amount);

    // Move money to the fund contract here
  }
}
