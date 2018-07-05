pragma solidity ^0.4.24;


/**
 * @title Accessible
 * @dev The Accessible contract is a bag of modifiers restricting access to contract functions
 */
contract Accessible {
    modifier onlyUser(address user) {
        require(msg.sender == user);
        _;
    }

    modifier onlyUsers(address[2] user) {
        bool authorized = false;
        for (uint8 i; i < user.length && !authorized; i++) {
            authorized = user[i] == msg.sender;
        }
        require(authorized);
        _;
    }
}