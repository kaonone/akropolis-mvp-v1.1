pragma solidity ^0.4.24;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './FundData.sol';

contract FundFunctional is Ownable {
    string public fundName;
    FundData public fundData;

    // Constructor
    constructor(address _fundData, string _fundName) public {
        fundName = _fundName;
        fundData = FundData(_fundData);
    }

    // Example of calling cross contract, not final business/application logic
    // should be changed when business logic is agreed.
    //
    // All the examples do not currently move any actual funds,
    // they are just to demonstrate the separation of concerns
    // into functional and data contracts.
    function invest(address _userAddress, uint _amount) public onlyOwner payable {
        fundData.addBalance(_userAddress, _amount);

        // Move money to the fund contract here
    }

    function divest(address _userAddress, uint _amount) public onlyOwner {
        fundData.subtractBalance(_userAddress, _amount);
    }
}
