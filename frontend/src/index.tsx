import * as React from "react";
import * as ReactDOM from "react-dom";

import { addLocaleData, IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";

import * as en from "react-intl/locale-data/en";

import LayoutWrapper from "./wrappers/LayoutWrapper";

import store from "./redux/store/store";

import "./style.scss";

import messages from "./intl/messages";

const selectedLocale = "en";
addLocaleData([...en]);

ReactDOM.render(
    <IntlProvider locale={selectedLocale} messages={messages[selectedLocale]}>
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <LayoutWrapper/>
                </Switch>
            </BrowserRouter>
        </Provider>
    </IntlProvider>,
    document.getElementById("app") as HTMLElement,
);
