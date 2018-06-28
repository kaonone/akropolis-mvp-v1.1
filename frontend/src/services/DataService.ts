import { config } from "../config/config";
import * as AkropolisToken from "../contracts/AkropolisToken.json";

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
