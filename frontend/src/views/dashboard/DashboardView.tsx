import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Redirect } from "react-router";

import {NAVIGATION} from "../../constants";

import "./v-dashboard.css";

export interface PropsFromDispatch {
    fetchDashboardData: (account: string) => void;
}

export default class DashboardView extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        
        if (localStorage.getItem("ConfirmModal") === "true") {
            return (
                <div className="v-dashboard">
                    <div className="v-dashboard__wrapper-next-contribution-details">
                        <div className="v-dashboard__next-contribution-details">
                            <FormattedMessage id="dashboard.myNextContributionDetails" />, 25 July 2018
                        </div>
                        <button className="o-btn"><FormattedMessage id="dashboard.topUpYourPension" /></button>
                    </div>
                </div>
            );
        } else {
            return <Redirect to={`/${NAVIGATION.fundAccount}`} />;
        }
    }
}
