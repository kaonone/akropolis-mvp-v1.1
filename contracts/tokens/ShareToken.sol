/*
    Implements ERC20 token
*/

pragma solidity ^0.4.24;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import "zeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";
import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
/// @title Asset Interface Contract
/// @author Melonport AG <team@melonport.com>
/// @notice This is to be considered as an interface on how to access the underlying Asset Contract
/// @notice This extends the ERC20 Interface
interface SharesInterface {

    event Created(address indexed ofParticipant, uint atTimestamp, uint shareQuantity);
    event Annihilated(address indexed ofParticipant, uint atTimestamp, uint shareQuantity);

    // VIEW METHODS

    function getName() view external returns (string);
    function getSymbol() view external returns (string);
    function getDecimals() view external returns (uint);
    function getCreationTime() view external returns (uint);
    function toSmallestShareUnit(uint quantity) view external returns (uint);
    function toWholeShareUnit(uint quantity) view external returns (uint);
}
/**
 * @title ShareToken
 * @dev Akropolis Fund Share ERC20 Token.
 */
contract ShareToken is MintableToken, SharesInterface {
    using SafeMath for uint256;

    string public name;

    uint8 public decimals;

    string public symbol;

    string public version;

    uint public creationTime;

    constructor(string _name, string _symbol) public {
      name = _name;
      symbol = _symbol;
      decimals = 18;
      version = 'Shares 1.0';
      creationTime = now;
    }


    function getName() view returns (string) { return name; }
    function getSymbol() view returns (string) { return symbol; }
    function getDecimals() view returns (uint) { return decimals; }
    function getCreationTime() view returns (uint) { return creationTime; }
    function toSmallestShareUnit(uint quantity) view returns (uint) { return SafeMath.mul(quantity, 10 ** getDecimals()); }
    function toWholeShareUnit(uint quantity) view returns (uint) { return quantity / (10 ** getDecimals()); }
}

