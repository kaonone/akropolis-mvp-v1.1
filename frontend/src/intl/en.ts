import AKTBalance from "../components/AKTBalance/intl/en";
import web3 from "../components/web3/intl/en";
import fundAccount from "../views/fundAccount/intl/en";
import myProducts from "../views/myProducts/intl/en";
import myWallet from "../views/myWallet/intl/en";
import onboarding from "../views/onboarding/intl/en";

export default {
    "nav.dataUsage": "Data usage",
    "nav.fundAccount": "Fund account",
    "nav.myProducts": "My products",
    "nav.myWallet": "My wallet",
    "nav.savingsAndFunds": "Savings and funds",

    ...AKTBalance,
    ...web3,
    ...myWallet,
    ...onboarding,
    ...myProducts,
    ...fundAccount,
};
