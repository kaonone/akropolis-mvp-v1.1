import * as React from "react";
import { Route } from "react-router-dom";
import NavbarComponent from "../../components/navigation/NavbarComponent";
import { NAVIGATION } from "../../constants";
import MyWalletWrapper from "../../wrappers/MyWalletWrapper";
import DataUsageComponent from "../dataUsage/DataUsageComponent";
import MyProductsComponent from "../myProducts/MyProductsComponent";

import SavingsAndFundsComponent from "../savingsAndFunds/SavingsAndFundsComponent";

interface Props {
    message: string;
}

export default class LayoutComponent extends React.Component<Props, {}> {

    public render() {
        return (
            <div>
                <NavbarComponent />
                <Route
                    exact={true}
                    path={`/${NAVIGATION.myWallet}`}
                    component={MyWalletWrapper}
                />
                <Route
                    path={`/${NAVIGATION.savingsAndFunds}`}
                    component={SavingsAndFundsComponent}
                />
                <Route
                    path={`/${NAVIGATION.myProducts}`}
                    component={MyProductsComponent}
                />
                <Route
                    path={`/${NAVIGATION.dataUsage}`}
                    component={DataUsageComponent}
                />
            </div>
        );
    }
}
