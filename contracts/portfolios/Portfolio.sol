pragma solidity ^0.4.24;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract Portfolio {
  struct Allocation {
    uint pc_of_portfolio;
    uint eth_invested;
    address fund;
  }
}
