pragma solidity ^0.4.24;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "zeppelin-solidity/contracts/lifecycle/Destructible.sol";
import "./tokens/AkropolisToken.sol";
/**
 * @title AKTFaucet
 * @dev This contract mints AKT 100 tokens.
 * DEMO USE ONLY
 */
contract AKTFaucet is Destructible, Pausable {

    AkropolisToken private token;

    event FaucetUsed(address indexed target, uint256 amount);

    constructor (AkropolisToken akt) public {
        token = akt;
    }

    function emitAKT(address target) external whenNotPaused {
        token.increaseApproval(target, 100);
        token.transfer(target, 100);
        emit FaucetUsed(target, 100);
    }
}
