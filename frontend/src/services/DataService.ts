import * as moment from "moment";
import {config} from "../config/config";
import * as AkropolisToken from "../contracts/AkropolisToken.json";
import * as AKTFaucet from "../contracts/AKTFaucet.json";
import * as FundRegistry from "../contracts/FundRegistry.json";
import * as PortfolioData from "../contracts/PortfolioData.json";
import * as PortfolioFunctional from "../contracts/PortfolioFunctional.json";
import {Commitment} from "../models/Commitment";

export const fetchPortfolio = (account: string) => {
    return new Promise((resolve, reject) => {
        if (!account) {
            reject("no-account");
        }

        // @ts-ignore
        const {web3} = window;

        web3.eth.defaultAccount = account;
        const portfolioData = web3.eth.contract(PortfolioData.abi).at(config.deployment.PortfolioData);
        portfolioData.user_allocation_size(account, (err: any, response: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(response.toNumber());
            }
        });
    });
};

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
                resolve(Math.round(eth.toNumber() * 10000) / 10000);
            }
        });
    });
};

export const getFreeAKTToken = (account: string) => {
    return new Promise((resolve, reject) => {
        if (!account) {
            reject("no-account");
        }
        // @ts-ignore
        const {web3} = window;

        web3.eth.defaultAccount = account;

        const akropolisToken = web3.eth.contract(AKTFaucet.abi).at(config.deployment.AKTFaucet);
        executeGasPriced(account, reject, (gasPrice: any) => {
            akropolisToken.emitAKT(account, {gasPrice}, (err: any, response: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
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
        executeGasPriced(account, reject, (gasPrice: any) => {
            akropolisToken.approve(
                config.deployment.PortfolioFunctional,
                wei,
                {gasPrice},
                (err: any, response: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.warn(response);
                        resolve(response);
                    }
                });
        });
    });
};

function executeGasPriced(account: string, reject: any, resolve: any) {
    // @ts-ignore
    const {web3} = window;
    web3.eth.defaultAccount = account;
    web3.eth.getGasPrice((error: any, gasPrice: any) => {
        if (error) {
            reject(error);
        } else {
            resolve(3 * gasPrice.toNumber());
        }
    });
}

export const createCommitment = (account: string, data: any) => {
    return new Promise((resolve, reject) => {
        if (!account) {
            reject("no-account");
        }
        // @ts-ignore
        const {web3} = window;

        web3.eth.defaultAccount = account;

        let period: 0 | 1 | 2 = 0;
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
        const commitment: Commitment = {
            amountToPay: data.rangeEth,
            createdAt: moment().unix(),
            durationInYears: data.years,
            fundAddress: data.fundAddress,
            fundName: data.fundName,
            pastAnnualReturns: data.fundPastReturns,
            period
        };
        executeGasPriced(account, reject, (gasPrice: any) => {
                portfolioFunctional.createNewUserPortfolio(
                    [100],
                    [eth],
                    [data.fundAddress],
                    period,
                    eth,
                    data.years,
                    akt,
                    {value: eth, gasPrice},
                    (err: any, response: any) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(commitment);
                        }
                    });
            }
        );
    });
};

export const getCommitment = (account: string) => {
    return new Promise((resolve, reject) => {
        if (!account) {
            reject("no-account");
        }

        // @ts-ignore
        const {web3} = window;

        web3.eth.defaultAccount = account;

        const fundRegistry = web3.eth.contract(FundRegistry.abi).at(config.deployment.FundRegistry);
        const portfolioData = web3.eth.contract(PortfolioData.abi).at(config.deployment.PortfolioData);
        executeGasPriced(account, reject, (gasPrice: any) => {
                const commitment: any = {};
                portfolioData.user_commitment(
                    account,
                    {gasPrice},
                    (err: any, response: any) => {
                        if (err) {
                            reject(err);
                        } else {
                            const eth = web3.fromWei(response[1], "ether");
                            commitment.period = response[0];
                            commitment.amountToPay = Math.round(eth.toNumber() * 10000) / 10000;
                            commitment.durationInYears = response[2];
                            commitment.createdAt = response[4];
                            if (Object.keys(commitment).length >= 6) {
                                resolve(commitment);
                            }
                        }
                    });
                portfolioData.user_allocations(
                    account, 0,
                    {gasPrice},
                    (err: any, response: any) => {
                        if (err) {
                            reject(err);
                        } else {
                            commitment.fundAddress = response[2];
                            try {
                                fundRegistry.getFundIndexByAddress(
                                    commitment.fundAddress,
                                    {gasPrice},
                                    (err2: any, response2: any) => {
                                        if (err2) {
                                            reject(err2);
                                        } else {
                                            fundRegistry.funds(
                                                response2,
                                                {gasPrice},
                                                (err3: any, response3: any) => {
                                                    if (err3) {
                                                        reject(err3);
                                                    } else {
                                                        commitment.fundName = response3[0];
                                                        commitment.pastAnnualReturns = response3[4];
                                                        if (Object.keys(commitment).length >= 6) {
                                                            resolve(commitment);
                                                        }
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            } catch (err) {
                                reject(err);
                            }
                        }
                    });
            }
        );
    });
};

export const numberWithSpaces = (value: number | undefined): string => {

    const transformValueArr: string[] = value ? value.toString().split(".") : ["0"];
    let partBeforeComa = "";
    let partAfterComa = "";

    if (transformValueArr[0].length > 3) {
        let numberOfIterate = 1;
        for (let i = transformValueArr[0].length - 1; i >= 0; i--) {

            partBeforeComa = transformValueArr[0].charAt(i) + partBeforeComa;

            if (numberOfIterate % 3 === 0) {
                partBeforeComa = " " + partBeforeComa;
            }

            numberOfIterate++;
        }
    } else {
        partBeforeComa = transformValueArr[0];
    }

    if (transformValueArr[1]) {

        transformValueArr[1].length > 2 ?
            partAfterComa = ", " + transformValueArr[1].slice(0, 2)
            :
            partAfterComa = ", " + transformValueArr[1] + "0";

    } else {
        partAfterComa = "";
    }

    return partBeforeComa + partAfterComa;
};

export const removeCommitment = (account: string) => {
    return new Promise((resolve, reject) => {
        if (!account) {
            reject("no-account");
        }
        // @ts-ignore
        const {web3} = window;

        web3.eth.defaultAccount = account;
        const portfolioFunctional = web3.eth.contract(PortfolioFunctional.abi).at(config.deployment.PortfolioFunctional);
        executeGasPriced(account, reject, (gasPrice: any) => {
            portfolioFunctional.deleteUserPortfolio(
                {gas: 400000, gasPrice},
                (err: any, response: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.warn(response);
                        resolve(response);
                    }
                });
        });
    });
};
