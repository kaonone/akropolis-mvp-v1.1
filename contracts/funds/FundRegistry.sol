pragma solidity ^0.4.24;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract FundRegistry is Ownable {
    struct Fund {
        string name;
        address currentAddress;
        // any other needed data
    }

    mapping(address => Fund) fund_list;
    mapping(string => Fund) fund_by_name;
    string[] funds;

    event Created(address indexed owner, string fundName, address indexed contractLocation);
    event Deleted(address indexed owner, address indexed);
    event Updated(address indexed owner, string fundName, address indexed contractLocation);

    function createNewFund(address _owner, address _contract, string _name) public onlyOwner {
        require(fund_by_name[_name].currentAddress == 0);
        Fund memory fund = Fund(_name, _contract);
        fund_list[_owner] = fund;
        fund_by_name[fund.name] = fund;
        funds.push(fund.name);
        emit Created(_owner, _name, _contract);
    }

    function fundToTuple(Fund fund) internal pure returns (string, address) {
        if (fund.currentAddress == 0) {
            return ("", address(0));
        }
        return (fund.name, fund.currentAddress);
    }

    function getFundCount() public view returns (uint256) {
        return funds.length;
    }

    function getFundAt(uint32 index) public view returns (string, address) {
        Fund storage fund = fund_by_name[funds[index]];
        return fundToTuple(fund);
    }

    function getFund(string name) public view returns (string, address) {
        Fund storage fund = fund_by_name[name];
        return fundToTuple(fund);
    }

    function updateFund(address _owner, address _contract) public onlyOwner {
        Fund memory fund = fund_list[_owner];
        fund.currentAddress = _contract;
        fund_list[_owner] = fund;
        emit Updated(_owner, fund.name, _contract);
    }

    function deleteFund(address _owner, address _contract) public onlyOwner {
        delete fund_list[_owner];
        emit Deleted(_owner, _contract);
    }
}
