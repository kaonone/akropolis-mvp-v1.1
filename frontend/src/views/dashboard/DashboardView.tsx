import * as React from "react";

import { FormattedMessage } from "react-intl";
import { Redirect } from "react-router";

import DashboardChartComponent from "../../components/dashboard/dashboardChart/DashboardChartComponent";
import LoaderComponent from "../../components/loader/LoaderComponent";

import { getNextContributionDate } from "../../services/DashboardService";

import { PortfolioStore } from "../../redux/store/portfolioStore";

import { NAVIGATION } from "../../constants";

import "./v-dashboard.css";

export interface Props {
    account: string;
    portfolio: PortfolioStore;
}

export interface PropsFromDispatch {
    fetchCommitment: (account: string) => void;
}

interface AllProps extends Props, PropsFromDispatch {
}

export default class DashboardView extends React.Component<AllProps, any> {

    constructor(props: any) {
        super(props);
    }

    public componentWillMount() {
        if (this.props.account && this.props.portfolio.portfolioExist) {
            this.props.fetchCommitment(this.props.account);
        }
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (this.accountChangedOrPortfolioWasCreated(this.props, nextProps)) {
            this.props.fetchCommitment(nextProps.account);
        }
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

        if (this.props.portfolio.portfolioFetched && this.props.portfolio.portfolioExist || localStorage.getItem(this.props.account)) {
            return (
                <div className="v-dashboard">
                    <div className="v-dashboard__wrapper-next-contribution-details">
                        <div className="v-dashboard__next-contribution-details">
                            <FormattedMessage id="dashboard.myNextContributionDetails"/>,&nbsp;
                            {this.props.portfolio.commitmentFetched && (
                                getNextContributionDate(this.props.portfolio.commitment)
                            )}
                        </div>
                        <button className="o-btn"><FormattedMessage id="dashboard.topUpYourPension"/></button>
                    </div>
                    <FormattedMessage id="dashboard.graphOfProjectedPortfolioPerformance"/>
                    {this.props.portfolio.commitmentFetched && (
                        <DashboardChartComponent commitment={this.props.portfolio.commitment}/>
                    )}
                    <h3><FormattedMessage id="dashboard.notifications"/></h3>
                    <div>
                        <h4>Fund manager update: July 2018</h4>
                        <div>Today</div>
                    </div>
                    <div>
                        <h4>Congratulations, you’ve created your first portfolio!</h4>
                        <div>Today</div>
                    </div>
                </div>
            );
        } else if (this.props.portfolio.portfolioFetched && !this.props.portfolio.portfolioExist) {
            return <Redirect to={`/${NAVIGATION.selectAFund}`}/>;
        } else {
            return null;
        }
    }

    private accountChangedOrPortfolioWasCreated(props: Props, nextProps: Props) {
        return props.account !== nextProps.account
            || (props.portfolio.portfolioExist !== nextProps.portfolio.portfolioExist
                && nextProps.portfolio.portfolioExist);
    }

    private waitingForCommitmentOrPortfolioCreate() {
        return this.props.portfolio.commitmentFetching && this.props.portfolio.portfolioExist
            || localStorage.getItem(this.props.account) && !this.props.portfolio.portfolioExist;
    }
}
