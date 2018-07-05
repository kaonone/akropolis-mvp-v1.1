import * as React from "react";

// import DownloadingBrowserComponent from "../../components/downloadingBrowser/DownloadingBrowserComponent";
// import MakeCommitmentComponent from "../../components/makeCommitment/makeCommitmentComponent";
// import ObtaningTokensCimport { StaticRouter } from "react-router";
import ConfirmationModalComponent from "../../components/confirmationModal/ConfirmationModalComponent";
// import ObtaningTokensComponent from "../../components/obtaningTokens/ObtaningTokensComponent";
import StakeAktComponent from "../../components/stakeAkt/StakeAktComponent";
import "./v-fund-account.css";

// const isntEthereumBrowser = false; // mocked

interface State {
    isOpenModal: boolean;
}

export default class FundAccountView extends React.Component<any, State> {

    public readonly state: State = {
        isOpenModal: false
    };

    public render() {
        
        return (
                <div className="v-fund-account">
                    {/* {!isntEthereumBrowser && 
                    <DownloadingBrowserComponent />
                    } */}
                    
                    {/* <ObtaningTokensComponent />
                    <MakeCommitmentComponent /> */}
                    <StakeAktComponent onConfirm={this.handleOnConfirm} />
                    <ConfirmationModalComponent isOpenProps={this.state.isOpenModal} onClick={this.handleOnClick}/>
                </div>
        );
    }

    private handleOnClick = () => {
        this.setState({
            ...this.state,
            isOpenModal: false
        });
    }

    private handleOnConfirm = (idOfStakeAkt: number) => {
        
        this.setState({
            ...this.state,
            isOpenModal: true
        });
    }
}
