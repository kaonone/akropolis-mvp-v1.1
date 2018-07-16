import AKTBalance from "../components/AKTBalance/intl/en";
import web3 from "../components/web3/intl/en";
import dashboard from "../views/dashboard/intl/en";
import fundAccount from "../views/fundAccount/intl/en";
import onboarding from "../views/onboarding/intl/en";
import selectAFund from "../views/selectAFund/intl/en";

export default {
    "nav.dashboard": "Dashboard",
    "nav.dataUsage": "Data usage",
    "nav.deleteMyData": "Delete my data",
    "nav.deleteMyDataDesc": `Are you sure you want to delete all data associated with your account?
    This will allow you to start the demo again. You will be asked to make two transactions as you are in control of 
    your data. First one will approve the transfer of your shares back to the fund. The second will remove the data.`,
    "nav.fundAccount": "Fund account",
    "nav.myWallet": "My wallet",
    "nav.noPortfolioYet": "Please finish creating your portfolio first",
    "nav.ok": "OK",
    "nav.savingsAndFunds": "Savings and funds",
    "nav.selectAFund": "Select a fund",

    ...AKTBalance,
    ...web3,
    ...onboarding,
    ...selectAFund,
    ...fundAccount,
    ...dashboard
};
