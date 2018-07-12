import * as React from "react";
import { FormattedMessage } from "react-intl";

import "./c-downloading-browser.css";

export default class DownloadingBrowserComponent extends React.Component<any, any> {

    public render() {

        return (
            <div className="c-downloading-browser">
                <div className="c-downloading-browser__wrapper-introduction">
                    <FormattedMessage id="fundAccount.youWillNeedToHaveAnEthereumEnabledBrowserToProceed">{
                        (youWillNeedToHaveAnEthereumEnabledBrowserToProceed: string) =>
                            <h3 className="c-downloading-browser__headline">{youWillNeedToHaveAnEthereumEnabledBrowserToProceed}</h3>
                    }
                    </FormattedMessage>
                </div>
                <FormattedMessage id="fundAccount.downloadToshiAppIOsAndroid">
                    {(downloadToshiAppIOsAndroid: string) =>
                        <a href="https://www.toshi.org/" target="_blank" className="o-btn c-downloading-browser__btn">
                            {downloadToshiAppIOsAndroid}</a>}
                </FormattedMessage>
                <FormattedMessage id="fundAccount.downloadMetamaskDesktop">
                    {(downloadMetamaskDesktop: string) =>
                        <a href="https://metamask.io/" target="_blank" className="o-btn c-downloading-browser__btn">
                            {downloadMetamaskDesktop}</a>}
                </FormattedMessage>
            </div>
        );
    }
}
