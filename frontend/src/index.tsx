import * as React from "react";
import * as ReactDOM from "react-dom";

import {Provider} from "react-redux";
import {HashRouter, Route, Switch} from "react-router-dom";

import store from "./redux/store/store";
import SampleWrapper from "./wrappers/SampleWrapper";

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <div className="o-main">
                <SampleWrapper/>
            </div>
        </HashRouter>
    </Provider>,
    document.getElementById("app") as HTMLElement,
);
