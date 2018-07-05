import {config} from "../config/config";
import * as AkropolisToken from "../contracts/AkropolisToken.json";
import * as AKTFaucet from "../contracts/AKTFaucet.json";
import * as PortfolioFunctional from "../contracts/PortfolioFunctional.json";

export const fetchATMBalance = (account: string) => {
    return new Promise((resolve, reject) => {
        if (!account) {
            reject("no-account");
        }
        // @ts-ignore
        const {web3} = window;

        web3.eth.defaultAccount = account;

        const akropolisToken = web3.eth.contract(AkropolisToken.abi).at(config.deployment.AkropolisToken);
        akropolisToken.balanceOf(account, (err: any, response: any) => {
            if (err) {
                reject(err);
            } else {
                const akt = web3.fromWei(response, "ether");
                resolve(Math.round(akt.toNumber()));
            }
        });
    });
};

export const fetchETHBalance = (account: string) => {
    return new Promise((resolve, reject) => {
        if (!account) {
            reject("no-account");
        }
        // @ts-ignore
        const {web3} = window;

        web3.eth.defaultAccount = account;

        web3.eth.getBalance(account, (err: any, response: any) => {
            if (err) {
                reject(err);
            } else {
                const eth = web3.fromWei(response, "ether");
                resolve(Math.round(eth.toNumber()));
            }
        });
    });
};

export const getFreeATMToken = (account: string) => {
    return new Promise((resolve, reject) => {
        if (!account) {
            reject("no-account");
        }
        // @ts-ignore
        const {web3} = window;

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

export const approveTransfer = (account: string, AKT: number) => {
    return new Promise((resolve, reject) => {
        if (!account) {
            reject("no-account");
        }
        // @ts-ignore
        const {web3} = window;
        const wei = web3.toWei(AKT, "ether");

        web3.eth.defaultAccount = account;

        const akropolisToken = web3.eth.contract(AkropolisToken.abi).at(config.deployment.AkropolisToken);
        akropolisToken.approve(config.deployment.PortfolioFunctional, wei, (err: any, response: any) => {
            if (err) {
                reject(err);
            } else {
                console.warn(response);
                resolve(response);
            }
        });
    });
};

export const createCommitment = (account: string, data: any) => {
    return new Promise((resolve, reject) => {
        if (!account) {
            reject("no-account");
        }

        // @ts-ignore
        const {web3} = window;

        web3.eth.defaultAccount = account;

        let period = 0;
        switch (data.period) {
            case "week":
                period = 0;
                break;
            case "month":
                period = 1;
                break;
            case "quarter":
                period = 2;
                break;
            default:
                period = 0;
                break;
        }

        const eth = web3.toWei(data.rangeEth, "ether");
        const akt = web3.toWei(data.stakeAktValue, "ether");

        const portfolioFunctional = web3.eth.contract(PortfolioFunctional.abi).at(config.deployment.PortfolioFunctional);

        console.warn(
            [100],
            [eth],
            [data.fundAddress],
            period,
            eth,
            data.years,
            akt,
            {value: eth});

        portfolioFunctional.createNewUserPortfolio(
            [100],
            [eth],
            [data.fundAddress],
            period,
            eth,
            data.years,
            akt,
            {value: eth},
            (err: any, response: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
    });
};
