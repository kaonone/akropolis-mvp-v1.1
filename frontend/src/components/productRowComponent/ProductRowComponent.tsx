/* tslint:disable:no-implicit-dependencies */
import IconStar from "-!svg-react-loader?name=Icon!../../assets/images/star-icon.svg";
/* tslint:enable:no-implicit-dependencies */
import * as React from "react";
import { Product } from "../../models/Products";
import "./c-product-row.css";

interface Props {
    productData: Product;
}

export default class ProductRowComponent extends React.Component<Props, any> {

    constructor(props: any) {
        super(props);
    }

    public render() {

        const { fundDescription, fundName, fundPercent, fundRating, fundValueDescription } = this.props.productData;

        return (
            <div className="c-product-row">
                <div className="c-product-row__wrapper-headline">
                    <h4 className="c-product-row__headline">{fundName}</h4>
                    <input className="o-form__checkbox" type="checkbox" />
                </div>
                <p className="c-product-row__describe">{fundDescription}</p>
                <div className="c-product-row__wrapper-fund-value">
                    <h4 className="c-product-row__describe-fund-value">{fundValueDescription}</h4>
                    <h4 className="c-product-row__fund-value">{fundPercent}%</h4>
                    <h4 className="c-product-row__fund-value"><IconStar className="c-product-row__icon" />{fundRating}</h4>
                </div>
            </div>
        );
    }
}
