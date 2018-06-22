import * as React from "react";
import {FormattedMessage} from "react-intl";
import {NavLink, Route} from "react-router-dom";

import {NAVIGATION} from "../../constants";
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
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink exact={true} to={`/${NAVIGATION.myWallet}`}>
                                    <FormattedMessage id="nav.myWallet"/>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/${NAVIGATION.savingsAndFunds}`}>
                                    <FormattedMessage id="nav.savingsAndFunds"/>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/${NAVIGATION.myProducts}`}>
                                    <FormattedMessage id="nav.myProducts"/>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/${NAVIGATION.dataUsage}`}>
                                    <FormattedMessage id="nav.dataUsage"/>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
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
