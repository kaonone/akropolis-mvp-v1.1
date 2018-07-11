import { connect, Dispatch } from "react-redux";

import { fetchCommitmentAction } from "../redux/actions/web3Action";
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
        fetchCommitment: (account: string) => dispatch(fetchCommitmentAction(account)),
    };
}

export default connect<Props, {}, {}>(mapStateToProps, mapDispatchToProps)(Component);
