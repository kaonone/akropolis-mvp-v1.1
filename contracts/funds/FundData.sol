pragma solidity ^0.4.24;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

// All the examples do not currently move any actual funds,
// they are just to demonstrate the separation of concerns
// into functional and data contracts.
contract FundData is Ownable {
  mapping (address => uint) public users_balances;

  event Created(address indexed userAccount, uint balance, address indexed authorisingAccount);
  event Deleted(address indexed userAccount, address indexed authorisingAccount);
  event Updated(address indexed userAccount, uint balance, address indexed authorisingAccount);

  function createNewBalance(address _userAddress, uint _balance) public {
    require(msg.sender == owner || msg.sender == _userAddress);

    users_balances[_userAddress] = _balance;

    emit Created(_userAddress, _balance, msg.sender);
  }

  function updateBalance(address _userAddress, uint _balanceChange) public {
    require(msg.sender == owner || msg.sender == _userAddress);

    uint balance = users_balances[_userAddress];
    uint total = SafeMath.add(balance, _balanceChange);
    users_balances[_userAddress] = balance;

    emit Updated(_userAddress, total, msg.sender);
  }

  function deleteBalance(address _userAddress) public {
    require(msg.sender == owner || msg.sender == _userAddress);

    delete users_balances[_userAddress];
    emit Deleted(_userAddress, msg.sender);
  }
}

