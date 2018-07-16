/* tslint:disable:no-implicit-dependencies */
import SpinnerWhite from "-!svg-react-loader?name=moneyIcon!../../assets/images/spin-white.svg";
/* tslint:enable:no-implicit-dependencies */
import * as React from "react";
import {FormattedMessage} from "react-intl";
import {NavLink} from "react-router-dom";
import AKTBalance from "../../wrappers/ATKBalanceWrapper";
import ModalGlobalComponent from "../modalGlobal/ModalGlobalComponent";

import {NAVIGATION} from "../../constants";
import {PortfolioStore} from "../../redux/store/portfolioStore";
import {Web3AccountsStore} from "../../redux/store/web3AccountsStore";
import {approveSharesTransfer, removeCommitment} from "../../services/DataService";

import {clearStorage} from "../../services/StorageService";
import "./c-navbar.css";

interface Props {
    portfolio: PortfolioStore;
    message?: string;
    web3Accounts: Web3AccountsStore;
}

interface State {
    isOpenDashboardModal: boolean;
    isOpenDeleteModal: boolean;
    isWaiting: boolean;
}

export default class NavbarComponent extends React.Component<Props, State> {

    public readonly state: State = {
        isOpenDashboardModal: false,
        isOpenDeleteModal: false,
        isWaiting: false
    };

    constructor(props: any) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.deleteData = this.deleteData.bind(this);
    }

    public render() {
        const deleteModal = (
            <div className="c-confirmation-modal__box">
                <h3 className="c-confirmation-modal__headline"><FormattedMessage id="nav.deleteMyDataDesc"/></h3>
                {this.state.isWaiting ? (
                    <div className="c-confirmation-modal__spinner"><SpinnerWhite/></div>
                ) : (
                    <div className="c-confirmation-modal__btns">
                        <button className="o-btn o-btn--basic o-btn--cancel" onClick={this.toggleDeleteModal}>
                            <FormattedMessage id="fundAccount.cancel"/>
                        </button>
                        <button onClick={this.deleteData} className="o-btn o-btn--basic">
                            <FormattedMessage id="fundAccount.confirm"/>
                        </button>
                    </div>
                )}
            </div>
        );

        const infoModal = (
            <div className="c-confirmation-modal__box">
                <h3 className="c-confirmation-modal__headline"><FormattedMessage id="nav.noPortfolioYet"/></h3>
                <div className="c-confirmation-modal__btns">
                    <button onClick={this.toggleModal} className="o-btn o-btn--basic">
                        <FormattedMessage id="nav.ok"/>
                    </button>
                </div>
            </div>
        );
        const portfolio = this.props.portfolio;
        const isPortfolio = (portfolio.portfolioFetched && portfolio.portfolioExist);
        return (
            <div>
                <header className="c-navbar">
                    <a className="c-navbar__toggle" onClick={this.toggleMobileMenuClassName}/>
                    <ul className="c-navbar__wrapper">
                        {isPortfolio ? (
                            <li className="c-navbar__item">
                                <NavLink className="c-navbar__link" exact={true}
                                         to={`/${NAVIGATION.dashboard}`}>
                                    <FormattedMessage id="nav.dashboard"/>
                                </NavLink>
                            </li>
                        ) : (
                            <li className="c-navbar__item">
                                    <span className="c-navbar__link" onClick={this.toggleModal}>
                                        <FormattedMessage id="nav.dashboard"/>
                                    </span>
                            </li>
                        )}

                        <li className="c-navbar__item">
                            <span className="c-navbar__link" onClick={this.toggleDeleteModal}>
                                <FormattedMessage id="nav.deleteMyData"/>
                            </span>
                        </li>
                        <li className="c-navbar__item">
                            <AKTBalance/>
                        </li>
                    </ul>
                </header>
                {this.state.isOpenDashboardModal && (
                    <ModalGlobalComponent onClose={this.toggleModal}>
                        {infoModal}
                    </ModalGlobalComponent>
                )}
                {this.state.isOpenDeleteModal && (
                    <ModalGlobalComponent onClose={this.toggleModal}>
                        {deleteModal}
                    </ModalGlobalComponent>
                )}
            </div>
        );
    }

    private toggleModal() {
        this.setState({
            ...this.state,
            isOpenDashboardModal: !this.state.isOpenDashboardModal,
        });
    }

    private toggleDeleteModal() {
        this.setState({
            ...this.state,
            isOpenDeleteModal: !this.state.isOpenDeleteModal,
        });
    }

    private toggleMobileMenuClassName() {
        const bodyElement = document.querySelector("body");
        if (!bodyElement) {
            return;
        }
        bodyElement.classList.toggle("c-navbar--show-mobile-menu");
    }

    private deleteData() {
        this.setState({
            ...this.state,
            isWaiting: true
        });
        const portfolio = this.props.portfolio;
        if (portfolio.portfolioFetched && portfolio.portfolioExist) {
            approveSharesTransfer(this.props.web3Accounts.accountSelected, portfolio.commitment)
                .then(() => {
                    return removeCommitment(this.props.web3Accounts.accountSelected);
                })
                .then(() => {
                    this.toggleDeleteModal();
                    this.clearStorageAndRedirect();
                }).catch((err: any) => {
                console.log("err", err);
                this.setState({
                    ...this.state,
                    isWaiting: false
                });
            });
        } else {
            this.clearStorageAndRedirect();
        }
    }

    private clearStorageAndRedirect() {
        this.setState({
            ...this.state,
            isWaiting: false
        });
        clearStorage();
        window.location.reload();
    }
}
