import { connect, Dispatch } from "react-redux";

import { Product } from "../models/Products";

import { selectProductAction } from "../redux/actions/selectAFundAction";
import { ApplicationStore } from "../redux/store/store";

import {Commitment} from "../models/Commitment";
import {commitmentCreatedAction, fetchCommitmentAction} from "../redux/actions/web3Action";
import { default as Component, Props, PropsFromDispatch } from "../views/layout/LayoutView";

export function mapStateToProps({portfolio, userData, web3Accounts}: ApplicationStore) {
    return {
        account: web3Accounts.accountSelected,
        isPortfolio: portfolio.portfolioFetched && portfolio.portfolioExist,
        portfolio,
        userData,
        web3Accounts
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        commitmentCreatedAction: (commitment: Commitment) => dispatch(commitmentCreatedAction(commitment)),
        fetchCommitmentAction: (account: string) => dispatch(fetchCommitmentAction(account)),
        selectProduct: (product: Product) => dispatch(selectProductAction(product))
    };
}

export default connect<Props, PropsFromDispatch, {}>(mapStateToProps, mapDispatchToProps)(Component);
