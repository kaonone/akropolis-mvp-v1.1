pragma solidity ^0.4.24;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract FundRegistry is Ownable {
  struct Fund {
    string name;
    address currentAddress;
    // any other needed data
  }
  mapping (address => Fund) fund_list;

  event Created(address indexed owner, string fundName, address indexed contractLocation);
  event Deleted(address indexed owner, address indexed );
  event Updated(address indexed owner, string fundName, address indexed contractLocation);
  function createNewFund(address _owner, address _contract, string _name) public onlyOwner {
    fund_list[_owner] = Fund(_name, _contract);
    emit Created(_owner, _name, _contract);
  }

  function updateFund(address _owner, address _contract) public onlyOwner {
    Fund memory fund = fund_list[_owner];
    fund.currentAddress = _contract;
    fund_list[_owner] = fund;
    emit Updated(_owner, fund.name, _contract);
  }

  function deleteFund(address _owner, address _contract) public onlyOwner {
    delete fund_list[_owner];
    emit Deleted(_owner, _contract);
  }
}
