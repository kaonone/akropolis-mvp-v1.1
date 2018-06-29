import {connect, Dispatch} from "react-redux";

import {PlanAfterCalculate} from "../models/Onboarding";
import {saveAction} from "../redux/actions/onboardingAction";
import {ApplicationStore} from "../redux/store/store";

import {default as Component, PropsFromDispatch} from "../views/onboarding/OnboardingView";

export function mapStateToProps({}: ApplicationStore) {
    return {};
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        saveData: (plan: PlanAfterCalculate) => dispatch(saveAction(plan)),
    };
}

export default connect<{}, PropsFromDispatch, {}>(mapStateToProps, mapDispatchToProps)(Component);
