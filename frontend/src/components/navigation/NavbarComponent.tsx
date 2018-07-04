import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Link, NavLink } from "react-router-dom";
import AKTBalance from "../../wrappers/ATKBalanceWrapper";

import { NAVIGATION } from "../../constants";

import "./c-navbar.css";

interface Props {
    message?: string;
}

export default class NavbarComponent extends React.Component<Props, {}> {

    public render() {

        return (
            <div>
                <header className="c-navbar">
                    <Link className="c-navbar__logo-link" to="/">Logo Akropolis</Link>
                    <a className="c-navbar__toggle" menu-toggle="true" />
                    <ul className="c-navbar__wrapper">
                        <li className="c-navbar__item">
                            <NavLink className="c-navbar__link" activeClassName="c-navbar__link--active" exact={true} to={`/${NAVIGATION.myWallet}`}>
                                <FormattedMessage id="nav.myWallet" />
                            </NavLink>
                        </li>
                        <li className="c-navbar__item">
                            <NavLink className="c-navbar__link" activeClassName="c-navbar__link--active" to={`/${NAVIGATION.savingsAndFunds}`}>
                                <FormattedMessage id="nav.savingsAndFunds" />
                            </NavLink>
                        </li >
                        <li className="c-navbar__item">
                            <NavLink className="c-navbar__link" activeClassName="c-navbar__link--active" to={`/${NAVIGATION.myProducts}`}>
                                <FormattedMessage id="nav.myProducts" />
                            </NavLink>
                        </li>
                        <li className="c-navbar__item">
                            <NavLink className="c-navbar__link" activeClassName="c-navbar__link--active" to={`/${NAVIGATION.dataUsage}`}>
                                <FormattedMessage id="nav.dataUsage" />
                            </NavLink>
                        </li>
                        <li className="c-navbar__item">
                            <a className="c-navbar__add-free-tokens" href="http://faucet.ropsten.be:3001/" target="_blank">Add free test tokens</a>
                        </li>
                        <li className="c-navbar__item">
                            <AKTBalance />
                        </li>
                    </ul>
                </header>
            </div>
        );
    }

    public componentDidMount() {
        this.toggleMobileMenuClassName();
    }

    private toggleMobileMenuClassName() {
        const appElement = document.querySelector("#app");
        const toggle = document.querySelector("[menu-toggle]");
        if (!toggle || !appElement) {
            return;
        }

        toggle.addEventListener("click", () => {
            appElement.classList.toggle("c-navbar--show-mobile-menu");
        });
    }
}
