import * as moment from "moment";
import {config} from "../config/config";
import * as AkropolisToken from "../contracts/AkropolisToken.json";
import * as AKTFaucet from "../contracts/AKTFaucet.json";
import * as FundFunctional from "../contracts/FundFunctional.json";
import * as FundRegistry from "../contracts/FundRegistry.json";
import * as PortfolioData from "../contracts/PortfolioData.json";
import * as PortfolioFunctional from "../contracts/PortfolioFunctional.json";
import * as ShareToken from "../contracts/ShareToken.json";
import {Commitment} from "../models/Commitment";
import {storeCommitment} from "./StorageService";

import * as _ from "lodash";

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
            const minGasPrice = Math.max(3, 3 * web3.fromWei(gasPrice, "gwei").toNumber());
            resolve(web3.toWei(minGasPrice, "gwei"));
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
    const tryResolveCommitment = (commitment: any, resolve: any) => {
        if (Object.keys(commitment).length >= 6) {
            storeCommitment(commitment);
            resolve(commitment);
        }
    };
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
                            tryResolveCommitment(commitment, resolve);
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
                            if (!commitment.fundAddress || commitment.fundAddress.length < 3) {
                                reject("Invalid address");
                                return;
                            }
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
                                                        tryResolveCommitment(commitment, resolve);
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
    function pollTransaction(superResolve: any, superReject: any, tx: string) {
        const fn = () => {
            // @ts-ignore
            const {web3} = window;
            web3.eth.getTransactionReceipt(tx, (error: any, result: any) => {
                if (error) {
                    superReject(error);
                } else {
                    if (!result || _.isNull(result.blockNumber)) {
                        pollTransaction(superResolve, superReject, tx);
                    } else {
                        if ((+result.status) === 0) {
                            superReject("Transaction status fetch failed");
                        } else {
                            superResolve("Ok");
                        }
                    }
                }

            });
        };
        setTimeout(fn, 1000);
    }

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
                        pollTransaction(resolve, reject, response);
                    }
                });
        });
    });
};

export const approveSharesTransfer = (account: string, commitment: Commitment) => {
    return new Promise((resolve, reject) => {
        if (!account) {
            reject("no-account");
        }
        // @ts-ignore
        const {web3} = window;

        web3.eth.defaultAccount = account;
        const fundFunctional = web3.eth.contract(FundFunctional.abi).at(commitment.fundAddress);
        executeGasPriced(account, reject, (gasPrice: any) => {
            fundFunctional.getShares(
                account,
                (err: any, shareBalance: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        fundFunctional.shares((err2: any, sharesAddress: any) => {
                            if (err) {
                                reject(err);
                            } else {
                                const shares = web3.eth.contract(ShareToken.abi).at(sharesAddress);
                                shares.increaseApproval(
                                    commitment.fundAddress,
                                    shareBalance,
                                    {gasPrice},
                                    (err3: any, response: any) => {
                                        if (err3) {
                                            reject(err3);
                                        } else {
                                            resolve(response);
                                        }
                                    });
                            }
                        });

                    }
                });
        });
    });
};
