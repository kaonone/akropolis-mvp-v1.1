/* tslint:disable:no-implicit-dependencies */
import SpinnerBlack from "-!svg-react-loader?name=moneyIcon!../../assets/images/spin-black.svg";
/* tslint:enable:no-implicit-dependencies */

import * as React from "react";
import { FormattedMessage } from "react-intl";

import {config} from "../../config/config";

import {approveTransfer, createCommitment} from "../../services/DataService";
import { isAccountExist, isCorrectNetwork, isntEthereumBrowser } from "../../services/Web3Service";

import {Product} from "../../models/Products";

import { Web3AccountsStore } from "../../redux/store/web3AccountsStore";
import { Web3NetworkStore } from "../../redux/store/web3NetworkStore";
import { Web3Store } from "../../redux/store/web3Store";

import BalanceComponent from "../../components/fundAccount/balance/BalanceComponent";
import ConfirmationModalComponent from "../../components/fundAccount/confirmationModal/ConfirmationModalComponent";
import DownloadingBrowserComponent from "../../components/fundAccount/downloadingBrowser/DownloadingBrowserComponent";
import MakeCommitmentComponent from "../../components/fundAccount/makeCommitment/MakeCommitmentComponent";
import ObtaningTokensComponent from "../../components/fundAccount/obtaningTokens/ObtaningTokensComponent";
import StakeAktComponent from "../../components/fundAccount/stakeAkt/StakeAktComponent";
import SubNavigationComponent from "../../components/subNavigation/SubNavigationComponent";

import "./v-fund-account.css";

export interface Props {
    product: Product | null;
    web3: Web3Store;
    web3Accounts: Web3AccountsStore;
    web3Network: Web3NetworkStore;
}

export interface PropsFromDispatch {
    fetchAKTBalance: (account: string) => void;
    fetchETHBalance: (account: string) => void;
}

export interface StepOne {
    years: number;
    period: "week" | "month" | "quarter";
    rangeEth: number;
}

export interface StepTwo {
    stakeAkt: number;
}

interface State {
    AKTBalance: number;
    ETHBalance: number;
    isOpenModal: boolean;
    redirect: boolean;
    step: 1 | 2;
    stepOne: StepOne;
    stepTwo: StepTwo;
}

interface AllProps extends Props, PropsFromDispatch {
}

export default class FundAccountView extends React.Component<AllProps, State> {
    public readonly state: State = {
        AKTBalance: 0,
        ETHBalance: 0,
        isOpenModal: false,
        redirect: false,
        step: 1,
        stepOne: {
            period: "month",
            rangeEth: 0,
            years: 0,
        },
        stepTwo: {
            stakeAkt: 0,
        },
    };

    public componentWillMount() {
        const account = this.props.web3Accounts.accountSelected;
        if (account) {
            this.props.fetchAKTBalance(account);
            this.props.fetchETHBalance(account);
        }
    }

    public componentWillReceiveProps(nextProps: Props) {
        this.setState({
            ...this.state,
            ...nextProps.web3,
        });
    }

    public render() {

        if (isntEthereumBrowser()) {
            return (
                <div className="v-fund-account">
                    <DownloadingBrowserComponent />
                </div>
            );
        }

        if (!isAccountExist(this.props.web3Accounts)) {
            return (
                <div className="v-fund-account v-fund-account--error">
                    <FormattedMessage id="fundAccount.fundYourAccount">{
                        (fundYourAccount: string) => <SubNavigationComponent title={fundYourAccount} spaceForArrow={false} />}
                    </FormattedMessage>
                    <SpinnerBlack className="v-fund-account__icon" />
                    <FormattedMessage id="web3.errorAccount.desc">
                        {(desc: string) => (
                            <p dangerouslySetInnerHTML={{ __html: desc }} />
                        )}
                    </FormattedMessage>
                </div>
            );
        }

        if (config.network && !isCorrectNetwork(this.props.web3Network, config.network)) {
            return (
                <div className="v-fund-account v-fund-account--error">
                    <FormattedMessage id="fundAccount.fundYourAccount">{
                        (fundYourAccount: string) => <SubNavigationComponent title={fundYourAccount} spaceForArrow={false} />}
                    </FormattedMessage>
                    <SpinnerBlack className="v-fund-account__icon" />
                    <FormattedMessage id="fundAccount.incorrectNetwork" values={{ network: config.network }}>
                        {(desc: string) => (
                            <p dangerouslySetInnerHTML={{ __html: desc }} />
                        )}
                    </FormattedMessage>
                </div>
            );
        }

        return (
            <div className="v-fund-account">
                <BalanceComponent AKTBalance={this.state.AKTBalance} ETHBalance={this.state.ETHBalance} />
                {(this.state.AKTBalance === 0 || this.state.ETHBalance === 0) && (
                    <ObtaningTokensComponent AKTBalance={this.state.AKTBalance} ETHBalance={this.state.ETHBalance}
                        account={this.props.web3Accounts.accountSelected} fetchAKTBalance={this.props.fetchAKTBalance} />
                )}
                {(this.state.AKTBalance !== 0 && this.state.ETHBalance !== 0) && (
                    <>
                        {this.state.step === 1 ? (
                            <MakeCommitmentComponent AKTBalance={this.state.AKTBalance}
                                ETHBalance={this.state.ETHBalance}
                                form={this.state.stepOne}
                                onConfirm={this.handleStepOneConfirm} />
                        ) : (
                                <StakeAktComponent onConfirm={this.handleStepTwoConfirm}
                                    form={this.state.stepTwo}
                                    back={this.handleBack} />
                            )}
                        <ConfirmationModalComponent result={this.state.stepOne}
                            isOpenProps={this.state.isOpenModal}
                            onClick={this.handleOnClick}
                            onClose={this.handleOnClose}/>
                    </>
                )}
            </div>
        );
    }

    private handleOnClick = () => {
        const data = {...this.state.stepOne, ...this.state.stepTwo, ...this.props.product};
        if (data.stakeAkt > 0) {
            approveTransfer(this.props.web3Accounts.accountSelected, 500).then(() => {
                createCommitment(this.props.web3Accounts.accountSelected, data)
                    .then(() => {
                        console.log("ok");
                        this.setState({
                            ...this.state,
                            isOpenModal: false,
                            redirect: true,
                        });
                    })
                    .catch((err) => console.error(err));
            });
        } else {
            createCommitment(this.props.web3Accounts.accountSelected, data)
                .then(() => {
                    console.log("ok");
                    this.setState({
                        ...this.state,
                        isOpenModal: false,
                        redirect: true,
                    });
                })
                .catch((err) => console.error(err));
        }
    }

    private handleOnClose = () => {
        this.setState({
            ...this.state,
            isOpenModal: false,
        });
    }

    private handleStepOneConfirm = (form: StepOne) => {
        this.setState({
            ...this.state,
            step: 2,
            stepOne: form,
        });
    }

    private handleStepTwoConfirm = (form: StepTwo) => {
        this.setState({
            ...this.state,
            isOpenModal: true,
            stepTwo: form,
        });
    }

    private handleBack = () => {
        this.setState({
            ...this.state,
            step: 1,
        });
    }
}
