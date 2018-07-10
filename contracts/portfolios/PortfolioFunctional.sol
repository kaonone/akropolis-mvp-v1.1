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
}
