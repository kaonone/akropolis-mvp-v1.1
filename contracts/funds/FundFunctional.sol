pragma solidity ^0.4.24;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './FundData.sol';
import '../tokens/ShareToken.sol';

contract FundFunctional is Ownable {
    using SafeMath for uint256;
    string public fundName;
    FundData public fundData;
    ShareToken public shares;
    uint256 public shareUnitsPerWei = 2;

    // Constructor
    constructor(address _fundData, string _fundName, address _shares) public {
        fundName = _fundName;
        fundData = FundData(_fundData);
        shares = ShareToken(_shares);
    }

    // Example of calling cross contract, not final business/application logic
    // should be changed when business logic is agreed.
    function invest(address _userAddress, uint256 _amount) public onlyOwner payable {
        require(_amount == msg.value);
        uint256 shareCount = shareUnitsPerWei * msg.value;
        assertEnoughShares(shareCount);
        fundData.addBalance(_userAddress, _amount);
        shares.transfer(_userAddress, shareCount);
    }

    function assertEnoughShares(uint256 shareUnits) private {
        uint256 totalShareUnits = shares.balanceOf(this);
        if (totalShareUnits < shareUnits) {
            shares.mint(this, shareUnits - totalShareUnits);
        }
    }

    function divest(address _userAddress, uint _amount) public onlyOwner {
        uint256 shareCount = shareUnitsPerWei * _amount;
        require(shares.allowance(_userAddress, this) == shareCount);
        fundData.subtractBalance(_userAddress, _amount);
        _userAddress.transfer(_amount);
        shares.transferFrom(_userAddress, this, _amount * shareUnitsPerWei);
    }

    function getShares(address _userAddress) public view returns (uint256) {
        return shares.balanceOf(_userAddress);
    }
}
