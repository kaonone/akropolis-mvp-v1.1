import { config } from "../config/config";
import * as AkropolisToken from "../contracts/AkropolisToken.json";
import * as AKTFaucet from "../contracts/AKTFaucet.json";

export const fetchATMBalance = (account: string) => {
    return new Promise((resolve, reject) => {
        // @ts-ignore
        const { web3 } = window;

        web3.eth.defaultAccount = account;

        const akropolisToken = web3.eth.contract(AkropolisToken.abi).at(config.deployment.AkropolisToken);
        akropolisToken.balanceOf(account, (err: any, response: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(response.c[0]);
            }
        });
    });
};

export const fetchETHBalance = (account: string) => {
    return new Promise((resolve, reject) => {
        // @ts-ignore
        const { web3 } = window;

        web3.eth.defaultAccount = account;

        web3.eth.getBalance(account, (err: any, response: any) => {
            if (err) {
                reject(err);
            } else {
                const eth = web3.fromWei(response);
                resolve(eth.c[0]);
            }
        });
    });
};

export const getFreeATMToken = (account: string) => {
    return new Promise((resolve, reject) => {
        // @ts-ignore
        const { web3 } = window;

        web3.eth.defaultAccount = account;

        const akropolisToken = web3.eth.contract(AKTFaucet.abi).at(config.deployment.AKTFaucet);
        akropolisToken.emitAKT(account, (err: any, response: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        });
    });
};
