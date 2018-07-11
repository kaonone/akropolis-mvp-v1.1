pragma solidity ^0.4.24;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

// All the examples do not currently move any actual funds,
// they are just to demonstrate the separation of concerns
// into functional and data contracts.
contract FundData is Ownable {
    mapping(address => uint) public users_balances;

    event Created(address indexed userAccount, uint balance, address indexed authorisingAccount);
    event Deleted(address indexed userAccount, address indexed authorisingAccount);
    event Updated(address indexed userAccount, uint balance, address indexed authorisingAccount);

    function createNewBalance(address _userAddress, uint _balance) public onlyOwner {
        users_balances[_userAddress] = _balance;

        emit Created(_userAddress, _balance, _userAddress);
    }

    function addBalance(address _userAddress, uint _balanceChange) public onlyOwner {
        uint balance = users_balances[_userAddress];
        uint total = SafeMath.add(balance, _balanceChange);
        users_balances[_userAddress] = total;

        emit Updated(_userAddress, total, _userAddress);
    }

    function subtractBalance(address _userAddress, uint _balanceChange) public onlyOwner {
        uint balance = users_balances[_userAddress];
        uint total = SafeMath.sub(balance, _balanceChange);
        users_balances[_userAddress] = total;

        emit Updated(_userAddress, total, _userAddress);
    }

    function deleteBalance(address _userAddress) public onlyOwner {
        delete users_balances[_userAddress];
        emit Deleted(_userAddress, _userAddress);
    }
}

