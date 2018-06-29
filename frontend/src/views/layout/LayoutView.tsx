import * as React from "react";
import { Route } from "react-router-dom";
import NavbarComponent from "../../components/navigation/NavbarComponent";
import Web3Provider from "../../components/web3/web3ProviderComponent";
import { NAVIGATION } from "../../constants";
import MyWalletWrapper from "../../wrappers/MyWalletWrapper";
import OnboardingWrapper from "../../wrappers/OnboardingWrapper";
import DataUsageView from "../dataUsage/DataUsageView";
import MyProductsView from "../myProducts/MyProductsView";

import {PlanAfterCalculate} from "../../models/Onboarding";

import SavingsAndFundsView from "../savingsAndFunds/SavingsAndFundsView";

interface Props {
    userData: PlanAfterCalculate;
}

interface State {
    isLogin: boolean;
}

export default class LayoutView extends React.Component<Props, State> {

    public readonly state: State = {
        isLogin: false,
    };

    public componentWillMount() {
        const userData = localStorage.getItem("userData");
        if (userData) {
            this.setState({
                ...this.state,
                isLogin: true,
            });
        }
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (this.props.userData.pensionValue !== nextProps.userData.pensionValue) {
            this.setState({
                ...this.state,
                isLogin: true,
            });
        }
    }

    public render() {
        if (!this.state.isLogin) {
            return (
                <div>
                    <Web3Provider />
                    <OnboardingWrapper/>
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
