pragma solidity ^0.4.24;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract Portfolio {

    struct Allocation {
        uint percent_of_portfolio;
        uint eth_invested;
        address fund;
    }

    enum Period {
        WEEK,
        MONTH,
        QUARTER
    }

    struct Commitment {
        Period period;
        uint256 amountToPay;
        uint256 durationInYears;
        uint256 aktStake;
        uint256 createdAt;
    }
}
