import * as React from "react";
import {Route} from "react-router-dom";

import {NAVIGATION} from "../../constants";
import {Product} from "../../models/Products";

import NavbarComponent from "../../components/navigation/NavbarComponent";
import Web3Provider from "../../components/web3/Web3ProviderComponent";

import DashboardWrapper from "../../wrappers/DashboardWrapper";
import FundAccountWrapper from "../../wrappers/FundAccountWrapper";
import OnboardingWrapper from "../../wrappers/OnboardingWrapper";
import SelectAFundWrapper from "../../wrappers/SelectAFundWrapper";

import NavigationWrapperComponent from "../../components/navigationWrapper/NavigationWrapperComponent";
import {PlanAfterCalculate} from "../../models/Onboarding";
import {Web3AccountsStore} from "../../redux/store/web3AccountsStore";
import {getOnboardingData, getSelectedFund, getStoredCommitment, isEmpty} from "../../services/StorageService";
import {isntEthereumBrowser} from "../../services/Web3Service";

import * as _ from "lodash";
import {Commitment} from "../../models/Commitment";
import {PortfolioStore} from "../../redux/store/portfolioStore";

export interface Props {
    account: string;
    portfolio: PortfolioStore;
    userData: PlanAfterCalculate;
    web3Accounts: Web3AccountsStore;
}

export interface PropsFromDispatch {
    commitmentCreatedAction: (commitment: Commitment) => void;
    fetchCommitmentAction: (account: string) => void;
    selectProduct: (product: Product) => void;
}

interface AllProps extends Props, PropsFromDispatch {
}

interface State {
    isLogin: boolean;
}

export default class LayoutView extends React.Component<AllProps, State> {

    public readonly state: State = {
        isLogin: false,
    };

    public componentWillMount() {
        const product = getSelectedFund();
        const userData = getOnboardingData();
        if (userData) {
            this.setState({
                ...this.state,
                isLogin: true,
            });
        }
        if (product) {
            this.props.selectProduct(product);
        }
    }

    public shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState);
    }

    public componentWillReceiveProps(nextProps: Props) {
        const isCommitmentStored = !isEmpty(getStoredCommitment());
        const isLoggedIn = !_.isNull(getOnboardingData()) || isCommitmentStored;
        this.setState({
            ...this.state,
            isLogin: isLoggedIn,
        });
        if (!isCommitmentStored && nextProps.web3Accounts.accountSelected
            && !_.isEqual(this.props.web3Accounts.accountSelected, nextProps.web3Accounts.accountSelected)) {
            this.props.fetchCommitmentAction(nextProps.web3Accounts.accountSelected);
        } else if (isCommitmentStored && isEmpty(nextProps.portfolio.commitment)) {
            this.props.commitmentCreatedAction(getStoredCommitment());
        }
    }

    public render() {
        let content = null;
        if (!this.state.isLogin) {
            content = <OnboardingWrapper/>;
        } else {
            content = (
                <div>
                    <NavigationWrapperComponent>
                        <NavbarComponent web3Accounts={this.props.web3Accounts}
                                         portfolio={this.props.portfolio}/>
                    </NavigationWrapperComponent>
                    <Route
                        exact={true}
                        path={`/${NAVIGATION.dashboard}`}
                        component={DashboardWrapper}
                    />
                    <Route
                        path={`/${NAVIGATION.fundAccount}`}
                        component={FundAccountWrapper}
                    />
                    <Route
                        path={`/${NAVIGATION.selectAFund}`}
                        component={SelectAFundWrapper}
                    />
                </div>
            );
        }

        return (
            <div>
                {!isntEthereumBrowser() && <Web3Provider/>}
                {content}
            </div>
        );
    }
}
