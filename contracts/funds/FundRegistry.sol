pragma solidity ^0.4.24;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract FundRegistry is Ownable {
    struct Fund {
        string name;
        address owner;
        address currentAddress;
        uint32 riskRating;
        int32 pastAnnualReturns;
        uint32 reputationRating;
        string description;
        uint256 index;
    }

    struct Indexed {
        uint256 index;
        bool isIndexed;
    }

    mapping(string => Indexed) fund_by_name;
    mapping(uint256 => Fund) public funds;
    uint256 fundCount;

    event Created(address indexed owner, string fundName, address indexed contractLocation);
    event Deleted(address indexed owner, address indexed);
    event Updated(address indexed owner, string fundName, address indexed contractLocation);

    function createNewFund(address _owner, address _contract,
        string _name,
        uint32 _riskRating,
        int32 _pastAnnualReturns,
        uint32 _reputationRating,
        string _description) public onlyOwner {
        require(fund_by_name[_name].isIndexed == false);
        Fund memory fund = Fund(_name, _owner, _contract, _riskRating, _pastAnnualReturns, _reputationRating, _description,
            fundCount);
        Indexed memory idx = Indexed(fund.index, true);
        fund_by_name[fund.name] = idx;
        funds[fundCount] = fund;
        fundCount += 1;
        emit Created(_owner, _name, _contract);
    }

    function updateFund(uint256 idx,
        address _owner,
        address _contract,
        uint32 _riskRating,
        int32 _pastAnnualReturns,
        uint32 _reputationRating,
        string _description) public onlyOwner {
        Fund storage fund = funds[idx];
        require(fund.currentAddress != 0);
        fund.owner = _owner;
        fund.currentAddress = _contract;
        fund.riskRating = _riskRating;
        fund.pastAnnualReturns = _pastAnnualReturns;
        fund.reputationRating = _reputationRating;
        fund.description = _description;
        emit Updated(_owner, fund.name, _contract);
    }

    function getFundCount() public view returns (uint256) {
        return fundCount;
    }

    function getFundIndex(string name) public view returns (uint256) {
        Indexed storage idx = fund_by_name[name];
        require(idx.isIndexed == true);
        return idx.index;
    }
}
