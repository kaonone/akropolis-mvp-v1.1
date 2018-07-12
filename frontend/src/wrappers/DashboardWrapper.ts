import { connect, Dispatch } from "react-redux";

import {commitmentCreatedAction, fetchCommitmentAction} from "../redux/actions/web3Action";
import { ApplicationStore } from "../redux/store/store";

import { default as Component, Props } from "../views/dashboard/DashboardView";

export function mapStateToProps({portfolio, web3Accounts}: ApplicationStore) {
    return {
        account: web3Accounts.accountSelected,
        portfolio,
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        commitmentCreatedAction: (commitment: any) => dispatch(commitmentCreatedAction(commitment)),
        fetchCommitmentAction: (account: string) => dispatch(fetchCommitmentAction(account)),
    };
}

export default connect<Props, {}, {}>(mapStateToProps, mapDispatchToProps)(Component);
