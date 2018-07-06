import AKTBalance from "../components/AKTBalance/intl/en";
import web3 from "../components/web3/intl/en";
import fundAccount from "../views/fundAccount/intl/en";
import myWallet from "../views/myWallet/intl/en";
import onboarding from "../views/onboarding/intl/en";
import selectAFund from "../views/selectAFund/intl/en";

export default {
    "nav.dataUsage": "Data usage",
    "nav.deleteMyData": "Delete my data",
    "nav.fundAccount": "Fund account",
    "nav.myWallet": "My wallet",
    "nav.savingsAndFunds": "Savings and funds",
    "nav.selectAFund": "Select a fund",

    ...AKTBalance,
    ...web3,
    ...myWallet,
    ...onboarding,
    ...selectAFund,
    ...fundAccount,
};
