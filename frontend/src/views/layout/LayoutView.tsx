import * as React from "react";
import { Route } from "react-router-dom";
import NavbarComponent from "../../components/navigation/NavbarComponent";
import Web3Provider from "../../components/web3/web3ProviderComponent";
import { NAVIGATION } from "../../constants";
import MyWalletWrapper from "../../wrappers/MyWalletWrapper";
import DataUsageView from "../dataUsage/DataUsageView";
import MyProductsView from "../myProducts/MyProductsView";
import OnboardingView from "../onboarding/OnboardingView";

import SavingsAndFundsView from "../savingsAndFunds/SavingsAndFundsView";

interface Props {
    message: string;
}

export default class LayoutView extends React.Component<Props, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            isLogin: false,
        };
    }

    public render() {
        if (!this.state.isLogin) {
            return (
                <div>
                    <Web3Provider />
                    <OnboardingView/>
                </div>
            );
        }
        return (
            <div>
                <Web3Provider />
                <NavbarComponent />
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
                    path={`/${NAVIGATION.myProducts}`}
                    component={MyProductsView}
                />
                <Route
                    path={`/${NAVIGATION.dataUsage}`}
                    component={DataUsageView}
                />
            </div>
        );
    }
}
