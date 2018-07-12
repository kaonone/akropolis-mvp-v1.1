/* tslint:disable:no-implicit-dependencies */
import PiktoBg from "-!svg-react-loader?name=Icon!../../assets/images/pikto-bg.svg";
/* tslint:enable:no-implicit-dependencies */
import * as _ from "lodash";
import * as React from "react";

import {FormattedMessage} from "react-intl";
import {Redirect} from "react-router";

import DashboardChartComponent from "../../components/dashboard/dashboardChart/DashboardChartComponent";
import LoaderComponent from "../../components/loader/LoaderComponent";

import {getNextContributionDate} from "../../services/DashboardService";

import {PortfolioStore} from "../../redux/store/portfolioStore";

import {NAVIGATION} from "../../constants";

import "./v-dashboard.css";

export interface Props {
    account: string;
    portfolio: PortfolioStore;
}

export interface PropsFromDispatch {
    commitmentCreatedAction: (commitment: any) => void;
    fetchCommitmentAction: (account: string) => void;
}

interface AllProps extends Props, PropsFromDispatch {
}

export default class DashboardView extends React.Component<AllProps, any> {

    constructor(props: any) {
        super(props);
    }

    public componentWillMount() {
        const bodyElement = document.querySelector("body");
        if (!bodyElement) {
            return;
        }
        bodyElement.classList.add("isBalance");
    }

    public shouldComponentUpdate(nextProps: Props, nextState: any) {
        return !_.isEqual(nextProps.portfolio, this.props.portfolio) || this.props.account !== nextProps.account;
    }

    public componentWillReceiveProps(nextProps: Props) {
        const storedCommitment = localStorage.getItem(nextProps.account);
        if ((this.props.account !== nextProps.account) && storedCommitment && !this.props.portfolio.portfolioExist) {
            const commitment: any = JSON.parse(storedCommitment ? storedCommitment : "{}");
            this.props.commitmentCreatedAction(commitment);
        } else if (nextProps.account && nextProps.portfolio.portfolioExist && !nextProps.portfolio.commitmentFetching
            && !nextProps.portfolio.commitmentFetched) {
            this.props.fetchCommitmentAction(nextProps.account);
        }
    }

    public componentWillUnmount() {
        const bodyElement = document.querySelector("body");
        if (!bodyElement) {
            return;
        }
        bodyElement.classList.remove("isBalance");
    }

    public render() {

        if (this.waitingForCommitmentOrPortfolioCreate()) {
            return (
                <div className="v-dashboard ">
                    <LoaderComponent/>
                    <p className="v-dashboard__loading"><FormattedMessage id="dashboard.waitingForData"/></p>
                </div>
            );
        }

        if (this.props.portfolio.portfolioFetched && this.props.portfolio.portfolioExist) {
            return (
                <div className="v-dashboard">

                    <div className="v-dashboard__wrapper-final-values">
                        <div
                            className="v-dashboard__wrapper-final-value-item">
                            <h4 className="v-dashboard__describe-value">
                                <FormattedMessage id="dashboard.dashboard"/>
                            </h4>
                        </div>
                        <PiktoBg className="v-dashboard__pikto-bg"/>
                    </div>
                    <div className="v-dashboard__box-content">
                        <h4 className="v-dashboard__headline"><FormattedMessage id="dashboard.myNextContribution"/></h4>
                        <div className="v-dashboard__wrapper-next-contribution">
                            <div className="v-dashboard__next-contribution">{this.props.portfolio.commitmentFetched && (
                                getNextContributionDate(this.props.portfolio.commitment)
                            )}</div>
                            <div className="v-dashboard__next-contribution">
                                <span
                                    className="v-dashboard__unit">ETH</span>{(this.props.portfolio.commitment.amountToPay)}
                            </div>
                        </div>
                    </div>

                    <div className="v-dashboard__box-content">
                        <h4 className="v-dashboard__headline"><FormattedMessage
                            id="dashboard.graphOfProjectedPortfolioPerformance"/></h4>
                        {this.props.portfolio.commitmentFetched && (
                            <DashboardChartComponent commitment={this.props.portfolio.commitment}/>
                        )}
                    </div>
                    <div className="v-dashboard__box-content v-dashboard__box-content--empty">
                        <h4 className="v-dashboard__headline v-dashboard__headline--uppercase"><FormattedMessage
                            id="dashboard.notifications"/></h4>
                        <div className="v-dashboard__notification">
                            <h4 className="v-dashboard__healine-notification">Fund manager update: July 2018</h4>
                            <div>Today</div>
                        </div>
                        <div className="v-dashboard__notification">
                            <h4 className="v-dashboard__healine-notification">Congratulations, you’ve created your first
                                portfolio!</h4>
                            <div>Today</div>
                        </div>
                    </div>
                </div>
            );
        } else if (this.props.portfolio.portfolioFetched && !this.props.portfolio.portfolioExist) {
            return <Redirect to={`/${NAVIGATION.selectAFund}`}/>;
        } else {
            return null;
        }
    }

    private waitingForCommitmentOrPortfolioCreate() {
        return this.props.portfolio.commitmentFetching;
    }
}
