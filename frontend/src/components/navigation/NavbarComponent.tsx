import * as React from "react";
import {FormattedMessage} from "react-intl";
import {NavLink} from "react-router-dom";
import AKTBalance from "../../wrappers/ATKBalanceWrapper";
import ModalGlobalComponent from "../modalGlobal/ModalGlobalComponent";

import {NAVIGATION} from "../../constants";

import "./c-navbar.css";

interface Props {
    message?: string;
}

interface State {
    isOpenDashboardModal: boolean;
    isOpenDeleteModal: boolean;
}

export default class NavbarComponent extends React.Component<Props, State> {

    public readonly state: State = {
        isOpenDashboardModal: false,
        isOpenDeleteModal: false,
    };

    constructor(props: any) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    }

    public componentDidMount() {
        this.toggleMobileMenuClassName();
    }

    public render() {
        const deleteModal = (
            <div className="c-confirmation-modal__box">
                <h3 className="c-confirmation-modal__headline"><FormattedMessage id="nav.deleteMyDataDesc" /></h3>
                <button className="o-btn o-btn--wide c-confirmation-modal__btn" onClick={this.deleteData}>
                    <FormattedMessage id="fundAccount.confirm"/>
                </button>
                <button onClick={this.toggleDeleteModal}
                        className="o-btn o-btn--reverse o-btn--wide c-confirmation-modal__btn">
                    <FormattedMessage id="fundAccount.cancel"/>
                </button>
            </div>
        );

        const infoModal = (
            <div className="c-confirmation-modal__box">
                <h3 className="c-confirmation-modal__headline"><FormattedMessage id="nav.noPortfolioYet" /></h3>
                <button onClick={this.toggleModal} className="o-btn o-btn--wide c-confirmation-modal__btn">
                    <FormattedMessage id="nav.ok"/>
                </button>
            </div>
        );

        return (
            <div>
                <header className="c-navbar">
                    <a className="c-navbar__toggle" menu-toggle="true"/>
                    <ul className="c-navbar__wrapper">
                        {localStorage.getItem("ConfirmModal") === "true" ? (
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
        const appElement = document.querySelector("#app");
        const toggle = document.querySelector("[menu-toggle]");
        if (!toggle || !appElement) {
            return;
        }

        toggle.addEventListener("click", () => {
            appElement.classList.toggle("c-navbar--show-mobile-menu");
        });
    }

    private deleteData() {
        localStorage.clear();
        window.location.reload();
    }
}
