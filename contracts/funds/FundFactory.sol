pragma solidity ^0.4.24;

import './FundData.sol';
import './FundFunctional.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract FundFactory is Ownable {
  function createNewFund(string _fundName) onlyOwner public returns(FundFunctional) {
    FundData fundData = new FundData();
    FundFunctional fund = new FundFunctional(fundData, _fundName);
    return fund;
  }
}
