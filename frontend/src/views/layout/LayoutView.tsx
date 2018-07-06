import * as React from "react";
import {Route} from "react-router-dom";

import {NAVIGATION} from "../../constants";
import {Product} from "../../models/Products";

import NavbarComponent from "../../components/navigation/NavbarComponent";
import Web3Provider from "../../components/web3/Web3ProviderComponent";

import FundAccountWrapper from "../../wrappers/FundAccountWrapper";
import MyWalletWrapper from "../../wrappers/MyWalletWrapper";
import OnboardingWrapper from "../../wrappers/OnboardingWrapper";
import SelectAFundWrapper from "../../wrappers/SelectAFundWrapper";
import DataUsageView from "../dataUsage/DataUsageView";

import {PlanAfterCalculate} from "../../models/Onboarding";

import SavingsAndFundsView from "../savingsAndFunds/SavingsAndFundsView";

export interface Props {
    userData: PlanAfterCalculate;
}

export interface PropsFromDispatch {
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
        const userData = localStorage.getItem("userData");
        const product = localStorage.getItem("product");
        if (userData) {
            this.setState({
                ...this.state,
                isLogin: true,
            });
        }
        if (product) {
            const selectedProduct = JSON.parse(product);
            this.props.selectProduct(selectedProduct);
        }
    }

    public componentWillReceiveProps(nextProps: Props) {
        this.setState({
            ...this.state,
            isLogin: true,
        });
    }

    public render() {
        let content = null;
        if (!this.state.isLogin) {
            content = <OnboardingWrapper/>;
        } else {
            content = (
                <div>
                    <NavbarComponent/>
                    <Route
                        exact={true}
                        path={`/${NAVIGATION.myWallet}`}
                        component={MyWalletWrapper}
                    />
                    <Route
                        path={`/${NAVIGATION.savingsAndFunds}`}
                        component={SavingsAndFundsView}
                    />
                    <Route
                        path={`/${NAVIGATION.selectAFund}`}
                        component={SelectAFundWrapper}
                    />
                    <Route
                        path={`/${NAVIGATION.dataUsage}`}
                        component={DataUsageView}
                    />
                    <Route
                        path={`/${NAVIGATION.fundAccount}`}
                        component={FundAccountWrapper}
                    />
                </div>
            );
        }

        return (
            <div>
                <Web3Provider/>
                {content}
            </div>
        );
    }
}
