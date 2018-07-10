import * as React from "react";
import {Route} from "react-router-dom";

import {NAVIGATION} from "../../constants";
import {Product} from "../../models/Products";

import NavbarComponent from "../../components/navigation/NavbarComponent";
import Web3Provider from "../../components/web3/Web3ProviderComponent";

import FundAccountWrapper from "../../wrappers/FundAccountWrapper";
import OnboardingWrapper from "../../wrappers/OnboardingWrapper";
import SelectAFundWrapper from "../../wrappers/SelectAFundWrapper";
import DashboardView from "../dashboard/DashboardView";

import {PlanAfterCalculate} from "../../models/Onboarding";

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
        if (this.props.userData.pensionValue !== nextProps.userData.pensionValue
            || this.props.userData.moreSavingsNeeded !== nextProps.userData.moreSavingsNeeded) {
            this.setState({
                ...this.state,
                isLogin: true,
            });
        }
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
                        path={`/${NAVIGATION.selectAFund}`}
                        component={SelectAFundWrapper}
                    />
                    <Route
                        path={`/${NAVIGATION.fundAccount}`}
                        component={FundAccountWrapper}
                    />
                    <Route
                        path={`/${NAVIGATION.dashboard}`}
                        component={DashboardView}
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
