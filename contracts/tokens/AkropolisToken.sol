/*
    Implements ERC20 token
*/

pragma solidity ^0.4.24;

import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
/**
 * @title AkropolisToken
 * @dev Akropolis ERC20 Token.
 */
contract AkropolisToken is MintableToken {

    string public name = "Akropolis Token";

    uint8 public decimals = 18;

    string public symbol = "AKT";

    string public version = 'AKT 1.0';
}