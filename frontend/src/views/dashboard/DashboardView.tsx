import * as React from "react";
import { Line } from "react-chartjs-2";
import { FormattedMessage } from "react-intl";
import { Redirect } from "react-router";

import { PortfolioStore } from "../../redux/store/portfolioStore";

import { NAVIGATION } from "../../constants";

import "./v-dashboard.css";

export interface Props {
    account: string;
    portfolio: PortfolioStore;
}

export interface PropsFromDispatch {
    fetchDashboardData: (account: string) => void;
}

interface AllProps extends Props, PropsFromDispatch {}

export default class DashboardView extends React.Component<AllProps, any> {

    constructor(props: any) {
        super(props);
    }

    public render() {

        const data = {
            datasets: [{
                backgroundColor: [
                    "rgba(0, 0, 0, 0.2)",
                ],
                borderColor: [
                    "rgba(0, 0, 0, 1)",
                ],
                borderWidth: 1,
                data: [52, 76],
                label: "% of gains",
            }],
            labels: ["commitment start", "commitment end"]
        };

        if (this.props.portfolio.portfolioFetched && this.props.portfolio.portfolioExist || localStorage.getItem(this.props.account)) {
            return (
                <div className="v-dashboard">
                    <div className="v-dashboard__wrapper-next-contribution-details">
                        <div className="v-dashboard__next-contribution-details">
                            <FormattedMessage id="dashboard.myNextContributionDetails" />, 25 July 2018
                        </div>
                        <button className="o-btn"><FormattedMessage id="dashboard.topUpYourPension" /></button>
                    </div>
                    <FormattedMessage id="dashboard.graphOfProjectedPortfolioPerformance" />
                    <Line data={data} />
                    <h3><FormattedMessage id="dashboard.notifications" /></h3>
                    <div>
                        <h4>Fund manager update:  July 2018</h4>
                        <div>Today</div>
                    </div>
                    <div>
                        <h4>Congratulations, you’ve created your first portfolio!</h4>
                        <div>Today</div>
                    </div>
                </div>
            );
        } else if (this.props.portfolio.portfolioFetched && !this.props.portfolio.portfolioExist) {
            return <Redirect to={`/${NAVIGATION.selectAFund}`} />;
        } else {
            return null;
        }
    }
}
