/* tslint:disable:no-implicit-dependencies */
import IconStar from "-!svg-react-loader?name=Icon!../../assets/images/star-icon.svg";
/* tslint:enable:no-implicit-dependencies */
import * as React from "react";
import "./c-product-row.css";

export default class ProductRowComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className="c-product-row">
                <div className="c-product-row__wrapper-headline">
                    <h4 className="c-product-row__headline">Fund name</h4>
                    <input className="o-form__checkbox" type="checkbox" />
                </div>
                <p className="c-product-row__describe">Lorem ipsum dolor sit amet, consectetur adipiscing.
                Lorem ipsum dolor sit amet, consectetur adipiscing el...</p>
                <div className="c-product-row__wrapper-fund-value">
                    <h4 className="c-product-row__describe-fund-value">Conservative</h4>
                    <h4 className="c-product-row__fund-value">9%</h4>
                    <h4 className="c-product-row__fund-value"><IconStar className="c-product-row__icon" />4.9</h4>
                </div>
            </div>
        );
    }   
}
