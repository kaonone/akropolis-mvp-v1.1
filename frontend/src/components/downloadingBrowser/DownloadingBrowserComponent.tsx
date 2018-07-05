/* tslint:disable:no-implicit-dependencies */
import EthIcon from "-!svg-react-loader?name=ethIcon!../../assets/images/eth-icon.svg";
/* tslint:enable:no-implicit-dependencies */
import * as React from "react";
import { FormattedMessage } from "react-intl";
// import SubNavigationComponent from "../../components/subNavigation/SubNavigationComponent";

import "./c-downloading-browser.css";

export default class DownloadingBrowserComponent extends React.Component<any, any> {

    public render() {

        return (
            <div className="c-downloading-browser">
                <div className="c-downloading-browser__wrapper-introduction">
                    <EthIcon className="c-downloading-browser__icon" />
                    <FormattedMessage id="fundAccount.youWillNeedToHaveAnEthereumEnabledBrowserToProceed">{
                        (youWillNeedToHaveAnEthereumEnabledBrowserToProceed: string) =>
                            <h3 className="c-downloading-browser__headline">{youWillNeedToHaveAnEthereumEnabledBrowserToProceed}</h3>
                    }
                    </FormattedMessage>
                </div>
                <FormattedMessage id="fundAccount.downloadToshiAppIOsAndroid">{
                    (downloadToshiAppIOsAndroid: string) =>
                        <button className="o-btn o-btn--wide c-downloading-browser__btn">{downloadToshiAppIOsAndroid}</button>}
                </FormattedMessage>
                <FormattedMessage id="fundAccount.downloadMetamaskDesktop">{
                    (downloadMetamaskDesktop: string) =>
                        <button className="o-btn o-btn--wide c-downloading-browser__btn">{downloadMetamaskDesktop}</button>}
                </FormattedMessage>
            </div>
        );
    }
}