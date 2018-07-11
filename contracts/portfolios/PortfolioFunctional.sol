pragma solidity ^0.4.24;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import '../funds/FundFunctional.sol';
import '../tokens/AkropolisToken.sol';
import './Portfolio.sol';
import './PortfolioData.sol';
import "../Accesible.sol";

contract PortfolioFunctional is Accessible, Ownable, Portfolio {
    using SafeMath for uint256;
    PortfolioData public portfolioData;
    AkropolisToken private token;

    // Constructor
    constructor(address _aktToken, address _portfolioData) public {
        portfolioData = PortfolioData(_portfolioData);
        token = AkropolisToken(_aktToken);
    }

    function createNewUserPortfolio(
        uint[] _percent,
        uint[] _investmentAmounts,
        address[] _funds,
        Period _period,
        uint256 _amountToPay,
        uint256 _durationInYears,
        uint256 _aktStake
    ) payable public {
        address _userAddress = msg.sender;
        require(_funds.length == _percent.length && _funds.length == _investmentAmounts.length);
        require(_funds.length > 0);
        uint256 allowance = token.allowance(_userAddress, this);
        require(allowance >= _aktStake, "Stake not approved for transfer");

        uint sumOfPercent = 0;
        uint256 amount = 0;
        for (uint i = 0; i < _percent.length; i++) {
            sumOfPercent += _percent[i];
            amount += _investmentAmounts[i];
        }
        require(sumOfPercent == 100);
        require(amount == msg.value);
        require(_amountToPay == msg.value);
        require(token.transferFrom(_userAddress, this, _aktStake));

        for (i = 0; i < _funds.length; i++) {
            FundFunctional fund = FundFunctional(_funds[i]);
            fund.invest(_userAddress, _investmentAmounts[i]);
        }
        portfolioData.createNewUserAllocation(_userAddress, _percent, _investmentAmounts, _funds);
        portfolioData.createNewUserCommitment(_userAddress, _period, _amountToPay, _durationInYears, _aktStake, block.timestamp);
    }

    function deleteUserPortfolio() public {
        address _userAddress = msg.sender;
        uint allocationSize = portfolioData.user_allocation_size(_userAddress);
        require(allocationSize > 0, "No user allocation found");
        uint256 createdAt = 0;
        (, createdAt) = portfolioData.user_commitment(_userAddress);
        require(createdAt > 0, "No user allocation found");
        uint256 sumOfInvestedETH = 0;
        for (uint i = 0; i < allocationSize; i++) {
            uint percent_of_portfolio;
            uint eth_invested;
            address fundAddress;
            (percent_of_portfolio, eth_invested, fundAddress) = portfolioData.user_allocations(_userAddress, i);
            FundFunctional fund = FundFunctional(fundAddress);
            fund.divest(_userAddress, eth_invested);
            sumOfInvestedETH += eth_invested;
        }

        portfolioData.deleteUserAllocation(_userAddress);
        portfolioData.deleteUserCommitment(_userAddress);
        _userAddress.transfer(sumOfInvestedETH);
    }
}
