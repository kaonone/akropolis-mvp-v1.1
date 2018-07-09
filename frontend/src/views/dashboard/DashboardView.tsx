import * as React from "react";
import { Line } from "react-chartjs-2";
import { FormattedMessage } from "react-intl";
import { Redirect } from "react-router";

import { NAVIGATION } from "../../constants";

import "./v-dashboard.css";

export interface PropsFromDispatch {
    fetchDashboardData: (account: string) => void;
}

export default class DashboardView extends React.Component<any, any> {

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

        if (localStorage.getItem("ConfirmModal") === "true") {
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
                </div>
            );
        } else {
            return <Redirect to={`/${NAVIGATION.fundAccount}`} />;
        }
    }
}
