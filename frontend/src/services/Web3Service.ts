import { NO_ETHEREUM } from "../constants";

export const isntEthereumBrowser = () => {
    // @ts-ignore
    const { web3 } = window;
    return !web3;
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
