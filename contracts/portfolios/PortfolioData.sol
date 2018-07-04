pragma solidity ^0.4.24;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './Portfolio.sol';

contract PortfolioData is Ownable, Portfolio {
  // Only functions needed in this contract are the basic
  // CRUD functionality (create, read, update, delete)
  // these have been written to keep as simple as possible
  // to prevent need for future changes. They do not handle
  // any application logic, they purely take in the processed
  // values and set them to the user_allocations mapping.
  //
  // There are also several events to create a clear audit trail
  // of all changes made (Created, Updated, Deleted) which will
  // log the address modified, the value set (in created and updated)
  // and the account which authorised the transaction (which should
  // only ever be either the account in question or the owner of this
  // data contract).
  //
  // All the examples do not currently move any actual funds,
  // they are just to demonstrate the separation of concerns
  // into functional and data contracts.

  event Created(address indexed userAccount, Allocation[] valueSet, address indexed authorisingAccount);
  event Deleted(address indexed userAccount, address indexed authorisingAccount);
  event Updated(address indexed userAccount, Allocation[] valueSet, address indexed authorisingAccount);

  mapping(address => Allocation[]) public user_allocations;

  function createNewUserAllocation(address _userAddress, uint[] _pc, uint[] _eth, address[] _fund) public {
    require(tx.origin == owner || tx.origin == _userAddress);
    require(_pc.length == _eth.length && _pc.length == _fund.length);
    Allocation[] memory array;
    for (uint i = 0; i < _pc.length; i++) {
      array[i] = Allocation(_pc[i], _eth[i], _fund[i]);
      user_allocations[_userAddress][i] = Allocation(_pc[i], _eth[i], _fund[i]);
    }
    emit Created(_userAddress, array, tx.origin);
  }

  function updateUserAllocation(address _userAddress, uint[] _pc, uint[] _eth, address[] _fund) public {
    require(tx.origin == owner || tx.origin == _userAddress);
    require(_pc.length == _eth.length && _pc.length == _fund.length);
    Allocation[] memory array;
    for (uint i = 0; i < _pc.length; i++) {
      array[i] = Allocation(_pc[i], _eth[i], _fund[i]);
      user_allocations[_userAddress][i] = Allocation(_pc[i], _eth[i], _fund[i]);
    }
    emit Updated(_userAddress, array, msg.sender);
  }

  function deleteUserAllocation(address _userAddress) public {
    require(tx.origin == owner || tx.origin == _userAddress);
    delete user_allocations[_userAddress];
    emit Deleted(_userAddress, tx.origin);
  }
}
