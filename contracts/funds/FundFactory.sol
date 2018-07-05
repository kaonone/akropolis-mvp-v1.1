pragma solidity ^0.4.24;

import './FundData.sol';
import './FundFunctional.sol';
import './FundRegistry.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract FundFactory is Ownable {
    FundRegistry public fundRegistry;

    constructor() public {
        fundRegistry = new FundRegistry();
    }

    function createNewFund(address _fundOwner, string _fundName,
        uint32 _riskRating,
        int32 _pastAnnualReturns,
        uint32 _reputationRating,
        string _description) onlyOwner public returns (FundFunctional) {
        FundData fundData = new FundData();
        FundFunctional fund = new FundFunctional(fundData, _fundName);
        fundData.transferOwnership(fund);
        fund.transferOwnership(msg.sender);
        fundRegistry.createNewFund(_fundOwner, fund, _fundName, _riskRating, _pastAnnualReturns, _reputationRating,
            _description);
        return fund;
    }
}
