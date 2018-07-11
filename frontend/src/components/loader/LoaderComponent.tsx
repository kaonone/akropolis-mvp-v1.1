/* tslint:disable:no-implicit-dependencies */
import SpinnerBlack from "-!svg-react-loader?name=moneyIcon!../../assets/images/spin-black.svg";
/* tslint:enable:no-implicit-dependencies */
import * as React from "react";

import "./c-loader.css";

const LoaderComponent = () => (
    <div className="c-loader">
        <SpinnerBlack />
    </div>
);

export default LoaderComponent;
