import { NO_ETHEREUM } from "../constants";

import {Web3AccountsStore} from "../redux/store/web3AccountsStore";
import {Web3NetworkStore} from "../redux/store/web3NetworkStore";

export const isntEthereumBrowser = () => {
    // @ts-ignore
    const { web3 } = window;
    return !web3;
};

export const isAccountExist = (web3Accounts: Web3AccountsStore) => {
    return web3Accounts.accountsFetched && web3Accounts.accountExists;
};

export const isCorrectNetwork = (web3Network: Web3NetworkStore, network: string) => {
    return web3Network.networkFetched && web3Network.networkId === network;
};

export const fetchNetwork = () => {
    return new Promise((resolve, reject) => {
        if (isntEthereumBrowser()) {
            reject(NO_ETHEREUM);
        }
        // @ts-ignore
        const { web3 } = window;

        web3 && web3.version && web3.version.getNetwork((err: any, netId: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(netId);
            }
        });
    });
};

export const fetchAccounts = () => {
    return new Promise((resolve, reject) => {
        if (isntEthereumBrowser()) {
            reject(NO_ETHEREUM);
        }
        // @ts-ignore
        const { web3 } = window;
        const ethAccounts = getAccounts();

        if (ethAccounts.length === 0) {
            web3 && web3.eth && web3.eth.getAccounts((err: any, accounts: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(accounts);
                }
            });
        } else {
            resolve(ethAccounts);
        }
    });
};

function getAccounts() {
    try {
        // @ts-ignore
        const { web3 } = window;
        // throws if no account selected
        return web3.eth.accounts;
    } catch (e) {
        return [];
    }
}
