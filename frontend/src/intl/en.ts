import AKTBalance from "../components/AKTBalance/intl/en";
import myProducts from "../views/myProducts/intl/en";
import myWallet from "../views/myWallet/intl/en";
import onboarding from "../views/onboarding/intl/en";

export default {
    "nav.dataUsage": "Data usage",
    "nav.myProducts": "My products",
    "nav.myWallet": "My wallet",
    "nav.savingsAndFunds": "Savings and funds",

    ...AKTBalance,
    ...myWallet,
    ...onboarding,
    ...myProducts,
};
