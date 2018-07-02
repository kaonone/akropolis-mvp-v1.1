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
                    <h4 className="c-product-row__headline">{this.props.productData.fundName}</h4>
                    <input className="o-form__checkbox" type="checkbox" />
                </div>
                <p className="c-product-row__describe">{this.props.productData.fundDescription}</p>
                <div className="c-product-row__wrapper-fund-value">
                    <h4 className="c-product-row__describe-fund-value">{this.props.productData.fundValueDescription}</h4>
                    <h4 className="c-product-row__fund-value">{this.props.productData.fundPercent}%</h4>
                    <h4 className="c-product-row__fund-value"><IconStar className="c-product-row__icon" />{this.props.productData.fundRating}</h4>
                </div>
            </div>
        );
    }
}
 