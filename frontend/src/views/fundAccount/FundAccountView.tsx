import * as React from "react";

import DownloadingBrowserComponent from "../../components/downloadingBrowser/DownloadingBrowserComponent";
import MakeCommitmentComponent from "../../components/makeCommitment/makeCommitmentComponent";
import ObtaningTokensComponent from "../../components/obtaningTokens/ObtaningTokensComponent";
import "./v-fund-account.css";

const isntEthereumBrowser = false; // mocked

export default class FundAccountView extends React.Component<any, any> {

    public render() {

        return (
                <div className="v-fund-account">
                    {!isntEthereumBrowser && 
                    <DownloadingBrowserComponent />
                    }
                    
                    <ObtaningTokensComponent />
                    <MakeCommitmentComponent />
                </div>
        );
    }
}
