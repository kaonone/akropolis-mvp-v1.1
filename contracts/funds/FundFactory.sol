pragma solidity ^0.4.24;

import './FundData.sol';
import './FundFunctional.sol';
import './FundRegistry.sol';
import '../tokens/ShareToken.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract FundFactory is Ownable {
    FundRegistry public fundRegistry;

    constructor(address fundRegistryAddress) public {
        fundRegistry = FundRegistry(fundRegistryAddress);
    }

    function createNewFund(
        address _fundOwner,
        string _fundName,
        uint32 _riskRating,
        int32 _pastAnnualReturns,
        uint32 _reputationRating,
        string _description,
        address _shares
    ) onlyOwner public returns (FundFunctional) {
        FundData fundData = new FundData();
        ShareToken shares = ShareToken(_shares);
        FundFunctional fund = new FundFunctional(fundData, _fundName, _shares);
        shares.mint(fund, 1000);
        fundData.transferOwnership(fund);
        shares.transferOwnership(fund);

        fund.transferOwnership(msg.sender);

        fundRegistry.createNewFund(
            _fundOwner,
            fund,
            _fundName,
            _riskRating,
            _pastAnnualReturns,
            _reputationRating,
            _description
        );

        return fund;
    }
}
