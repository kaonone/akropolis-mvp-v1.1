import * as React from "react";
import { Route } from "react-router-dom";

import { NAVIGATION } from "../../constants";
import { Product } from "../../models/Products";

import NavbarComponent from "../../components/navigation/NavbarComponent";
import Web3Provider from "../../components/web3/Web3ProviderComponent";

import DashboardWrapper from "../../wrappers/DashboardWrapper";
import FundAccountWrapper from "../../wrappers/FundAccountWrapper";
import OnboardingWrapper from "../../wrappers/OnboardingWrapper";
import SelectAFundWrapper from "../../wrappers/SelectAFundWrapper";

import NavigationWrapperComponent from "../../components/navigationWrapper/NavigationWrapperComponent";
import { PlanAfterCalculate } from "../../models/Onboarding";
import { Web3AccountsStore } from "../../redux/store/web3AccountsStore";
import { isntEthereumBrowser } from "../../services/Web3Service";

export interface Props {
    account: string;
    isPortfolio: boolean;
    userData: PlanAfterCalculate;
    web3Accounts: Web3AccountsStore;
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
        if (this.props.userData.pensionValue !== nextProps.userData.pensionValue
            || this.props.userData.moreSavingsNeeded !== nextProps.userData.moreSavingsNeeded
            || this.props.isPortfolio) {
            this.setState({
                ...this.state,
                isLogin: true,
            });
        }
    }

    public render() {
        let content = null;
        if (!this.state.isLogin) {
            content = <OnboardingWrapper />;
        } else {
            content = (
                <div>
                    <NavigationWrapperComponent>
                        <NavbarComponent web3Accounts={this.props.web3Accounts}
                            isPortfolio={this.props.isPortfolio} />
                    </NavigationWrapperComponent>
                    <Route
                        exact={true}
                        path={`/${NAVIGATION.dashboard}`}
                        component={DashboardWrapper}
                    />
                    <Route
                        path={`/${NAVIGATION.selectAFund}`}
                        component={SelectAFundWrapper}
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
                {!isntEthereumBrowser() && <Web3Provider />}
                {content}
            </div>
        );
    }
}
